import { Column, Entity, ObjectId, ObjectIdColumn, Unique } from "typeorm"
import { UserEntity } from "../users/types"

@Entity('user-stats')
@Unique('user-stats-unique', ['userId'])

export class UserStatEntity {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  userId: string

  @Column()
  user: UserEntity

  @Column()
  matchs: number

  @Column()
  winRate: number

  @Column()
  pvePoints: number

  @Column()
  pveMatchs: number

  @Column()
  pveWinRate: number

  @Column()
  pvpPoints: number

  @Column()
  pvpMatchs: number

  @Column()
  pvpWinRate: number

  @Column()
  pvp1vs1Points: number

  @Column()
  pvp1vs1Matchs: number

  @Column()
  pvp1vs1WinRate: number
}