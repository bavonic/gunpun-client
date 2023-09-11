import { createAnim, wait } from "game-play-v2/game-play/game-play.utils";
import { Player } from "./player.core";

export class PlayerAnims {
  isFreeze = false;

  // Infinite
  idle: () => void;
  move: () => void;

  // Forward
  hurt: () => Promise<void>;
  win: () => Promise<void>;
  defeat: () => Promise<void>;
  shot: () => Promise<void>;

  constructor(player: Player) {
    createAnim({ sprite: player.object, range: { start: 0, end: 9 }, key: player.asset.key, animKey: 'idle' });
    this.idle = () => {
      if (this.isFreeze) return;
      player.object.anims.play({ key: 'idle', repeat: -1 });
      player.weapon.anims.idle();
    }
    this.idle();

    createAnim({ sprite: player.object, range: { start: 0, end: 9 }, key: player.asset.key, animKey: 'move' });
    this.move = () => {
      if (this.isFreeze) return;
      player.object.anims.play({ key: 'move', repeat: -1 });
      player.weapon.anims.idle();
    }

    createAnim({ sprite: player.object, range: { start: 0, end: 9 }, key: player.asset.key, animKey: 'hurt' });
    this.hurt = async () => {
      if (this.isFreeze) return;
      player.object.anims.play({ key: 'hurt', repeat: 0 });
      player.weapon.anims.hurt();
      await wait(1000);
      this.idle();
    }

    createAnim({ sprite: player.object, range: { start: 0, end: 9 }, key: player.asset.key, animKey: 'win' });
    this.win = async () => {
      if (this.isFreeze) return;
      player.object.anims.play({ key: 'win', repeat: 3 });
      player.weapon.anims.win();
      await wait(2000);
      this.idle();
    }

    createAnim({ sprite: player.object, range: { start: 0, end: 9 }, key: player.asset.key, animKey: 'defeat' });
    this.defeat = async () => {
      if (this.isFreeze) return;
      this.isFreeze = true;
      player.object.anims.play({ key: 'defeat', repeat: 0 });
      player.weapon.anims.defeat();
      await wait(2000);
    }

    createAnim({ sprite: player.object, range: { start: 0, end: 9 }, key: player.asset.key, animKey: 'shot' });
    this.shot = async () => {
      if (this.isFreeze) return;
      player.object.anims.play({ key: 'shot', repeat: 0 });
      player.weapon.anims.shot();
      await wait(1000);
      this.idle();
    }
  }
}