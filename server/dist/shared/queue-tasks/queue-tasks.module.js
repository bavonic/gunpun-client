"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueTask = exports.QueueTasksModule = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
class QueueTasksModule {
    constructor(configs) {
        this.queues = {};
        this.isInitialized = false;
        this.configs = configs;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield amqplib_1.default.connect(this.configs.amqpUrl);
            this.channel = yield this.connection.createChannel();
            if (this.configs.prefetch)
                yield this.channel.prefetch(this.configs.prefetch);
            let queues = {};
            yield Promise.all(Object.keys(this.configs.queueTaskConfigs).map((queueKey) => __awaiter(this, void 0, void 0, function* () {
                const queueConfig = this.configs.queueTaskConfigs[queueKey];
                const queueTaskProcess = new QueueTask(queueConfig, this.channel, queueKey, this.configs.prefixQueueName);
                yield queueTaskProcess.consume();
                queues[queueKey] = queueTaskProcess;
            })));
            this.queues = queues;
        });
    }
}
exports.QueueTasksModule = QueueTasksModule;
class QueueTask {
    constructor(config, channel, queueKey, prefixQueueName) {
        this.isInitialized = false;
        this.config = config;
        this.channel = channel;
        this.queueName = config.queueName || queueKey;
        if (prefixQueueName)
            this.queueName = `${prefixQueueName}-${this.queueName}`;
        this.maxRetryTime = config.maxRetryTime || 1;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isInitialized)
                return;
            yield this.channel.assertQueue(this.queueName, { durable: true });
            this.isInitialized = true;
        });
    }
    consume() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config.onProcess)
                return;
            yield this.initialize();
            yield this.channel.consume(this.queueName, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg) {
                    try {
                        yield this.config.onProcess(JSON.parse(msg.content.toString()));
                        this.channel.ack(msg);
                    }
                    catch (error) {
                        if (msg.fields.deliveryTag >= this.maxRetryTime)
                            this.channel.nack(msg, false, false);
                        else
                            this.channel.nack(msg);
                    }
                }
            }));
        });
    }
    create(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate
            try {
                JSON.parse(JSON.stringify(payload));
            }
            catch (error) {
                throw Error("Payload must be JSON");
            }
            yield this.initialize();
            return this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(payload)), Object.assign({ persistent: true }, options));
        });
    }
}
exports.QueueTask = QueueTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUtdGFza3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9xdWV1ZS10YXNrcy9xdWV1ZS10YXNrcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQThCO0FBRzlCLE1BQWEsZ0JBQWdCO0lBTzNCLFlBQVksT0FBd0M7UUFKcEQsV0FBTSxHQUF1QyxFQUFTLENBQUM7UUFDdkQsa0JBQWEsR0FBRyxLQUFLLENBQUE7UUFJbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVLLFVBQVU7O1lBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLGlCQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7Z0JBQUUsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTlFLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQztZQUVyQixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQU8sUUFBUSxFQUFFLEVBQUU7Z0JBQ2xGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzVELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFP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