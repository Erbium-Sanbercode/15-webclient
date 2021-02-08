const { client } = require('./client');

async function createWorker(worker) {
   return await client.post('http://localhost:7000/create', { worker });
}

async function readWorker() {
   return await client.get(`http://localhost:7000/read`);
}

async function deleteWorker(id) {
   return await client.get(`http://localhost:7000/delete?id=${id}`);
}
 
module.exports = {
   createWorker,
   readWorker,
   deleteWorker
};
