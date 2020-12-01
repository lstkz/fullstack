import * as R from 'remeda';
import amqplib from 'amqplib';

export interface AmpqMessage<T = any> {
  id: string;
  type: string;
  payload: T;
}

export interface AmpqPublishMessage<T = any> {
  type: string;
  payload: T;
}

type OnMessageFn = (message: AmpqMessage) => Promise<void> | void;

export interface AmpqHandler {
  type: string;
  onMessage: OnMessageFn;
}

function _delay(n: number) {
  return new Promise(resolve => setTimeout(resolve, n));
}

function _getRequeueDelay(retry: number) {
  const s = 1000;
  const m = 60 * s;
  if (retry < 5) {
    return s;
  }
  if (retry < 10) {
    return m;
  }
  if (retry < 20) {
    return 15 * m;
  }
  return 60 * m;
}

interface AmpqOptions {
  hosts: string[];
  prefetchLimit: number;
  port?: number;
  username: string;
  password: string;
  eventQueueSuffix: string;
}

const TASKS_QUEUE = 'tasks';
const EVENTS_EXCHANGE = 'events';
const RETRY_QUEUE_SUFFIX = 'retry';

const DEFAULT_RETRY_QUEUE_PARAMS = {
  durable: true,
  deadLetterExchange: '',
  messageTtl: 1000 * 60 * 12,
};

interface ProcessMessageOptions {
  channel: amqplib.Channel;
  msg: amqplib.ConsumeMessage | undefined | null;
  onMessage: OnMessageFn;
  queueName: string;
  retryQueue: string;
}

export class Ampq {
  private connection: amqplib.Connection | null = null;
  private channel: amqplib.Channel | null = null;
  private isConnectCalled = false;
  private eventHandlers: Map<string, AmpqHandler[]> = new Map();
  private taskHandlers: Map<string, AmpqHandler> = new Map();
  private isReconnecting = false;
  private hostNameIndex = 0;

  constructor(private options: AmpqOptions) {
    this.hostNameIndex = Math.round(Math.random() * 100) % options.hosts.length;
  }

  async connect() {
    this.isConnectCalled = true;
    const { hosts, port, username, password } = this.options;
    const nextIndex = ++this.hostNameIndex % hosts.length;
    const host = hosts[nextIndex];
    this.connection = await amqplib.connect({
      protocol: 'amqp',
      hostname: host,
      port: port ?? 5672,
      username,
      password,
    });
    this.connection.on('error', e => {
      this.logError('connection error', e);
    });
    this.connection.on('close', () => {
      if (!this.isReconnecting) {
        this.tryReconnect();
      }
    });
    await this.initChannels();
  }

  addEventHandler(handler: AmpqHandler) {
    this.assertConnectNotCalled();
    if (!this.eventHandlers.has(handler.type)) {
      this.eventHandlers.set(handler.type, []);
    }
    this.eventHandlers.get(handler.type)!.push(handler);
  }

  addTaskHandler(handler: AmpqHandler) {
    this.assertConnectNotCalled();
    if (this.taskHandlers.has(handler.type)) {
      throw new Error('Duplicated task handler for ' + handler.type);
    }
    this.taskHandlers.set(handler.type, handler);
  }

  async publishEvent(msg: AmpqPublishMessage) {
    await this.retryPublishMessage('events', msg);
  }

  async publishTask(msg: AmpqPublishMessage) {
    await this.retryPublishMessage('tasks', msg);
  }

  private async retryPublishMessage(
    msgType: 'events' | 'tasks',
    msg: AmpqPublishMessage,
    retry = 0
  ) {
    if (retry === 1 || (retry > 0 && retry % 100 === 0)) {
      this.logError(`Trying to retry publish (retry = ${retry})`, msg);
    }
    let success = false;
    if (this.channel) {
      try {
        const ampqMessage: AmpqPublishMessage = {
          type: msg.type,
          payload: msg.payload,
        };
        const options = {
          messageId: R.randomString(20),
        };
        const serialized = Buffer.from(JSON.stringify(ampqMessage));
        if (msgType === 'events') {
          this.channel.publish(EVENTS_EXCHANGE, '', serialized, options);
        } else {
          this.channel.sendToQueue(TASKS_QUEUE, serialized, options);
        }
        success = true;
      } catch (e) {
        this.logError('Error when publish message', e);
      }
    }
    if (!success) {
      await _delay(1000);
      await this.retryPublishMessage(msgType, msg, retry + 1);
      return;
    }
  }

