const { read, save } = require('../lib/kv');

const ERROR_REGISTER_DATA_INVALID = 'data registrasi data log tidak lengkap';
const ERROR_WORKER_LOG_NOT_FOUND = 'data log tidak ditemukan';

/**
 * Worker type definition
 * @typedef {Object} TaskLog
 * @property {string} key
 * @property {string} status
 */

/**
 * add new TaskLog
 * @param {TaskLog} key TaskLog Key name of database
 * @param {string} id TaskLog id
 * @returns {Promise<TaskLog>} new worker Log with status
 */
async function add(key, status) {
  let workersLog = await read(key);
  if (!workersLog) {
    workersLog = [];
  }
  const worker = {
    timestamp: Date.now(),
    status: status,
  };
  workersLog.push(worker);
  await save(key, workersLog);
  return worker;
}

/**
 * register new TaskLog
 * @param {TaskLog} key TaskLog Key name of database
 * @param {string} id TaskLog id
 * @returns {Promise<TaskLog>} new worker Log with status
 */
async function register(key, status) {
  let workersLog = await read(key);
  if (!workersLog) {
    workersLog = [];
  }
  const worker = {
    timestamp: Date.now(),
    status: status,
  };
  workersLog.push(worker);
  await save(key, workersLog);
  return worker;
}

/**
 * get list of registered workersLog
 * @param {TaskLog} key TaskLog Key name of database
 * @returns {Promise<TaskLog[]>} list of registered workersLog
 */
async function list(key) {
  let workersLog = await read(key);
  if (!workersLog) {
    workersLog = [];
  }
  return workersLog;
}

/**
 * remove a TaskLog by an id
 * @param {TaskLog} key TaskLog Key name of database
 * @param {string} id TaskLog id
 * @returns {Promise<TaskLog>} removed TaskLog
 */
async function remove(key, id) {
  let workersLog = await read(key);
  if (!workersLog) {
    throw ERROR_WORKER_LOG_NOT_FOUND;
  }
  const idx = workersLog.findIndex((w) => w.id === id);
  if (idx === -1) {
    throw ERROR_WORKER_LOG_NOT_FOUND;
  }
  const deleted = workersLog.splice(idx, 1);
  await save(key, workersLog);
  return deleted;
}

module.exports = {
  add,
  register,
  list,
  remove,
  ERROR_REGISTER_DATA_INVALID,
  ERROR_WORKER_LOG_NOT_FOUND,
};
