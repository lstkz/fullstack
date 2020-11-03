import { APIGatewayProxyEvent, SNSEvent, DynamoDBStreamEvent } from '../types';

type AWSEvent = SNSEvent | APIGatewayProxyEvent | DynamoDBStreamEvent;
// | CloudWatchLogsEvent;

function isSnsEvent(event: AWSEvent): event is SNSEvent {
  return (
    'Records' in event && event.Records.length > 0 && 'Sns' in event.Records[0]
  );
}

function isDynamoStreamEvent(event: AWSEvent): event is DynamoDBStreamEvent {
  return (
    'Records' in event &&
    event.Records.length > 0 &&
    'dynamodb' in event.Records[0]
  );
}

export function handler(event: AWSEvent, _: any, __: any) {
  if (isDynamoStreamEvent(event)) {
    return import(
      /* webpackChunkName: "dynamoStream" */
      './dynamoStream'
    ).then(module => module.handler(event));
  } else if (isSnsEvent(event)) {
    return import(
      /* webpackChunkName: "event" */
      './event'
    ).then(module => module.handler(event));
  } else {
    return import(
      /* webpackChunkName: "rpc" */
      './rpc'
    ).then(module => module.handler(event));
  }
}
