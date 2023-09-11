import { Command } from '@colyseus/command'
import { Client, Room } from 'colyseus'
import { IRoomState } from '../types/LobbyState'

type Payload = {
  client: Client
  name: string
}

export default class PlayerUpdateNameCommand extends Command<Room<IRoomState>, Payload> {
  execute(data: Payload) {
    const { client, name } = data

    const player = this.room.state.players.get(client.sessionId)

    if (!player) return
    player.name = name
  }
}
