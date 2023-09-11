import { getEnv } from "../../AppConfigs";
import { DataSource } from "typeorm"
import { logger } from "../../utils/logger.utis";
import { ChatLobbyMessageEntity } from "../chat-lobby/chatLobby.entity";
import { MatchHistoryEntity } from "../match-histories/entity";
import { UserStatEntity } from "../user-stats/entity";

export * from './database.types'
export * from './database.utils'

export const databaseSource = new DataSource({
  type: "mongodb",
  url: getEnv('DATABASE_URL'),
  entities: [
    ChatLobbyMessageEntity,
    MatchHistoryEntity,
    UserStatEntity,
  ],
  synchronize: true,
  cache: false,
  useUnifiedTopology: true,
})

export const connectDatabase = async () => {
  await databaseSource.initialize()
    .then(() => logger("INFO", "Database connected."))
    .catch((error) => {
      logger('ERROR', `Database connect failed.`, error)
      process.exit(1);
    })
}