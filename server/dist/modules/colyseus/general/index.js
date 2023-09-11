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
exports.GeneralLobbyRoom = void 0;
const colyseus_1 = require("colyseus");
const module_1 = require("../../users/module");
const types_1 = require("../types");
class GeneralLobbyRoom extends colyseus_1.Room {
    static getUser(sectionId) {
        return this.users[sectionId];
    }
    static setUser(sectionId, data) {
        this.users[sectionId] = data;
    }
    onCreate() {
        this.onMessage(types_1.GameEventType.USER_SEND_AUTH, (client, accessToken) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield module_1.UserModule.auth(accessToken);
                GeneralLobbyRoom.setUser(client.sessionId, user);
                this.broadcast(types_1.GameEventType.USER_SIGNED, client);
            }
            catch (error) {
                console.error(error);
            }
        }));
    }
    onJoin(client) {
        this.broadcast(types_1.GameEventType.USER_CONNECTED, client.sessionId);
    }
    onLeave(client) {
        this.broadcast(types_1.GameEventType.USER_DISCONNECTED, client.sessionId);
        delete GeneralLobbyRoom.users[client.sessionId];
    }
    onDispose() {
        console.log(`Dispose ${this.roomName}`);
    }
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(client, options, request) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //   const user = await UserModule.auth(options.accessToken);
            //   client.userData = user
            //   return true;
            // } catch (error) {
            //   return false;
            // }
            return true;
        });
    }
}
GeneralLobbyRoom.roomName = 'GeneralLobbyRoom';
GeneralLobbyRoom.users = {};
exports.GeneralLobbyRoom = GeneralLobbyRoom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9jb2x5c2V1cy9nZW5lcmFsL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF3QztBQUV4QywrQ0FBZ0Q7QUFDaEQsb0NBQXlDO0FBRXpDLE1BQWEsZ0JBQWlCLFNBQVEsZUFBSTtJQUl4QyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQWlCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFpQixFQUFFLElBQVM7UUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFhLENBQUMsY0FBYyxFQUFFLENBQU8sTUFBYyxFQUFFLFdBQVcsRUFBRSxFQUFFO1lBQ2pGLElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxtQkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEQsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMscUJBQWEsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDbkQ7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBYztRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFhLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQWM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBYSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRSxPQUFPLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELG9GQUFvRjtJQUM5RSxNQUFNLENBQUMsTUFBYyxFQUFFLE9BQVksRUFBRSxPQUE2Qjs7WUFDdEUsUUFBUTtZQUNSLDZEQUE2RDtZQUM3RCwyQkFBMkI7WUFDM0IsaUJBQWlCO1lBQ2pCLG9CQUFvQjtZQUNwQixrQkFBa0I7WUFDbEIsSUFBSTtZQUNKLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBOztBQTlDTSx5QkFBUSxHQUFHLGtCQUFrQixDQUFDO0FBQzlCLHNCQUFLLEdBQWlDLEVBQUUsQ0FBQTtBQUZwQyw0Q0FBZ0IifQ==