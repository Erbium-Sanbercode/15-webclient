const msgbus = require('./lib/msgbus');
const kv = require('./lib/kv');
const performanceNats = require('./performance/performance.nats');

async function messageBus() {
  try {
    console.log('connect to message bus service...');
    await msgbus.connect();
    console.log('message bus connected');
  } catch (err) {
    console.error('message bus connection failed');
    return;
  }
}

async function kvdb() {
  try {
    console.log('connect to kv database service...');
    await kv.connect();
    console.log('kv database connected');
  } catch (err) {
    console.error('kv database connection failed');
    return;
  }
}

async function main(command) {
  switch (command) {
    case 'nats':
      await messageBus();
      break;
    case 'performance':
      await kvdb();
      performanceNats.main();
      break;
    default:
      console.log(`${command} tidak dikenali`);
      console.log('command yang valid: task, worker, performance');
  }
}

main(process.argv[2]);
