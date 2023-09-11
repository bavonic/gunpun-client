import amqplib from 'amqplib';
import { QueueTaskConfig, QueueTaskConfigs, QueueTaskPayload, QueueTasksModuleConfigs } from './queue-tasks.type';

export class QueueTasksModule<Queues extends QueueTaskConfigs> {
  private connection: amqplib.Connection;
  private channel: amqplib.Channel;
  queues: { [K in keyof Queues]: QueueTask } = {} as any;
  isInitialized = false
  configs: QueueTasksModuleConfigs<Queues>

  constructor(configs: QueueTasksModuleConfigs<Queues>) {
    this.configs = configs;
  }

  async initialize() {
    this.connection = await amqplib.connect(this.configs.amqpUrl);
    this.channel = await this.connection.createChannel();
    if (this.configs.prefetch) await this.channel.prefetch(this.configs.prefetch);

    let queues: any = {};

    await Promise.all(Object.keys(this.configs.queueTaskConfigs).map(async (queueKey) => {
      const queueConfig = this.configs.queueTaskConfigs[queueKey];
      const queueTaskProcess = new QueueTask(queueConfig, this.channel, queueKey, this.configs.prefixQueueName);
      await queueTaskProcess.consume();
      queues[queueKey] = queueTaskProcess;
    }));

    this.queues = queues;
  }
}

export class QueueTask {
  queueName: string;
  config: QueueTaskConfig;
  channel: amqplib.Channel;
  maxRetryTime: number;
  isInitialized = false;

  constructor(config: QueueTaskConfig, channel: amqplib.Channel, queueKey: string, prefixQueueName?: string) {
    this.config = config;
    this.channel = channel;
    this.queueName = config.queueName || queueKey;
    if (prefixQueueName) this.queueName = `${prefixQueueName}-${this.queueName}`;
    this.maxRetryTime = config.maxRetryTime || 1;
  }

  async initialize() {
    if (this.isInitialized) return;
    await this.channel.assertQueue(this.queueName, { durable: true });
    this.isInitialized = true;
  }

  async consume() {
    if (!this.config.onProcess) return;
    await this.initialize();

    await this.channel.consume(this.queueName, async (msg) => {
      if (msg) {
        try {
          await this.config.onProcess!(JSON.parse(msg.content.toString()) as any);
          this.channel.ack(msg);
        } catch (error) {
          if (msg.fields.deliveryTag >= this.maxRetryTime) this.channel.nack(msg, false, false);
          else this.channel.nack(msg);
        }
      }
    })
  }

  async create(payload: QueueTaskPayload, options?: amqplib.Options.Publish) {
    // Validate
    try {
      JSON.parse(JSON.stringify(payload));
    } catch (error) {
      throw Error("Payload must be JSON");
    }

    await this.initialize();

    return this.channel.sendToQueue(
      this.queueName,
      Buffer.from(JSON.stringify(payload)),
      {
        persistent: true,
        ...options,
      }
    )
  }
}