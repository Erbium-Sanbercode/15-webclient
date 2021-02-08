const { client } = require('./client');

async function showTaskApi() {
  return await client.get('http://localhost:9995/task/read');
}

async function addTaskApi(task) {
  return await client.post('http://localhost:9995/task/write', { task });
}

async function doneTaskApi(id) {
  return await client.put(`http://localhost:9995/task/done?id=${id}`);
}

async function undoneTaskApi(id){
  return await client.put(`http://localhost:9995/task/undone?id=${id}`);
}

async function cancelTaskApi(id){
  return await client.delete(`http://localhost:9995/task/cancel?id=${id}`);
}

module.exports = {
  showTaskApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
  cancelTaskApi
};
