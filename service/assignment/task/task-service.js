const Busboy = require('busboy');
const { Writable } = require('stream');

function createTask(req, res) {
  return new Promise((resolve, reject) => {
    const busboy = new Busboy({ headers: req.headers });

    function abort() {
      req.unpipe(busboy);
      if (!req.aborted) {
        res.statusCode = 413;
        res.end();
      }
    }

    let data = {};

    busboy.on('field', (fieldname, val) => {
      if (['task', 'assignee_id'].includes(fieldname)) {
        data[fieldname] = val;
      }
      data.done = false;
      data.cancel = false;
    });

    busboy.on('finish', () => {
      resolve(data);
    });

    req.on('aborted', abort);
    busboy.on('error', abort);

    req.pipe(busboy);
  });
}

module.exports = {
    createTask,
};
