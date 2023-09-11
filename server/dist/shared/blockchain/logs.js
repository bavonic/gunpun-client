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
exports.BlockchainLogs = void 0;
const axios_1 = __importDefault(require("axios"));
class BlockchainLogs {
    static sendTelegram(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat_id = -670118754;
            axios_1.default.post(`https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id,
                    text: body,
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                })
            })
                .catch((error) => console.error(`Error: BlockchainLogs.sendTelegram`, error));
        });
    }
}
BlockchainLogs.telegramBotToken = '1882839496:AAFchz5EfaAAcqtDBh7VsNfF-6sL63Axz6g';
exports.BlockchainLogs = BlockchainLogs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvYmxvY2tjaGFpbi9sb2dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUF5QjtBQUV6QixNQUFhLGNBQWM7SUFHekIsTUFBTSxDQUFPLFlBQVksQ0FBQyxJQUFZOztZQUNwQyxNQUFNLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUUzQixlQUFLLENBQUMsSUFBSSxDQUFDLCtCQUErQixJQUFJLENBQUMsZ0JBQWdCLGNBQWMsRUFBRTtnQkFDN0UsT0FBTyxFQUFFO29CQUNQLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ25DO2dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNuQixPQUFPO29CQUNQLElBQUksRUFBRSxJQUFJO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQix3QkFBd0IsRUFBRSxJQUFJO2lCQUMvQixDQUFDO2FBQ0gsQ0FBQztpQkFDQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsRixDQUFDO0tBQUE7O0FBakJNLCtCQUFnQixHQUFHLGdEQUFnRCxDQUFDO0FBRGhFLHdDQUFjIn0=