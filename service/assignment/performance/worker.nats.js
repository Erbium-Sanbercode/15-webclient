const { sub } = require('../lib/msgbus');
const { add, list, register, remove, get } = require('./worker.redis');

function workerLogSubAdd() {
  const workerLogSub = sub('workerLog.add', workerSubHandling);
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

function workerDataSubRegister() {
  const workerDataSub = sub('workerData.register', workerSubHandling);
  return;
}
function workerDataSubRemove() {
  const workerDataSub = sub('workerData.remove', workerSubHandling);
  return;
}
function workerDataSubGet() {
  const workerDataSub = sub('workerData.get', workerSubHandling);
  return;
}

async function workerSubHandling(msg, reply, subject, sid) {
  data = subject.split('.')[0];
  key = subject.split('.').slice(-1)[0];
  console.log(key);
  if (data == 'workerData') {
    switch (true) {
      case /^register$/gm.test(key):
        await register();
        break;
      case /^remove$/gm.test(key):
        await remove();
        break;
      case /^get$/gm.test(key):
        await get();
        break;
      default:
        console.log('Wrong');
    }
    const getData = await get();
    console.log(getData.toString());
  } else if (data == 'workerLog') {
    await add(subject, msg);
    const logList = await list(subject);
    console.log(logList);
  }
}

module.exports = {
  workerLogSubAdd,
  workerLogSubRemove,
  workerLogSubShow,
  workerDataSubRegister,
  workerDataSubRemove,
  workerDataSubGet,
};
