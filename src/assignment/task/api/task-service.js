const { client } = require('./client');

async function showTaskApi() {
  return await client.get('http://localhost:6000/task/read');
}

async function addTaskApi(task) {
  return await client.post('http://localhost:6000/task/write', { task });
}

async function doneTaskApi(id) {
  return await client.put(`http://localhost:6000/task/done?id=${id}`);
}

async function undoneTaskApi(id){
  return await client.put(`http://localhost:6000/task/undone?id=${id}`);
}

async function cancelTaskApi(id){
  return await client.delete(`http://localhost:6000/task/cancel?id=${id}`);
}

module.exports = {
  showTaskApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
  cancelTaskApi
};
