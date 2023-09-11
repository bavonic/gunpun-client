import { MapSchema, Schema, type } from "@colyseus/schema";
import { Dispatcher } from '@colyseus/command';
import { Client, Room } from "colyseus";
import { Player, RoomState } from "./lobby/schema/RoomState";
import { LobbyEvent, MessageRoom } from "./matchs.types";
import PlayerUpdateCommand from "./lobby/commands/PlayerUpdateCommand";
import PlayerUpdateNameCommand from "./lobby/commands/PlayerUpdateNameCommand";
import ChatMessageUpdateCommand from "./lobby/commands/ChatMessageUpdateCommand";
import { mapConfigs } from "./matchs.router";


export class MatchLobby extends Room<RoomState>  {

  async onCreate() {
    this.setState(new RoomState())
    // // when receiving updatePlayer message, call the PlayerUpdateCommand
    // this.onMessage(
    //   MessageRoom.UPDATE_PLAYER,
    //   (client, message: { x: number; y: number; anim: string }) => {
    //     this.dispatcher.dispatch(new PlayerUpdateCommand(), {
    //       client,
    //       x: message.x,
    //       y: message.y,
    //       anim: message.anim,
    //     })
    //   }
    // )

    // // when receiving updatePlayerName message, call the PlayerUpdateNameCommand
    // this.onMessage(MessageRoom.UPDATE_PLAYER_NAME, (client, message: { name: string }) => {
    //   this.dispatcher.dispatch(new PlayerUpdateNameCommand(), {
    //     client,
    //     name: message.name,
    //   })
    // })

    // this.onMessage(MessageRoom.READY_TO_CONNECT, (client) => {
    //   const player = this.state.players.get(client.sessionId)
    //   if (player) player.readyToConnect = true
    // })

    // // when a player send a chat message, update the message array and broadcast to all connected clients except the sender
    // this.onMessage(MessageRoom.ADD_CHAT_MESSAGE, (client, message: { content: string }) => {
    //   // update the message array (so that players join later can also see the message)
    //   this.dispatcher.dispatch(new ChatMessageUpdateCommand(), {
    //     client,
    //     content: message.content,
    //   })

    //   // broadcast to all currently connected clients except the sender (to render in-game dialog on top of the character)
    //   this.broadcast(
    //     MessageRoom.ADD_CHAT_MESSAGE,
    //     { clientId: client.sessionId, content: message.content },
    //     { except: client }
    //   )
    // })
  }

  async onAuth(client: Client, options: { password: string | null }) {
    return true
  }

  onJoin(client: Client, options: any) {
    // this.state.players.set(client.sessionId, new Player())
    console.log(`Client ${client.id} join lobby`)
    this.messageJoinLobby(client);
  }

  onLeave(client: Client, consented: boolean) {
    // if (this.state.players.has(client.sessionId)) {
    //   this.state.players.delete(client.sessionId)
    // }
    console.log(`Client ${client.id} leave lobby`)
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...')
  }

  messageJoinLobby(client: Client) {
    client.send(LobbyEvent.MAP_GAME, { data: mapConfigs })
    this.onMessage(LobbyEvent.CREATE_ROOM, () => {
      this.broadcast(LobbyEvent.CREATE_ROOM);
    })
  }
}