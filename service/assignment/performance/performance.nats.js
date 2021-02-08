const workerNats = require('./worker.nats');
const taskNats = require('./task.nats');

exports.main = function () {
  workerNats.workerLogSubAdd();
  workerNats.workerLogSubRemove();
  workerNats.workerLogSubShow();
  workerNats.workerDataSubRegister();
  workerNats.workerDataSubRemove();
  workerNats.workerDataSubGet();

  taskNats.taskLogSubAdd();
  taskNats.taskLogSubRemove();
  taskNats.taskLogSubShow();
  taskNats.taskDataSubRegister();
  taskNats.taskDataSubCountAll();
  taskNats.taskDataSubCountBy();
};
