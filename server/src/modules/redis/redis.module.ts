import { createClient, RedisClientType, SetOptions } from "redis";
import { APP_KEY, getEnv } from "../../AppConfigs";
import { logger } from "../../utils";

export class RedisModule {
  static redisClient: RedisClientType<any>;

  static async initialize() {
    this.redisClient = createClient({ url: getEnv('REDIS_URL') })
    this.redisClient.on('error', (error) => logger('ERROR', 'Redis connection error.', error));
    await this.redisClient.connect();
  }

  static async reset() {
    return this.redisClient.flushDb()
  }

  static getKey(key: string) {
    return `${APP_KEY}-${key}`;
  }

  static async set(key: string, data: { [fieldName: string]: any } | { [fieldName: string]: any }[], opts: SetOptions) {
    return this.redisClient.set(this.getKey(key), JSON.stringify(data), opts);
  }

  static async get(key: string) {
    const cached = await this.redisClient.get(this.getKey(key));
    if (!cached) return undefined;
    return JSON.parse(cached) as any
  }
}