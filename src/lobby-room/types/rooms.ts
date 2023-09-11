import { ArraySchema, MapSchema, Schema } from '@colyseus/schema'
import Phaser from 'phaser'

export const phaserEvents = new Phaser.Events.EventEmitter()

export interface IPlayer extends Schema {
  name: string
  x: number
  y: number
  anim: string
  readyToConnect: boolean
  videoConnected: boolean
}
export interface IChatMessage extends Schema {
  author: string
  createdAt: number
  content: string
}
export interface IOfficeState extends Schema {
  players: MapSchema<IPlayer>
  chatMessages: ArraySchema<IChatMessage>
}

export enum RoomType {
  LOBBY = 'lobby',
}

export interface IRoomData {
  name: string
  description: string
  password: string | null
  autoDispose: boolean
}

export enum Message {
  UPDATE_PLAYER,
  UPDATE_PLAYER_NAME,
  READY_TO_CONNECT,
  DISCONNECT_STREAM,
  CONNECT_TO_COMPUTER,
  DISCONNECT_FROM_COMPUTER,
  STOP_SCREEN_SHARE,
  CONNECT_TO_WHITEBOARD,
  DISCONNECT_FROM_WHITEBOARD,
  VIDEO_CONNECTED,
  ADD_CHAT_MESSAGE,
  SEND_ROOM_DATA,
}

export enum Event {
  PLAYER_JOINED = 'player-joined',
  PLAYER_UPDATED = 'player-updated',
  PLAYER_LEFT = 'player-left',
  PLAYER_DISCONNECTED = 'player-disconnected',
  MY_PLAYER_READY = 'my-player-ready',
  MY_PLAYER_NAME_CHANGE = 'my-player-name-change',
  MY_PLAYER_TEXTURE_CHANGE = 'my-player-texture-change',
  MY_PLAYER_VIDEO_CONNECTED = 'my-player-video-connected',
  ITEM_USER_ADDED = 'item-user-added',
  ITEM_USER_REMOVED = 'item-user-removed',
  UPDATE_DIALOG_BUBBLE = 'update-dialog-bubble',
}

export type NavKeys = Phaser.Types.Input.Keyboard.CursorKeys

