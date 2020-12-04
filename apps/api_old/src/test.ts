import stompit from 'stompit';
import mqtt from 'mqtt';
import uuid from 'uuid';
import amqplib from 'amqplib';
import { Client as AMQPClient } from 'amqp10';

async function run() {
  const connectOptions = {
    host:
      'b-8f91df4b-a54a-44eb-9600-9cdfd0409892-1.mq.eu-central-1.amazonaws.com',
    port: 61614,
    connectHeaders: {
      host: '/',
      login: 'mq',
      passcode: 'asdxcvfbvgfngfhfgjgfj',
      'heart-beat': '5000,5000',
    },
  };
  return new Promise((resolve, reject) => {
    stompit.connect(connectOptions, (err, client) => {
      if (err) {
        return reject(err);
      }

      const sendHeaders = {
        destination: '/queue/events2',
        'content-type': 'text/plain',
      };

      const frame = client.send(sendHeaders);
      frame.write(JSON.stringify(event));
      frame.end();
      resolve();
    });
  });
}

async function run2() {
  var client = mqtt.connect(
    'wss://b-8f91df4b-a54a-44eb-9600-9cdfd0409892-1.mq.eu-central-1.amazonaws.com',
    {
      username: 'mq',
      password: 'asdxcvfbvgfngfhfgjgfj',
      port: 61619,
      clientId: 'lambda_' + uuid(),
    }
  );
  return new Promise((resolve, reject) => {
    client.on('error', reject);
    client.on('connect', function () {
      console.log('connected');
      client.publish();
      client.publish('events2', 'Hello mqtt');
      client.end();
      resolve();
      // client.subscribe('events2', function (err) {
      //   if (!err) {
      //     client.publish('events2', 'Hello mqtt');
      //     resolve();
      //   } else {
      //     reject(err);
      //   }
      // });
    });
  });
}

async function run3() {
  var conn = await amqplib.connect(
    'amqps://mq:asdxcvfbvgfngfhfgjgfj@b-8f91df4b-a54a-44eb-9600-9cdfd0409892-1.mq.eu-central-1.amazonaws.com:5671'
  );
  conn.on('error', e => {
    console.error(e);
  });
  const q = 'events2';
  const ch = await conn.createChannel();
  await ch.assertQueue(q, { durable: true });
  if (!ch.sendToQueue(q, Buffer.from('foobar'))) {
    console.log('send fail');
  }
  console.log('done');
  await conn.close();
}

import rhea from 'rhea';

async function run4() {
  var connection = rhea.connect({
    port: 5671,
    host:
      'b-8f91df4b-a54a-44eb-9600-9cdfd0409892-1.mq.eu-central-1.amazonaws.com',
    username: 'mq',
    password: 'asdxcvfbvgfngfhfgjgfj',
  });

  connection.once('sendable', function (context) {
    context.sender.send({ body: 'Hello World!' });
  });
}

run4();
