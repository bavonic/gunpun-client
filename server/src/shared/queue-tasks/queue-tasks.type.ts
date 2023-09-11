export interface QueueTaskConfig {
  queueName?: string;
  onProcess?: (inputData: { [fieldName: string]: any }) => Promise<any> | any;
  maxRetryTime?: number,
}

export type QueueTaskConfigs<T = any> = {
  [K in keyof T]: QueueTaskConfig
}

export interface QueueTasksModuleConfigs<QueueConfigs extends QueueTaskConfigs> {
  amqpUrl: string,
  queueTaskConfigs: QueueConfigs,
  prefixQueueName?: string,
  prefetch?: number,
}

export interface QueueTaskPayload {
  [fieldName: string]: any
}

export type CreateQueueTask<Configs> = (queueName: keyof Configs, inputData: QueueTaskPayload) => Promise<any>