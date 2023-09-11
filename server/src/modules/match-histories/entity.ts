import { Column, Entity, ObjectId, ObjectIdColumn, Unique } from "typeorm"
import { MapConfig } from "../matchs/matchs.types"
import { MatchResult } from "../../GameTypes"

@Entity('match-histories')
@Unique('match-histories-unique', ['roomId'])

export class MatchHistoryEntity {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  roomId: string

  @Column()
  map: MapConfig

  @Column()
  time: number

  @Column()
  userIds: string[]

  @Column()
  result: MatchResult
}