  private async tryReconnect() {
    this.isReconnecting = true;
    try {
      await this.connect();
      this.isReconnecting = false;
    } catch (e) {
      this.logError('Reconnect error', e);
      setTimeout(() => this.tryReconnect(), 1000);
    }
  }

  private assertConnectNotCalled() {
    if (this.isConnectCalled) {
      throw new Error('Connect already called');
    }
  }

  private async initChannels() {
    if (!this.connection) {
      throw new Error('Connection not created');
    }
    const channel = await this.connection!.createChannel();
    this.channel = channel;
    await channel.assertQueue(TASKS_QUEUE, { durable: true });
    await channel.assertExchange(EVENTS_EXCHANGE, 'fanout', { durable: true });
    await channel.prefetch(this.options.prefetchLimit);

    await this.setupEventHandlers(channel);
    await this.setupTaskHandlers(channel);
  }
  private getEventsQueueName() {
    return `${EVENTS_EXCHANGE}:${this.options.eventQueueSuffix}`;
  }

  private async setupEventHandlers(channel: amqplib.Channel) {
    await channel.assertExchange(EVENTS_EXCHANGE, 'fanout', { durable: true });
    const queueName = this.getEventsQueueName();
    const retryQueue = `${queueName}:${RETRY_QUEUE_SUFFIX}`;
    await channel.assertQueue(queueName, { durable: true });
    await channel.assertQueue(retryQueue, {
      ...DEFAULT_RETRY_QUEUE_PARAMS,
      deadLetterRoutingKey: queueName,
    });
    await channel.bindQueue(queueName, EVENTS_EXCHANGE, '');

    await channel.consume(queueName, async msg => {
      await this.processMessage({
        channel,
        msg,
        onMessage: async message => {
          const handlers = this.eventHandlers.get(message.type);
          if (!handlers) {
            return;
          }
          await Promise.all(
            handlers.map(handler => handler.onMessage(message))
          );
        },
        queueName: queueName,
        retryQueue: retryQueue,
      });
    });
  }

  private async setupTaskHandlers(channel: amqplib.Channel) {
    await channel.assertQueue(TASKS_QUEUE, { durable: true });
    const taskRetryQueue = `${TASKS_QUEUE}:${RETRY_QUEUE_SUFFIX}`;
    await channel.assertQueue(taskRetryQueue, {
      ...DEFAULT_RETRY_QUEUE_PARAMS,
      deadLetterRoutingKey: TASKS_QUEUE,
    });

    await channel.consume(TASKS_QUEUE, async msg => {
      await this.processMessage({
        channel,
        msg,
        onMessage: async message => {
          const handler = this.taskHandlers.get(message.type);
          if (!handler) {
            throw new Error('Missing task handler for: ' + message.type);
          }
          await handler.onMessage(message);
        },
        queueName: TASKS_QUEUE,
        retryQueue: taskRetryQueue,
      });
    });
  }

  private async processMessage(options: ProcessMessageOptions) {
    const { channel, msg, onMessage, queueName, retryQueue } = options;
    try {
      if (!msg) {
        return;
      }
      const retryCount = msg.properties.headers['x-retry'] ?? 0;
      const messageId = msg.properties.messageId;
      if (!messageId) {
        this.logError('no messageId ignoring', { msg });
        channel.ack(msg);
        return;
      }
      const uniqueMessageId = `${messageId}:${queueName}`;
      let publishMsg: AmpqPublishMessage = null!;
      try {
        publishMsg = JSON.parse(msg.content.toString('utf8'));
      } catch (e) {
        this.logError('no messageId ignoring', { msg });
        channel.ack(msg);
        return;
      }
      try {
        await onMessage({
          id: uniqueMessageId,
          type: publishMsg.type,
          payload: publishMsg.payload,
        });
      } catch (e) {
        this.logError(
          `failed to process a message from ${queueName} queue (retry ${retryCount})`,
          publishMsg,
          e
        );
        channel.sendToQueue(retryQueue, msg.content, {
          expiration: _getRequeueDelay(retryCount),
          headers: {
            ...msg.properties.headers,
            'x-retry': retryCount + 1,
          },
          messageId,
        });
      } finally {
        channel.ack(msg);
      }
    } catch (e) {
      this.logError('Unexpected error when processing', { msg });
    }
  }

  private logError(...params: any[]) {
    console.error('[AMPQ]', ...params);
  }
}
