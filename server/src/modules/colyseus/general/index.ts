import { Client, Room } from "colyseus";
import http from 'http';
import { UserModule } from "../../users/module";
import { GameEventType } from "../types";

export class GeneralLobbyRoom extends Room {
  static roomName = 'GeneralLobbyRoom';
  static users: { [sectionId: string]: any } = {}

  static getUser(sectionId: string) {
    return this.users[sectionId];
  }

  static setUser(sectionId: string, data: any) {
    this.users[sectionId] = data;
  }

  onCreate() {
    this.onMessage(GameEventType.USER_SEND_AUTH, async (client: Client, accessToken) => {
      try {
        const user = await UserModule.auth(accessToken);
        GeneralLobbyRoom.setUser(client.sessionId, user);
        this.broadcast(GameEventType.USER_SIGNED, client);
      } catch (error) {
        console.error(error);
      }
    });
  }

  onJoin(client: Client) {
    this.broadcast(GameEventType.USER_CONNECTED, client.sessionId);
  }

  onLeave(client: Client) {
    this.broadcast(GameEventType.USER_DISCONNECTED, client.sessionId);
    delete GeneralLobbyRoom.users[client.sessionId];
  }

  onDispose() {
    console.log(`Dispose ${this.roomName}`);
  }

  // Authorize client based on provided options before WebSocket handshake is complete
  async onAuth(client: Client, options: any, request: http.IncomingMessage) {
    // try {
    //   const user = await UserModule.auth(options.accessToken);
    //   client.userData = user
    //   return true;
    // } catch (error) {
    //   return false;
    // }
    return true;
  }
}