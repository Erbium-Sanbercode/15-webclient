const http = require('http');

const PORT = 6000;

function insertTask(data) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      `http://localhost:${PORT}/task/write?data=${JSON.stringify(data)}`,
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
        res.on('error', (err) => {
          reject(err);
        });
      }
    );
    req.end();
  });
}

//createTask({assignee_id: 3, job: 'ngoding', attachment: 'file.jpg', done: true});

function selectTask(data) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      `http://localhost:${PORT}/task/read`,
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
        res.on('error', (err) => {
          reject(err);
        });
      }
    );
    req.end();
  });
}

function doneTask(id) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      `http://localhost:${PORT}/task/done/id?id=${id}`,
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
        res.on('error', (err) => {
          reject(err);
        });
      }
    );
    req.end();
  });
}

function undoneTask(id) {
    return new Promise((resolve, reject) => {
      const req = http.request(
        `http://localhost:${PORT}/task/undone/id?id=${id}`,
        (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            resolve(data);
          });
          res.on('error', (err) => {
            reject(err);
          });
        }
      );
      req.end();
    });
  }

function cancelTask(id) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      `http://localhost:${PORT}/worker/delete?id=${id}`,
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
        res.on('error', (err) => {
          reject(err);
        });
      }
    );
    req.end();
  });
}

module.exports = {
  insertTask,
  selectTask,
  doneTask,
  undoneTask,
  cancelTask,
};
