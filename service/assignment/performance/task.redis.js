const { read, save } = require('../lib/kv');

const ERROR_REGISTER_DATA_INVALID = 'data registrasi data log tidak lengkap';
const ERROR_TASK_LOG_NOT_FOUND = 'data log tidak ditemukan';

/**
 * task type definition
 * @typedef {Object} TaskLog
 * @property {string} key
 * @property {string} status
 */

/**
 * add new TaskLog
 * @param {TaskLog} key TaskLog Key name of database
 * @param {string} status TaskLog status
 * @returns {Promise<TaskLog>} new task Log with status
 */
async function add(key, status) {
  let tasksLog = await list(key);
  const task = {
    timestamp: Date.now(),
    status: status,
  };
  tasksLog.push(task);
  await save(key, tasksLog);
  return task;
}
/**
 * get list of registered tasksLog
 * @param {TaskLog} key TaskLog Key name of database
 * @returns {Promise<TaskLog[]>} list of registered tasksLog
 */
async function list(key) {
  let tasksLog = await read(key);
  if (!tasksLog) {
    tasksLog = [];
  }
  return tasksLog;
}

/**
 * get list of task data
 * @returns {Promise<[]>} list of task data
 */
async function get() {
  let tasksData = await read('task');
  if (!tasksData) {
    tasksData = [];
  }
  return tasksData;
}
/**
 * push a task
 * @returns {Promise<number>} push new task data
 */
async function register(status) {
  let taskData = await get();
  const task = {
    status: status,
  };
  taskData.push(task);
  await save('task', taskData);
  return task;
}
async function countAll() {
  const taskData = await get();
  count = taskData.length;
  return count;
}
async function countBy(filter) {
  const taskData = await get();
  let count = 0;
  for (let item = 0; item < taskData.length; item++) {
    const element = taskData[item];
    if (element.status == filter) count += 1;
  }
  return count;
}

module.exports = {
  add,
  list,
  register,
  get,
  countAll,
  countBy,
  ERROR_REGISTER_DATA_INVALID,
  ERROR_TASK_LOG_NOT_FOUND,
};
