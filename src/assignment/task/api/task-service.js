const { client } = require('./client');

async function showTaskApi() {
  return await client.get('http://localhost:9995/task-list');
}

async function addTaskApi(task) {
  return await client.post('http://localhost:9995/task-add', { task });
}

async function doneTaskApi(id) {
  return await client.put(`http://localhost:9995/done?id=${id}`);
}

async function undoneTaskApi(id){
  return await client.put(`http://localhost:9995/undone?id=${id}`);
}

async function cancelTaskApi(id){
  return await client.delete(`http://localhost:9995/cancel?id=${id}`);
}

module.exports = {
  showTaskApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
  cancelTaskApi
};
