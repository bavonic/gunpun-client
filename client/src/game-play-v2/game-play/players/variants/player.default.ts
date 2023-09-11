import { MatchScene } from "game-play-v2/scenes/main-monitor/game/match-game/match.scene";
import { Player } from "../player.core";
import { PlayerSchema } from "../player.types";
import { loadAsset } from "game-play-v2/game-play/game-play.assets";

export class DefaultPlayer extends Player {
  head: Phaser.Types.Physics.Arcade.SpriteWithStaticBody;
  eventEmitters: Phaser.Events.EventEmitter[] = [];

  constructor(params: {
    schema: PlayerSchema;
  }) {
    super({
      ...params,
      asset: {
        key: "DefaultPlayer",
        url: '/images/players/default/assets'
      },
    });
    this.avatar = '/images/players/default/avatar.png';
  }

  override preload(scene: MatchScene | Phaser.Scene): void {
    super.preload(scene);
    loadAsset(scene, { key: this.schema.id, type: 'image', url: this.avatar });
  }

  override initialize(): void {
    super.initialize();
  }
}