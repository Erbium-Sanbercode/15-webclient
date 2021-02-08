const nats = require('nats');
let client;

function connect() {
  return new Promise((resolve, reject) => {
    client = nats.connect();
    client.on('connect', () => {
      resolve();
    });
    client.on('error', (err) => {
      reject(err);
    });
  });
}

function sub(subjectName, callback) {
  connect();
  return client.subscribe(subjectName, callback);
}

function unsub(subscriber) {
  connect();
  return client.unsubscribe(subscriber);
}

function pub(subjectName, msg) {
  connect();
  client.publish(subjectName, msg);
}

function close() {
  connect();
  if (client.connected) {
    client.close();
  }
}

module.exports = {
  connect,
  sub,
  unsub,
  pub,
  close,
};
