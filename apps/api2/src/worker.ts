import { Ampq } from './ampq/Ampq';

const ampq = new Ampq({
  hosts: ['3.123.142.151'],
  username: 'mq',
  password: 'aOrIgjBzsS3GFa',
  prefetchLimit: 100,
  eventQueueSuffix: 'app',
});

async function start() {
  ampq.addTaskHandler({
    type: 'sample-1',
    onMessage(message) {
      if (Math.random() < 0.5) {
        throw new Error('fake error');
      } else {
        console.log('processing A', message);
      }
    },
  });
  ampq.addEventHandler({
    type: 'sample-1',
    onMessage(message) {
      if (Math.random() < 0.5) {
        throw new Error('fake error');
      } else {
        console.log('processing B', message);
      }
    },
  });

  await ampq.connect();
  let n = 1;
  setInterval(() => {
    if (n < 2) {
      ampq.publishTask({
        type: 'sample-1',
        content: { foo: n++ },
      });
      ampq.publishEvent({
        type: 'sample-1',
        content: { foo: n++ },
      });
    }
  }, 1000);
}

start();
