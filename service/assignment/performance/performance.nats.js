const workerNats = require('./worker.nats');
const taskNats = require('./task.nats');

exports.main = function () {
  workerNats.workerLogSubRegister();
  workerNats.workerLogSubRemove();
  workerNats.workerLogSubShow();

  taskNats.taskLogSubRegister();
  taskNats.taskLogSubRemove();
  taskNats.taskLogSubShow();
};
