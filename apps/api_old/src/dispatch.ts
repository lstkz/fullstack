import { AppEvent } from './types';
import { sns } from './lib';

export async function dispatch(event: AppEvent) {
  if (process.env.IS_AWS) {
    await sns
      .publish({
        Message: JSON.stringify(event),
        TopicArn: process.env.TOPIC_ARN,
      })
      .promise();
  } else {
    const { eventMapping } = await import('./generated/event-mapping');
    const handlerMap = eventMapping[event.type] || {};
    const keys = Object.keys(handlerMap);
    await Promise.all(
      keys.map(async key => {
        const { options } = await handlerMap[key]();
        await options.handler(event as any);
      })
    );
  }
}
