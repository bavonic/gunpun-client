import { Client } from "colyseus";
import { SkillModule } from "../skills/skills.module";
import { MatchRoom } from "../matchs.room";
import { MapBackgroundMode, MapConfig, MapMode } from "../matchs.types";
import { PlatformSchema } from "../schemas/platform.schema";
import { PlayerSchema } from "../schemas/player.schema";

export class DemoPlayer extends MatchRoom {
  static config: MapConfig = {
    id: "DemoPlayer",
    name: "Single Punions",
    assetUrl: '/demo/maps/1',
    width: 3400,
    height: 1500,
    backgroundMode: MapBackgroundMode.LIGHT,
    numberOfPlayers: 1,
    mode: MapMode.DEMO_PVE,
    totalTime: 60 * 60,
    totalTurnTime: 60 * 15,
  }

  player: PlayerSchema;

  onCreate(_?: any) {
    this.mapConfig = DemoPlayer.config;
    this.ignoreAuth = true;
    return super.onCreate();
  }

  async onAuth(client: Client, params: any) {
    const user = await super.onAuth(client, params);

    if (user.isHost) {
      user.isReady = true;
    }

    return user;
  }

  async initialize() {
    // Player
    const host = this.getHost();
    const playerSkills = await SkillModule.getPlayerSkills("1");
    this.player = new PlayerSchema({
      id: "1",
      name: "Demo",
      x: 300,
      y: 1000,
      size: 3.5,
      totalHp: 2000,
      speed: 3,
      teamId: 'A',
      controller: host!.userId,
      skillIds: playerSkills.map(v => v.id),
    });

    this.state.players.set(this.player.id, this.player);

    // Platforms
    const width = DemoPlayer.config.width;
    const height = 350;

    this.state.platforms.add(new PlatformSchema({
      id: 'platform',
      x: DemoPlayer.config.width / 2,
      y: this.mapConfig.height - (height / 2),
      w: width,
      h: height,
    }));

    // Required IMPORTANT!
    await super.initialize();
  }

  async startPlayerTurn(player: PlayerSchema) {
    // if ([this.monster.id].includes(player.id)) {
    //   let playerEffecteds: PlayerEffected[] = []

    //   const isCollide = NumberUtils.randomInt(0, 100) <= 70;
    //   if (isCollide) playerEffecteds.push({
    //     id: this.player.id,
    //     damage: NumberUtils.randomInt(300, 400),
    //   })

    //   return this.performNpcTurn(player, {
    //     playerEffecteds,
    //     skillId: NpcSkillId.NORMAL,
    //   });
    // }

    return super.startPlayerTurn(player);
  }
}