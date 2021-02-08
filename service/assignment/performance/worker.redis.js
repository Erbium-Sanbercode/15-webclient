const { read, save } = require('../lib/kv');

const ERROR_REGISTER_DATA_INVALID = 'data registrasi data log tidak lengkap';
const ERROR_WORKER_LOG_NOT_FOUND = 'data log tidak ditemukan';

/**
 * Worker type definition
 * @typedef {Object} WorkerLog
 * @property {string} key
 * @property {string} status
 */

/**
 * add new WorkerLog
 * @param {WorkerLog} key WorkerLog Key name of database
 * @param {string} id workerLog id
 * @returns {Promise<WorkerLog>} new worker Log with status
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
 * register new WorkerLog
 * @param {WorkerLog} key WorkerLog Key name of database
 * @param {string} id workerLog id
 * @returns {Promise<WorkerLog>} new worker Log with status
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
 * @param {WorkerLog} key WorkerLog Key name of database
 * @returns {Promise<WorkerLog[]>} list of registered workersLog
 */
async function list(key) {
  let workersLog = await read(key);
  if (!workersLog) {
    workersLog = [];
  }
  return workersLog;
}

/**
 * remove a workerLog by an id
 * @param {WorkerLog} key WorkerLog Key name of database
 * @param {string} id workerLog id
 * @returns {Promise<WorkerLog>} removed workerLog
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
