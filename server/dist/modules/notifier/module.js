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
exports.NotifierModule = void 0;
const axios_1 = __importDefault(require("axios"));
const AppConfigs_1 = require("../../AppConfigs");
const utils_1 = require("../../utils");
class NotifierModule {
    static sendTelegram(body, specific_chat_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const env = (0, AppConfigs_1.getEnv)('ENV');
            const chat_id = specific_chat_id || (env === 'production' ? -801777458 : -919659647);
            axios_1.default.post(`https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`, {
                chat_id,
                text: body,
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            })
                .catch((error) => (0, utils_1.logger)('ERROR', `${this.name}.sendTelegram`, error, false));
        });
    }
    static trackingError(message, stack) {
        return __awaiter(this, void 0, void 0, function* () {
            let stackOutput = "UNKNOW";
            try {
                stackOutput = JSON.stringify(stack, null, 2);
            }
            catch (error) { }
            return this.sendTelegram(`
    <strong>🔴🔴 [${(0, AppConfigs_1.getEnv)('ENV').toUpperCase()}] Server Error</strong>
    • Message: ${message}
    • Stack: ${stackOutput}
    `, this.telegramGroupLogs);
        });
    }
}
NotifierModule.telegramBotToken = '6037335267:AAE9cefX2E0StEWd9TLZ-8MMnQwu8FcrvSY';
NotifierModule.telegramGroupLogs = -919659647;
exports.NotifierModule = NotifierModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvbm90aWZpZXIvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQixpREFBMEM7QUFDMUMsdUNBQXFDO0FBRXJDLE1BQWEsY0FBYztJQUl6QixNQUFNLENBQU8sWUFBWSxDQUFDLElBQVksRUFBRSxnQkFBeUI7O1lBQy9ELE1BQU0sR0FBRyxHQUFHLElBQUEsbUJBQU0sRUFBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixNQUFNLE9BQU8sR0FBRyxnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXJGLGVBQUssQ0FBQyxJQUFJLENBQUMsK0JBQStCLElBQUksQ0FBQyxnQkFBZ0IsY0FBYyxFQUFFO2dCQUM3RSxPQUFPO2dCQUNQLElBQUksRUFBRSxJQUFJO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2dCQUNsQix3QkFBd0IsRUFBRSxJQUFJO2FBQy9CLENBQUM7aUJBQ0MsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFBLGNBQU0sRUFBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxlQUFlLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEYsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFPLGFBQWEsQ0FBQyxPQUFlLEVBQUUsS0FBVzs7WUFDckQsSUFBSSxXQUFXLEdBQVEsUUFBUSxDQUFDO1lBRWhDLElBQUk7Z0JBQ0YsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTthQUM3QztZQUFDLE9BQU8sS0FBSyxFQUFFLEdBQUc7WUFFbkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUNULElBQUEsbUJBQU0sRUFBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUU7aUJBQzlCLE9BQU87ZUFDVCxXQUFXO0tBQ3JCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDNUIsQ0FBQztLQUFBOztBQTVCTSwrQkFBZ0IsR0FBRyxnREFBZ0QsQ0FBQztBQUNwRSxnQ0FBaUIsR0FBVyxDQUFDLFNBQVMsQ0FBQztBQUZuQyx3Q0FBYyJ9