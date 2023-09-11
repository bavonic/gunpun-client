import { WebSocketTransport } from '@colyseus/ws-transport';
import { LobbyRoom, Server } from 'colyseus';
import { createServer } from 'http';
import { PORT, getEnv, initialEnvs } from './AppConfigs';
import { app } from './app';
import { ChatLobbyRoom } from "./modules/chat-lobby/chatLobby.room";
import { connectDatabase } from './modules/database';
import { DemoPve1 } from "./modules/matchs/maps/DemoPve1.map";
import { logger } from './utils';
import { DemoPVP1Vs1 } from "./modules/matchs/maps/DemoPVP1Vs1.map";
import { DemoPve2 } from "./modules/matchs/maps/DemoPve2.map";
import { DemoPve3 } from "./modules/matchs/maps/DemoPve3.map";
import { DemoPVP2Vs2 } from "./modules/matchs/maps/DemoPVP2Vs2.map";
import { SkillChecking } from "./modules/matchs/maps/SkillChecking.map";
import { DemoPlayer } from "./modules/matchs/maps/DemoPlayer.map";
import { RedisModule } from "./modules/redis";
import { DemoPVP3Vs3 } from "./modules/matchs/maps/DemoPVP3Vs3.map";
import { RoomType } from "./modules/matchs/lobby/types/Room";
import { MatchLobby } from "./modules/matchs/matchs.lobby";
import { DemoPve4 } from './modules/matchs/maps/DemoPve4.map';

async function main() {
  // ======================= Log Environments =======================
  console.log(`\n------- Environments ------`);
  Object.keys(initialEnvs).map((key) => console.log(`- ${key}: ${getEnv(key as any)}`))
  console.log('\n');

  await connectDatabase();

  await RedisModule.initialize()
    .then(() => logger('INFO', 'Redis connected.'))
    .catch((error) => {
      logger('ERROR', 'RedisModule.initialize', error)
      process.exit(1);
    })

  const apiServer = createServer(app);

  const server = new Server({ transport: new WebSocketTransport({ server: apiServer }) });

  // Lobby Room
  // server.define('lobby', LobbyRoom);

  server.define(ChatLobbyRoom.roomName, ChatLobbyRoom)
    .enableRealtimeListing()

  // Game Room
  server.define(DemoPve1.config.id, DemoPve1);
  server.define(DemoPve2.config.id, DemoPve2);
  // server.define(DemoPve3.config.id, DemoPve3);
  server.define(DemoPve4.config.id, DemoPve4);
  server.define(DemoPVP1Vs1.config.id, DemoPVP1Vs1);
  server.define(DemoPVP2Vs2.config.id, DemoPVP2Vs2);
  server.define(DemoPVP3Vs3.config.id, DemoPVP3Vs3);
  server.define(SkillChecking.config.id, SkillChecking);
  server.define(DemoPlayer.config.id, DemoPlayer);
  //
  // server.define(RoomType.LOBBY, LobbyRoom)
  server.define(RoomType.LOBBY, MatchLobby)
  //
  server.listen(PORT);

  logger('INFO', `Server started port: ${PORT}`);
}

main();