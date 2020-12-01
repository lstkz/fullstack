import { config } from 'config';
import { Ampq } from './ampq/Ampq';

export const ampq = new Ampq({
  ...config.rabbit,
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
        payload: { foo: n++ },
      });
      ampq.publishEvent({
        type: 'sample-1',
        payload: { foo: n++ },
      });
    }
  }, 1000);
}
