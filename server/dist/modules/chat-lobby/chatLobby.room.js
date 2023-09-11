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
exports.ChatLobbyRoom = void 0;
const colyseus_1 = require("colyseus");
const utils_1 = require("../../utils");
const types_1 = require("../colyseus/types");
const module_1 = require("../users/module");
const chatLobby_entity_1 = require("./chatLobby.entity");
const chatLobby_module_1 = require("./chatLobby.module");
class ChatLobbyRoom extends colyseus_1.Room {
    onCreate() {
        this.onMessage(types_1.GameEventType.CHAT_SEND_MESSAGE, (client, content) => {
            if (!client.userData)
                return;
            const user = client.userData;
            const msg = new chatLobby_entity_1.ChatLobbyMessageEntity();
            msg.createdAt = utils_1.DateTimeUtils.timeToSeconds(new Date());
            msg.content = content;
            // msg.userWallet = user.wallet;
            chatLobby_module_1.ChatLobbyModule.save(msg)
                .catch(() => false);
            this.broadcast(types_1.GameEventType.CHAT_RECEIVE_MESSAGE, Object.assign(Object.assign({}, msg), { _id: Date.now().toString() }));
        });
        this.onMessage(types_1.GameEventType.USER_SEND_AUTH, (client, accessToken) => __awaiter(this, void 0, void 0, function* () {
            const user = yield module_1.UserModule.auth(accessToken);
            client.userData = user;
            client.send(types_1.GameEventType.USER_SIGNED);
        }));
    }
    onJoin(client) {
        // console.log('onJoin', client.sessionId);
    }
    onLeave(client) {
        // console.log('onLeave', client.sessionId);
    }
    onDispose() {
        // console.log("Dispose ChatRoom");
    }
    onAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
}
ChatLobbyRoom.roomName = 'ChatLobbyRoom';
exports.ChatLobbyRoom = ChatLobbyRoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdExvYmJ5LnJvb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9jaGF0LWxvYmJ5L2NoYXRMb2JieS5yb29tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF3QztBQUN4Qyx1Q0FBNEM7QUFDNUMsNkNBQWtEO0FBQ2xELDRDQUE2QztBQUM3Qyx5REFBNEQ7QUFDNUQseURBQXFEO0FBR3JELE1BQWEsYUFBYyxTQUFRLGVBQUk7SUFHckMsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQWEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE1BQWMsRUFBRSxPQUFPLEVBQUUsRUFBRTtZQUMxRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7Z0JBQUUsT0FBTztZQUM3QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBc0IsQ0FBQztZQUUzQyxNQUFNLEdBQUcsR0FBRyxJQUFJLHlDQUFzQixFQUFFLENBQUM7WUFDekMsR0FBRyxDQUFDLFNBQVMsR0FBRyxxQkFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7WUFDeEQsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdEIsZ0NBQWdDO1lBRWhDLGtDQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDdEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXRCLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQWEsQ0FBQyxvQkFBb0Isa0NBQzVDLEdBQUcsS0FDTixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUMxQixDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFhLENBQUMsY0FBYyxFQUFFLENBQU8sTUFBYyxFQUFFLFdBQVcsRUFBRSxFQUFFO1lBQ2pGLE1BQU0sSUFBSSxHQUFHLE1BQU0sbUJBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQWM7UUFDbkIsMkNBQTJDO0lBQzdDLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBYztRQUNwQiw0Q0FBNEM7SUFDOUMsQ0FBQztJQUVELFNBQVM7UUFDUCxtQ0FBbUM7SUFDckMsQ0FBQztJQUVLLE1BQU07O1lBQ1YsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7O0FBMUNNLHNCQUFRLEdBQUcsZUFBZSxDQUFDO0FBRHZCLHNDQUFhIn0=