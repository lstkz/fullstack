import amqplib, { ConsumeMessage } from 'amqplib';
import uuid from 'uuid';

function delay(n: number) {
  return new Promise(resolve => setTimeout(resolve, n));
}

interface EventConsumer {
  queueName: string;
  handler: (
    msg: string,
    ack: () => void,
    nack: () => void,
    retry: (timeMs: number) => void
  ) => Promise<void>;
}

const hosts = ['3.123.142.151'];

class Ampq {
  private connection: amqplib.Connection | null = null;
  private publishChannel: amqplib.Channel | null = null;
  private eventConsumers: EventConsumer[] = [];
  private hostNameIndex = Date.now() % hosts.length;
  private isConnecting = false;

  async connect() {
    const nextIndex = ++this.hostNameIndex % hosts.length;
    const host = hosts[nextIndex];
    console.log('connect', host);

    this.connection = await amqplib.connect({
      protocol: 'amqp',
      hostname: host,
      port: 5672,
      username: 'mq',
      password: 'aOrIgjBzsS3GFa',
    });
    this.publishChannel = null;

    this.connection.on('error', e => {
      console.error('[AMPQ] error', e);
    });
    this.connection.on('close', () => {
      if (!this.isConnecting) {
        this.tryReconnect();
      }
    });
    await this.createChannel();
  }

  addEventConsumer(eventConsumer: EventConsumer) {
    this.eventConsumers.push(eventConsumer);
  }

  private async tryReconnect() {
    this.isConnecting = true;
    try {
      await this.connect();
      this.isConnecting = false;
    } catch (e) {
      console.error('[AMPQ] reconnect error', e.name);
      setTimeout(() => this.tryReconnect(), 1000);
    }
  }

  private async createChannel() {
    const channel = (this.publishChannel = await this.connection!.createChannel());
    await channel.assertQueue('queue', { durable: true });
    await channel.assertExchange('events', 'fanout', { durable: true });
    await channel.prefetch(20);
    await Promise.all(
      this.eventConsumers.map(async eventConsumer => {
        const retryQueue = `${eventConsumer.queueName}_retry`;
        // this.channel = await this.connection!.createChannel();
        await channel.assertQueue(eventConsumer.queueName, { durable: true });
        await channel.assertQueue(retryQueue, {
          durable: true,
          deadLetterExchange: '',
          deadLetterRoutingKey: eventConsumer.queueName,
          messageTtl: 1000 * 60 * 12,
        });
        await channel.bindQueue(eventConsumer.queueName, 'events', '');
        await channel.consume(eventConsumer.queueName, msg => {
          if (!msg) {
            return;
          }
          const retryCount = msg.properties.headers['x-retry'] ?? 0;
          console.log(msg.content.toString(), { retryCount });
          console.log(msg.properties.headers);
          eventConsumer.handler(
            msg.content.toString(),
            () => {
              try {
                channel.ack(msg);
                // console.log(
                //   'ack',
                //   msg.content.toString(),
                //   msg.properties.messageId
                // );
              } catch (e) {
                console.error('[AMPQ] cannot ack error', e.name);
              }
              // channel.ack()
              // await this.retryMsgResult('ack', msg, msg.properties.messageId);
            },
            async () => {
              // channel.publish('', '', Buffer.from(''), {});
              await this.retryMsgResult('nack', msg);
              // console.log('nack', msg.content.toString());
            },
            timeMs => {
              channel.sendToQueue(retryQueue, msg.content, {
                expiration: timeMs,
                headers: {
                  ...msg.properties.headers,
                  'x-retry': retryCount + 1,
                },
              });
              channel.ack(msg);
            }
          );
        });
      })
    );

    // await this.publishChannel.assertQueue('f_1', { durable: true });
    // await this.publishChannel.assertQueue('f_2', { durable: true });
    // await this.publishChannel.bindQueue('f_1', 'events', '');
    // await this.publishChannel.bindQueue('f_2', 'events', '');
  }

  private async retryMsgResult(
    method: 'ack' | 'nack',
    msg: amqplib.ConsumeMessage,
    n = 1
  ) {
    let success = false;
    if (this.publishChannel) {
      try {
        this.publishChannel[method](msg);
        success = true;
      } catch (e) {
        console.error('[AMPQ] Error when %s message %j', method, e.name);
      }
    }
    if (!success) {
      await delay(n * 100);
      await this.retryMsgResult(method, msg, n + 1);
      return;
    }
  }

