import { Client, Room } from "colyseus";
import { DateTimeUtils } from "../../utils";
import { GameEventType } from "../colyseus/types";
import { UserModule } from "../users/module";
import { ChatLobbyMessageEntity } from "./chatLobby.entity";
import { ChatLobbyModule } from "./chatLobby.module";
import { UserEntity } from "../users/types";

export class ChatLobbyRoom extends Room {
  static roomName = 'ChatLobbyRoom';

  onCreate() {
    this.onMessage(GameEventType.CHAT_SEND_MESSAGE, (client: Client, content) => {
      if (!client.userData) return;
      const user = client.userData as UserEntity;

      const msg = new ChatLobbyMessageEntity();
      msg.createdAt = DateTimeUtils.timeToSeconds(new Date());
      msg.content = content;
      // msg.userWallet = user.wallet;

      ChatLobbyModule.save(msg)
        .catch(() => false);

      this.broadcast(GameEventType.CHAT_RECEIVE_MESSAGE, {
        ...msg,
        _id: Date.now().toString()
      })
    });

    this.onMessage(GameEventType.USER_SEND_AUTH, async (client: Client, accessToken) => {
      const user = await UserModule.auth(accessToken);
      client.userData = user;
      client.send(GameEventType.USER_SIGNED);
    });
  }

  onJoin(client: Client) {
    // console.log('onJoin', client.sessionId);
  }

  onLeave(client: Client) {
    // console.log('onLeave', client.sessionId);
  }

  onDispose() {
    // console.log("Dispose ChatRoom");
  }

  async onAuth() {
    return true;
  }
}