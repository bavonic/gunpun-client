import { NumberUtils } from "../../../utils/number.utils";
import { WeaponVariant } from "../../weapons/types";
import { MatchRoom } from "../matchs.room";
import { MapBackgroundMode, MapConfig, MapMode } from "../matchs.types";
import { PlatformSchema } from "../schemas/platform.schema";
import { PlayerSchema, PlayerVariant } from "../schemas/player.schema";
import { NpcSkillId, PlayerEffected } from "../skills/skills.types";

export class DemoPve1 extends MatchRoom {
  static config: MapConfig = {
    id: "DemoPve1",
    name: "Single Punions",
    assetUrl: '/demo/maps/1',
    width: 2645,
    height: 1080,
    backgroundMode: MapBackgroundMode.LIGHT,
    numberOfPlayers: 1,
    mode: MapMode.DEMO_PVE,
    totalTime: 60 * 15,
    totalTurnTime: 15,
  }

  playerId: string;
  playerName: string;

  player: PlayerSchema;
  monster: PlayerSchema;

  onCreate(_?: any) {
    this.mapConfig = DemoPve1.config;
    return super.onCreate();
  }

  override async initialize() {
    // Player
    const host = this.getHost();

    this.player = new PlayerSchema({
      id: host.userId,
      name: host.name,
      variant: PlayerVariant.PERSONAL_I,
      weaponVariant: WeaponVariant.PERSONAL_I,
      x: 300,
      y: 500,
      size: 4,
      totalHp: 2000,
      speed: 3,
      teamId: 'A',
      controller: host!.userId,
      skillIds: host.skillIds,
      data: JSON.stringify({ avatar: host.avatar }),
    });

    this.state.players.set(this.player.id, this.player);

    // Monster
    this.monster = new PlayerSchema({
      id: 'mon',
      name: "NPC",
      size: 3.5,
      isFlip: true,
      x: 2300,
      y: 500,
      speed: 2,
      totalHp: 1000,
      teamId: 'B',
      controller: 'npc',
      skillIds: [],
    });

    this.state.players.set(this.monster.id, this.monster);
 
    // Platforms
    const width = DemoPve1.config.width;
    const height = 350;

    this.state.platforms.add(new PlatformSchema({
      id: 'platform',
      x: DemoPve1.config.width / 2,
      y: this.mapConfig.height - (height / 2),
      w: width,
      h: height,
    }));

    // Required IMPORTANT!
    await super.initialize();
  }

  async startPlayerTurn(player: PlayerSchema) {
    if ([this.monster.id].includes(player.id)) {
      let playerEffecteds: PlayerEffected[] = []

      const isCollide = NumberUtils.randomInt(0, 100) <= 70;
      // const isCollide = false;

      if (isCollide) playerEffecteds.push({
        id: this.player.id,
        damage: NumberUtils.randomInt(300, 400),
      })

      return this.performNpcTurn(player, {
        playerEffecteds,
        skillId: NpcSkillId.NORMAL,
      });
    }

    return super.startPlayerTurn(player);
  }
}