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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const redis_1 = require("redis");
const AppConfigs_1 = require("../../AppConfigs");
const utils_1 = require("../../utils");
class RedisModule {
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.redisClient = (0, redis_1.createClient)({ url: (0, AppConfigs_1.getEnv)('REDIS_URL') });
            this.redisClient.on('error', (error) => (0, utils_1.logger)('ERROR', 'Redis connection error.', error));
            yield this.redisClient.connect();
        });
    }
    static reset() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.redisClient.flushDb();
        });
    }
    static getKey(key) {
        return `${AppConfigs_1.APP_KEY}-${key}`;
    }
    static set(key, data, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.redisClient.set(this.getKey(key), JSON.stringify(data), opts);
        });
    }
    static get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const cached = yield this.redisClient.get(this.getKey(key));
            if (!cached)
                return undefined;
            return JSON.parse(cached);
        });
    }
}
exports.RedisModule = RedisModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvcmVkaXMvcmVkaXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFrRTtBQUNsRSxpREFBbUQ7QUFDbkQsdUNBQXFDO0FBRXJDLE1BQWEsV0FBVztJQUd0QixNQUFNLENBQU8sVUFBVTs7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFBLG9CQUFZLEVBQUMsRUFBRSxHQUFHLEVBQUUsSUFBQSxtQkFBTSxFQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUEsY0FBTSxFQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNGLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQyxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQU8sS0FBSzs7WUFDaEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ25DLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBVztRQUN2QixPQUFPLEdBQUcsb0JBQU8sSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsTUFBTSxDQUFPLEdBQUcsQ0FBQyxHQUFXLEVBQUUsSUFBbUUsRUFBRSxJQUFnQjs7WUFDakgsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUUsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLEdBQUcsQ0FBQyxHQUFXOztZQUMxQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsTUFBTTtnQkFBRSxPQUFPLFNBQVMsQ0FBQztZQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFRLENBQUE7UUFDbEMsQ0FBQztLQUFBO0NBQ0Y7QUExQkQsa0NBMEJDIn0=