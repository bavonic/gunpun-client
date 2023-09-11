import { ArraySchema, MapSchema, Schema, type } from '@colyseus/schema'
import { IPlayer, IRoomState } from '../types/LobbyState'


export class Player extends Schema implements IPlayer {
  @type('string') name = ''
  @type('number') x = 800
  @type('number') y = 600
  @type('string') anim = 'adam_idle_down'
  @type('boolean') readyToConnect = false
}

export class ChatMessage extends Schema implements IChatMessage {
  @type('string') author = ''
  @type('number') createdAt = new Date().getTime()
  @type('string') content = ''
}

export interface IChatMessage extends Schema {
  author: string
  createdAt: number
  content: string
}
export class RoomState extends Schema implements IRoomState {
  @type({ map: Player })
  players = new MapSchema<Player>()
  @type([ChatMessage])
  chatMessages = new ArraySchema<ChatMessage>()
}