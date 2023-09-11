import { Client } from "colyseus";
import { WeaponVariant } from "../../weapons/types";
import { MatchRoom } from "../matchs.room";
import { MapBackgroundMode, MapConfig, MapMode } from "../matchs.types";
import { PlatformSchema } from "../schemas/platform.schema";
import { PlayerSchema, PlayerVariant } from "../schemas/player.schema";
import { UserSchema } from "../schemas/user.schema";

export class DemoPVP1Vs1 extends MatchRoom {
  static config: MapConfig = {
    id: "DemoPVP1Vs1",
    name: "Single",
    assetUrl: '/demo/maps/1',
    width: 2645,
    height: 1080,
    backgroundMode: MapBackgroundMode.LIGHT,
    numberOfPlayers: 2,
    mode: MapMode.DEMO_PVP,
    totalTime: 60 * 15,
    totalTurnTime: 15,
  }

  onCreate(_?: any) {
    this.mapConfig = DemoPVP1Vs1.config;
    return super.onCreate();
  }

  override onAuth(client: Client, params?: any): Promise<UserSchema> {
    this.setMetadata({ ...this.metadata, roomName: params?.roomName || 'Room', mode: MapMode.DEMO_PVP });
    return super.onAuth(client, params);
  }

  override async initialize() {
    let users: UserSchema[] = [];
    this.state.users.forEach((user) => users.push(user));

    const positionsX = [300, 2000];

    users.map((user, index) => {
      this.state.players.set(user.userId, new PlayerSchema({
        id: user.userId,
        name: user.name,
        variant: PlayerVariant.PERSONAL_I,
        weaponVariant: WeaponVariant.PERSONAL_I,
        x: positionsX[index],
        y: 800,
        size: 4,
        totalHp: 2000,
        speed: 4,
        teamId: user.teamId,
        controller: user.userId,
        skillIds: user.skillIds,
        isFlip: user.teamId === 'B',
        data: JSON.stringify({ avatar: user.avatar }),
      }))
    })

    // Platforms
    // const width = DemoPVP1Vs1.config.width;
    // const height = 350;

    // this.state.platforms.add(new PlatformSchema({
    //   id: 'platform',
    //   x: DemoPVP1Vs1.config.width / 2,
    //   y: this.mapConfig.height - (height / 2),
    //   w: width,
    //   h: height,
    // }));

    // Required IMPORTANT!
    await super.initialize();
  }
}