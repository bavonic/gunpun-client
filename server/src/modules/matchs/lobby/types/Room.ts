export enum RoomType {
  LOBBY = 'lobby',
  PUBLIC = 'lobbyroom',
}

export interface IRoomData {
  name: string
  description: string
  password: string | null
  autoDispose: boolean
}
