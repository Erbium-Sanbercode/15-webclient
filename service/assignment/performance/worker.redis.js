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
 * @param {string} status workerLog status
 * @returns {Promise<WorkerLog>} new worker Log with status
 */
async function add(key, status) {
  let workersLog = await list(key);
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
 * get number of worker data
 * @returns {Promise<number>} value of worker data
 */
async function get() {
  let workersData = await read('worker');
  if (!workersData) {
    workersData = 0;
  }
  return workersData;
}
/**
 * increase a worker
 * @returns {Promise<number>} increasing worker data
 */
async function register() {
  let worker = await get();
  worker += 1;
  await save('worker', worker);
  return worker;
}
/**
 * decrease a worker
 * @returns {Promise<number>} decreasing worker data
 */
async function remove() {
  let worker = await get();
  if (worker < 1) {
    worker = 0;
  } else {
    worker -= 1;
  }
  await save('worker', worker);
  return worker;
}

module.exports = {
  add,
  list,
  register,
  get,
  remove,
  ERROR_REGISTER_DATA_INVALID,
  ERROR_WORKER_LOG_NOT_FOUND,
};
