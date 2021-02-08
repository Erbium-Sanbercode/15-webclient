/* eslint-disable no-unused-vars */
const mime = require('mime-types');
const { Writable } = require('stream');
const Busboy = require('busboy');
const url = require('url');
const { Client } = require('minio');
require('dotenv').config();

/**
 * set MINIO_ROOT_USER=local-minio
 * set MINIO_ROOT_PASSWORD=local-test-secret
 */
const client = new Client({
    endPoint: '127.0.0.1',
    port: 1111,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS,
    secretKey: process.env.MINIO_SECRET,
});

function randomFileName(mimetype) {
    return (
        new Date().getTime() +
        '-' +
        Math.round(Math.random() * 1000) +
        '.' +
        mime.extension(mimetype)
    );
}

function uploadPhoto(req, res) {
    return new Promise((resolve, reject) => {
        const busboy = new Busboy({ headers: req.headers });
        function abort() {
            req.unpipe(busboy);
            if (!req.aborted) {
                res.statusCode = 413;
                res.end();
            }
        }

        let nama_file = '';
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const objectName = randomFileName(mimetype);
            nama_file = objectName;
            console.log(fieldname);
            console.log(objectName);

            switch (fieldname) {
                case 'photo':
                    file.on('error', abort);
                    client.putObject('photo', objectName, file, (err, etag) => {
                        if (err) {
                            console.log(err);
                            abort();
                        }
                    });
                    break;
                case 'attachment':
                    file.on('error', abort);
                    client.putObject('attachment', objectName, file, (err, etag) => {
                        if (err) {
                            console.log(err);
                            abort();
                        }
                    });
                    break;
                default: {
                    const noop = new Writable({
                        write(chunk, encding, callback) {
                            setImmediate(callback);
                        },
                    });
                    file.pipe(noop);
                }
            }
        });
        
        busboy.on('field', (fieldname, val) => {
            console.log(val);
        });
        
        busboy.on('finish', () => {
            resolve(nama_file);            
        });

        req.on('aborted', abort);
        busboy.on('error', abort);

        req.pipe(busboy);
    });
}

async function readPhoto(req, res) {
    const uri = url.parse(req.url, true);
    const objectName = uri.pathname.replace('/read/', '');
    if (!objectName) {
        res.statusCode = 400;
        res.write('request tidak sesuai');
        res.end();
    }
    try {
        await client.statObject('photo', objectName);
    } catch (err) {
        if (err && err.code === 'NotFound') {
            res.statusCode = 404;
            res.write('file tidak ditemukan');
            res.end();
            return;
        }
        res.statusCode = 500;
        res.write('gagal membaca file');
        res.end();
        return;
    }
    
    try {
        const objectRead = await client.getObject('photo', objectName);
        res.setHeader('Content-Type', mime.lookup(objectName));
        res.statusCode = 200;
        objectRead.pipe(res);
    } catch (err) {
        res.statusCode = 500;
        res.write('gagal membaca file');
        res.end();
        return;
  }
}

async function deletePhoto(bucket, objectName) {      
    try {
        await client.statObject(bucket, objectName);            
    } catch (err) {
        if (err && err.code === 'NotFound') {
            return 'false';
        }
        throw new Error('gagal membaca file');      
    }

    try {
        await client.removeObject(bucket, objectName);
        return 'true';
    } catch (err) {
        throw new Error(`file ${objectName} tidak ditemukan`)        
    }
}



module.exports = {
  uploadPhoto,
  readPhoto,
  deletePhoto  
};