  async publishMessage(msg: string) {
    await this.retryPublishMessage(msg);
  }

  private async retryPublishMessage(msg: string, n = 1): Promise<void> {
    if (n !== 1) {
      console.error('[AMPQ] Retry publish message %j retry=%d', msg, n);
    }
    let success = false;
    if (this.publishChannel) {
      try {
        this.publishChannel.publish('events', '', Buffer.from(msg), {
          messageId: uuid(),
        });
        success = true;
      } catch (e) {
        console.error('[AMPQ] Error when publishing message %j', msg, e.name);
      }
    }
    if (!success) {
      await delay(n * 100);
      await this.retryPublishMessage(msg, n + 1);
      return;
    }
  }

  async sendMessage(msg: string) {
    await this.retrySendMessage(msg);
  }

  private async retrySendMessage(msg: string, n = 1): Promise<void> {
    if (n !== 1) {
      console.error('[AMPQ] Retry send message %j retry=%d', msg, n);
    }
    let success = false;
    if (this.publishChannel) {
      try {
        this.publishChannel.sendToQueue('queue', Buffer.from(msg));
        success = true;
      } catch (e) {
        console.error('[AMPQ] Error when sending message %j', msg, e.name);
      }
    }
    if (!success) {
      await delay(n * 100);
      await this.retrySendMessage(msg, n + 1);
      return;
    }
  }
}

async function run() {
  const amqp = new Ampq();

  // amqp.consume('f_1', ())
  amqp.addEventConsumer({
    queueName: 'f_1',
    handler: async (message, ack, nack, delay) => {
      console.log('\nf_1 handling', message);
      if (Math.random() > 0.8) {
        console.log('ack', message);
        ack();
      } else {
        console.log('delay', message, new Date().toISOString());
        delay(1000);
      }
      // setTimeout(ack, 500);
    },
  });
  // amqp.addEventConsumer({
  //   queueName: 'f_2',
  //   handler: async (message, ack, nack) => {
  //     console.log('f_2 handling', message);
  //     setTimeout(ack, 500);
  //   },
  // });

  await amqp.connect();

  let n = 1;
  const sendLoop = async () => {
    if (n > 5) {
      return;
    }
    let start = Date.now();
    await amqp.publishMessage('msg ' + n);
    let end = Date.now();
    console.log('send msg %d in %dms', n, end - start);
    n++;
    setTimeout(sendLoop, 2000);
  };
  sendLoop();

  // let channel: amqplib.Channel;
  // let isConnected = false;
  // let conn = await amqplib.connect({
  //   protocol: 'amqp',
  //   hostname: '18.192.198.247',
  //   port: 5672,
  //   username: 'mq',
  //   password: 'aOrIgjBzsS3GFa',
  // });
  // isConnected = true;

  // conn.on('error', e => {
  //   console.error(e);
  //   isConnected = false;
  // });

  // const submit = (queue: string, msg: string) => {};

  // const q = 'events2';
  // let n = 1;
  // const loop = () => {};

  // const confirm = await conn.createConfirmChannel();
  // confirm.sendToQueue('a', Buffer.from('a'), {}, (err, ok) => {});

  // let connectTry = 1;
  // const connectChannel = async () => {
  //   console.log('connect channel', connectTry++);
  //   channel = await conn.createChannel();
  //   await channel.assertQueue(q, { durable: true });
  //   channel.on('close', () => {
  //     console.log('channel close');
  //   });
  //   channel.on('error', () => {
  //     console.log('channel error');
  //   });
  // };
  // await connectChannel();

  // const send = async () => {
  //   try {
  //     channel.sendToQueue(q, Buffer.from('msg_' + n));
  //     console.log('send', n);
  //     n++;
  //   } catch (e) {
  //     console.log('fail send');
  //     let success = false;
  //     do {
  //       success = await connectChannel()
  //         .then(() => true)
  //         .catch(() => false);
  //       if (!success) {
  //         await delay(500);
  //       }
  //     } while (!success);
  //   }
  //   setTimeout(send, 300);
  // };
  // send();
  // console.log('done');
  // await conn.close();
}

run();
