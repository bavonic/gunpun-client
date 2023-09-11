import { NumberUtils } from "../../../utils/number.utils";
import { WeaponVariant } from "../../weapons/types";
import { MatchRoom } from "../matchs.room";
import { MapBackgroundMode, MapConfig, MapMode } from "../matchs.types";
import { PlatformSchema } from "../schemas/platform.schema";
import { PlayerSchema, PlayerVariant } from "../schemas/player.schema";
import { NpcSkillId, PlayerEffected } from "../skills/skills.types";

export class DemoPve2 extends MatchRoom {
  static config: MapConfig = {
    id: "DemoPve2",
    name: "Multi Punions",
    assetUrl: '/demo/maps/2',
    width: 2645,
    height: 1080,
    backgroundMode: MapBackgroundMode.LIGHT,
    numberOfPlayers: 1,
    mode: MapMode.DEMO_PVE,
    totalTime: 60 * 15,
    totalTurnTime: 15,
  }

  player: PlayerSchema;
  monster_1: PlayerSchema;
  monster_2: PlayerSchema;
  monster_3: PlayerSchema;

  onCreate(_?: any) {
    this.mapConfig = DemoPve2.config;
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
      y: 800,
      size: 4,
      totalHp: 2000,
      speed: 10,
      teamId: 'A',
      controller: host!.userId,
      skillIds: host.skillIds,
      data: JSON.stringify({ avatar: host.avatar }),
    });

    this.state.players.set(this.player.id, this.player);

    // Monsters
    this.monster_1 = new PlayerSchema({
      id: 'monster_1',
      name: "NPC 1",
      size: 3.5,
      isFlip: true,
      x: 1800,
      y: 800,
      speed: 3,
      totalHp: 1000,
      teamId: 'B',
      controller: 'npc',
    });
    this.state.players.set(this.monster_1.id, this.monster_1);

    // Monster
    this.monster_2 = new PlayerSchema({
      id: 'monster_2',
      name: "NPC 2",
      size: 3.5,
      isFlip: true,
      x: 2200,
      y: 300,
      speed: 2,
      totalHp: 1000,
      teamId: 'B',
      controller: 'npc',
    });
    this.state.players.set(this.monster_2.id, this.monster_2);

    this.monster_3 = new PlayerSchema({
      id: 'monster_3',
      name: "NPC 3",
      size: 5,
      isFlip: true,
      x: 2600,
      y: 300,
      speed: 1,
      totalHp: 1000,
      teamId: 'B',
      controller: 'npc',
    });
    this.state.players.set(this.monster_3.id, this.monster_3);

    // Platforms
    const width = DemoPve2.config.width;
    const height = 350;

    this.state.platforms.add(new PlatformSchema({
      id: 'platform',
      x: DemoPve2.config.width / 2,
      y: this.mapConfig.height - (height / 2),
      w: width,
      h: height,
    }));

    // Required IMPORTANT!
    await super.initialize();
  }

  async startPlayerTurn(player: PlayerSchema) {
    if ([this.monster_1.id, this.monster_2.id, this.monster_3.id].includes(player.id)) {

      let playerEffecteds: PlayerEffected[] = []
      const isCollide = NumberUtils.randomInt(0, 100) <= 80;

      if (isCollide) playerEffecteds.push({
        id: this.player.id,
        damage: NumberUtils.randomInt(150, 300),
      })

      return this.performNpcTurn(player, {
        playerEffecteds,
        skillId: NpcSkillId.NORMAL,
      });
    }

    return super.startPlayerTurn(player);
  }
}