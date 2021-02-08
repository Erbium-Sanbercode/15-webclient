const { sub, pub } = require('../lib/msgbus');
const { add, list, register, get, countAll, countBy } = require('./task.redis');

function taskLogSubAdd() {
  const taskLogSub = sub('taskLog.add', taskSubHandling);
  return;
}
function taskLogSubRemove() {
  const taskLogSub = sub('taskLog.remove', taskSubHandling);
  return;
}
function taskLogSubShow() {
  const taskLogSub = sub('taskLog.show', taskSubHandling);
  return;
}

function taskDataSubRegister() {
  const taskDataSub = sub('taskData.register', taskSubHandling);
  return;
}
function taskDataSubCountAll() {
  const taskDataSub = sub('taskData.countAll', taskSubHandling);
  return;
}
function taskDataSubCountBy() {
  const taskDataSub = sub('taskData.countBy', taskSubHandling);
  return;
}

async function taskSubHandling(msg, reply, subject, sid) {
  data = subject.split('.')[0];
  key = subject.split('.').slice(-1)[0];
  console.log(key);
  if (data == 'taskData') {
    switch (true) {
      case /^register$/gm.test(key):
        await register(msg);
        break;
      case /^countAll$/gm.test(key):
        // console.log(await countAll());
        const count = await countAll();
        console.log(count.toString());
        // pub(reply, count.toString());
        break;
      case /^countBy$/gm.test(key):
        const count = await countBy(msg);
        pub(reply, count.toString());
        break;
      default:
        console.log('Wrong');
    }
    const getData = await get();
    console.log(getData);
  } else if (data == 'taskLog') {
    await add(subject, msg);
    const logList = await list(subject);
    console.log(logList);
  }
}

module.exports = {
  taskLogSubAdd,
  taskLogSubRemove,
  taskLogSubShow,
  taskDataSubRegister,
  taskDataSubCountAll,
  taskDataSubCountBy,
};
