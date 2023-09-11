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
exports.RequestMain = void 0;
const axios_1 = __importDefault(require("axios"));
const AppConfigs_1 = require("../../AppConfigs");
const utils_1 = require("../../utils");
const requestError_1 = require("./requestError");
class RequestMain {
    static getURL(subURL) {
        return `${(0, AppConfigs_1.getEnv)('MAIN_SERVER_PORTAL_URL')}${subURL}`;
    }
    static getConfigs(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {};
            return {
                params: Object.assign(utils_1.ObjectUtils.cleanObj(params), {}),
                timeout: 1000 * 60 * 60 * 24,
                headers,
            };
        });
    }
    static get(subURL, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const configs = yield this.getConfigs(params);
            return axios_1.default.get(this.getURL(subURL), configs)
                .then(res => res.data)
                .catch(err => { throw new requestError_1.RequestError(err); });
        });
    }
    static put(subURL, payload = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const configs = yield this.getConfigs();
            return axios_1.default.put(this.getURL(subURL), utils_1.ObjectUtils.cleanObj(payload), configs)
                .then(res => res.data)
                .catch(err => { throw new requestError_1.RequestError(err); });
        });
    }
    static patch(subURL, payload = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const configs = yield this.getConfigs();
            return axios_1.default.patch(this.getURL(subURL), utils_1.ObjectUtils.cleanObj(payload), configs)
                .then(res => res.data)
                .catch(err => { throw new requestError_1.RequestError(err); });
        });
    }
    static delete(subURL, payload = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const configs = yield this.getConfigs();
            return axios_1.default.delete(this.getURL(subURL), Object.assign(Object.assign({}, configs), { data: payload }))
                .then(res => res.data)
                .catch(err => { throw new requestError_1.RequestError(err); });
        });
    }
    static post(subURL, payload = {}, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const configs = yield this.getConfigs();
            if (headers)
                configs.headers = Object.assign(Object.assign({}, configs.headers), headers);
            return axios_1.default.post(this.getURL(subURL), utils_1.ObjectUtils.cleanObj(payload), configs)
                .then(res => res.data)
                .catch(err => { throw new requestError_1.RequestError(err); });
        });
    }
}
exports.RequestMain = RequestMain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdE1haW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9yZXF1ZXN0L3JlcXVlc3RNYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUFrRDtBQUNsRCxpREFBMEM7QUFDMUMsdUNBQTBDO0FBQzFDLGlEQUE4QztBQUU5QyxNQUFhLFdBQVc7SUFDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFjO1FBQzFCLE9BQU8sR0FBRyxJQUFBLG1CQUFNLEVBQUMsd0JBQXdCLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQTtJQUN2RCxDQUFDO0lBRUQsTUFBTSxDQUFPLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRTs7WUFDakMsSUFBSSxPQUFPLEdBQUcsRUFBUyxDQUFDO1lBRXhCLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN2RCxPQUFPLEVBQUUsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQkFDNUIsT0FBTzthQUNSLENBQUE7UUFDSCxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQU8sR0FBRyxDQUFDLE1BQWMsRUFBRSxNQUFNLEdBQUcsRUFBRTs7WUFDMUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlDLE9BQU8sZUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQztpQkFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQkFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsTUFBTSxJQUFJLDJCQUFZLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQU8sR0FBRyxDQUFDLE1BQWMsRUFBRSxPQUFPLEdBQUcsRUFBRTs7WUFDM0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDeEMsT0FBTyxlQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsbUJBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDO2lCQUMxRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2lCQUNyQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxNQUFNLElBQUksMkJBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyxLQUFLLENBQUMsTUFBYyxFQUFFLE9BQU8sR0FBRyxFQUFFOztZQUM3QyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN4QyxPQUFPLGVBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUM7aUJBQzVFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7aUJBQ3JCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLE1BQU0sSUFBSSwyQkFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLE1BQU0sQ0FBQyxNQUFjLEVBQUUsT0FBTyxHQUFHLEVBQUU7O1lBQzlDLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRXhDLE9BQU8sZUFBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQ0FBTyxPQUFPLEtBQUUsSUFBSSxFQUFFLE9BQU8sSUFBRztpQkFDcEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQkFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsTUFBTSxJQUFJLDJCQUFZLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQU8sSUFBSSxDQUFDLE1BQWMsRUFBRSxPQUFPLEdBQUcsRUFBRSxFQUFFLE9BQWE7O1lBQzNELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3hDLElBQUksT0FBTztnQkFBRSxPQUFPLENBQUMsT0FBTyxtQ0FBUSxPQUFPLENBQUMsT0FBTyxHQUFLLE9BQU8sQ0FBRSxDQUFBO1lBRWpFLE9BQU8sZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLG1CQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQztpQkFDM0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQkFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsTUFBTSxJQUFJLDJCQUFZLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQUE7Q0FDRjtBQXBERCxrQ0FvREMifQ==