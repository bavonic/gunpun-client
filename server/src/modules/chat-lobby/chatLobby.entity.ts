import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm"

@Entity('chat-lobby-message')
export class ChatLobbyMessageEntity {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  content: string

  @Column()
  userWallet: string

  @Column()
  createdAt: number
}