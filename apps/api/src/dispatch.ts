import { getBindings } from './common/bindings';
import { randomUniqString } from './common/helper';
import { ampq } from './lib';
import { AppEvent, AppTask } from './types';

export async function dispatchEvent(event: AppEvent) {
  if (process.env.NODE_ENV !== 'test') {
    await ampq.publishEvent(event);
  } else {
    const bindings = getBindings('event');
    const target = bindings.find(x => x.type === event.type);
    if (!target) {
      return;
    }
    await target.handler(randomUniqString(), event.payload);
  }
}

export async function dispatchTask(task: AppTask) {
  if (process.env.NODE_ENV !== 'test') {
    await ampq.publishTask(task);
  } else {
    const bindings = getBindings('task');
    const target = bindings.find(x => x.type === task.type);
    if (!target) {
      throw new Error('No task handler for: ' + task.type);
    }
    await target.handler(randomUniqString(), task.payload);
  }
}
