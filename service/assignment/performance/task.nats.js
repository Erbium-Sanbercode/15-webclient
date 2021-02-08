const { sub } = require('../lib/msgbus');
const { add, register, remove, list } = require('./task.redis');

function taskLogSubRegister() {
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

async function taskSubHandling(msg, reply, subject, sid) {
  key = subject.split('.').slice(-1)[0];
  switch (true) {
    case ['add', 'remove', 'show'].includes(key):
      await add(subject, msg);
      break;
    default:
      console.log('Wrong');
  }
  const logList = await list(subject);
  console.log(logList);
}

module.exports = {
  taskLogSubRegister,
  taskLogSubRemove,
  taskLogSubShow,
};
