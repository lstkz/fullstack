import { ampq } from './lib';
import { reportError } from './common/bugsnag';

async function start() {
  // ampq.addTaskHandler({
  //   type: 'sample-1',
  //   onMessage(message) {
  //     if (Math.random() < 0.5) {
  //       throw new Error('fake error');
  //     } else {
  //       console.log('processing A', message);
  //     }
  //   },
  // });
  // ampq.addEventHandler({
  //   type: 'sample-1',
  //   onMessage(message) {
  //     if (Math.random() < 0.5) {
  //       throw new Error('fake error');
  //     } else {
  //       console.log('processing B', message);
  //     }
  //   },
  // });

  await ampq.connect('both');
  // let n = 1;
  // setInterval(() => {
  //   if (n < 2) {
  //     ampq.publishTask({
  //       type: 'sample-1',
  //       payload: { foo: n++ },
  //     });
  //     ampq.publishEvent({
  //       type: 'sample-1',
  //       payload: { foo: n++ },
  //     });
  //   }
  // }, 1000);
}

start().catch(e => {
  reportError({
    error: e,
    source: 'worker',
    data: {
      info: 'Error when starting a worker',
    },
  });
  process.exit(1);
});
