import { NumberUtils } from "../../../utils/number.utils";
import { WeaponVariant } from "../../weapons/types";
import { MatchRoom } from "../matchs.room";
import { MapBackgroundMode, MapConfig, MapMode } from "../matchs.types";
import { PlatformSchema } from "../schemas/platform.schema";
import { PlayerSchema, PlayerVariant } from "../schemas/player.schema";
import { NpcSkillId, PlayerEffected } from "../skills/skills.types";
 
export class DemoPve3 extends MatchRoom {
  static config: MapConfig = {
    id: "DemoPve3",
    name: "Hard Core",
    assetUrl: '/demo/maps/3',
    width: 3400,
    height: 1500,
    backgroundMode: MapBackgroundMode.LIGHT,
    numberOfPlayers: 1,
    mode: MapMode.DEMO_PVE,
    totalTime: 60 * 15,
    totalTurnTime: 15,
  }

  player: PlayerSchema;
  monster: PlayerSchema;

  onCreate(_?: any) {
    this.mapConfig = DemoPve3.config;
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
      y: 1000,
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
      id: 'monster_raidboss',
      name: "RaidBoss",
      size: 10,
      isFlip: true,
      x: 2750,
      y: 800,
      speed: 2,
      totalHp: 2650,
      teamId: 'B',
      controller: 'npc', 
    });
    this.state.players.set(this.monster.id, this.monster);

    // Platforms
    const width = DemoPve3.config.width;
    const height = 350;

    this.state.platforms.add(new PlatformSchema({
      id: 'platform',
      x: DemoPve3.config.width / 2,
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
      const isCollide = true;
      const damage = NumberUtils.randomInt(420, 620);

      if (isCollide) playerEffecteds.push({
        id: this.player.id,
        damage,
      })

      return this.performNpcTurn(player, {
        playerEffecteds,
        skillId: NpcSkillId.NORMAL,
      });
    }

    return super.startPlayerTurn(player);
  }
}