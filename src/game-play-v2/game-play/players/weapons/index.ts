import { loadAsset } from "game-play-v2/game-play/game-play.assets";
import { Player, bodySize } from "game-play-v2/game-play/players/player.core";
import { MatchScene } from "game-play-v2/scenes/main-monitor/game/match-game/match.scene";
import { PlayerEvent } from "../player.types";
import { WeaponAnims } from "./anims";
import { WeaponVariant, weaponAssetUrls } from "./types";
import { PerformPlayerSkillParams } from "game-play-v2/game-play/skills/skills.types";
import { PlayerStat } from "game-types";

export interface WeaponParams {
  variant: WeaponVariant
}

export class Weapon {
  variant: WeaponVariant;
  scene?: MatchScene | Phaser.Scene;
  object?: Phaser.Types.Physics.Arcade.SpriteWithStaticBody;
  anims: WeaponAnims;
  isDefault?: boolean;
  createBullet: (from: PlayerStat) => Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(params: WeaponParams) {
    this.variant = params.variant;
    this.isDefault = [WeaponVariant.DEFAULT].includes(params.variant);
  }

  preload(scene: MatchScene | Phaser.Scene) {
    this.scene = scene;
    // Load body
    if (this.isDefault) return;
    loadAsset(scene, {
      key: this.variant,
      url: weaponAssetUrls[this.variant],
      type: 'atlas'
    });
  }

  initialize(player: Player) {
    if (!this.scene) throw Error("Weapon not preload yet!");

    this.createBullet = (from) => {
      const key = this.isDefault ? player.asset.key : this.variant;
      return player.scene.physics.add.sprite(from.x, from.y, key, 'bullet.png');
    }

    if (this.isDefault) {
      this.anims = new WeaponAnims();
    } else {
      // Initialize
      this.object = this.scene.physics.add.staticSprite(
        player.object.x,
        player.object.y,
        this.variant,
      );

      const scale = player.schema.size / 10;
      this.object.setBodySize(bodySize.w, bodySize.h);
      this.object.setDepth(1);
      this.object.setScale(scale);
      this.anims = new WeaponAnims(this);

      // Follow body
      player.events.on(PlayerEvent.CHANGE_POSITION, ({ x, y }) => {
        this.object.x = x;
        this.object.y = y;
      });
    }
  }

  flip(value: boolean) {
    this.object?.setFlipX(value);
  }

  destroy() {
  }
}