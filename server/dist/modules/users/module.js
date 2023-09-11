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
exports.UserModule = void 0;
const axios_1 = __importDefault(require("axios"));
const AppConfigs_1 = require("../../AppConfigs");
class UserModule {
    static auth(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${(0, AppConfigs_1.getEnv)('MAIN_SERVER_PORTAL_URL')}/users/auth`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            return response.data;
        });
    }
    static getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${(0, AppConfigs_1.getEnv)('MAIN_SERVER_PORTAL_URL')}/users/id/${userId}`);
            return response.data;
        });
    }
}
exports.UserModule = UserModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvdXNlcnMvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQixpREFBMEM7QUFHMUMsTUFBYSxVQUFVO0lBQ3JCLE1BQU0sQ0FBTyxJQUFJLENBQUMsV0FBbUI7O1lBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUEsbUJBQU0sRUFBQyx3QkFBd0IsQ0FBQyxhQUFhLEVBQUU7Z0JBQ2pGLE9BQU8sRUFBRTtvQkFDUCxlQUFlLEVBQUUsVUFBVSxXQUFXLEVBQUU7aUJBQ3pDO2FBQ0YsQ0FBQyxDQUFBO1lBRUYsT0FBTyxRQUFRLENBQUMsSUFBa0IsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQU8sT0FBTyxDQUFDLE1BQWM7O1lBQ2pDLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUEsbUJBQU0sRUFBQyx3QkFBd0IsQ0FBQyxhQUFhLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDMUYsT0FBTyxRQUFRLENBQUMsSUFBa0IsQ0FBQztRQUNyQyxDQUFDO0tBQUE7Q0FDRjtBQWZELGdDQWVDIn0=