const { sub } = require('../lib/msgbus');
const { add, register, remove, list } = require('./worker.redis');

function workerLogSubRegister() {
  const workerLogSub = sub('workerLog.register', workerSubHandling);
  return;
}
function workerLogSubRemove() {
  const workerLogSub = sub('workerLog.remove', workerSubHandling);
  return;
}
function workerLogSubShow() {
  const workerLogSub = sub('workerLog.show', workerSubHandling);
  return;
}

async function workerSubHandling(msg, reply, subject, sid) {
  key = subject.split('.').slice(-1)[0];
  switch (true) {
    case /^remove$|^register$|^show$/gm.test(key):
      await add(subject, msg);
      break;
    default:
      console.log('Wrong');
  }
  const logList = await list(subject);
  console.log(logList);
}

module.exports = {
  workerLogSubRegister,
  workerLogSubRemove,
  workerLogSubShow,
};
