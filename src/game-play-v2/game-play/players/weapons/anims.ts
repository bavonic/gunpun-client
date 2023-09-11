import { createAnim, wait } from "game-play-v2/game-play/game-play.utils";
import { WeaponVariant } from "./types";
import { Weapon } from ".";

export class WeaponAnims {
  // Infinite
  idle: () => void = () => { };

  // Forward
  hurt: () => Promise<void> = async () => { };
  win: () => Promise<void> = async () => { };
  defeat: () => Promise<void> = async () => { };
  shot: () => Promise<void> = async () => { };

  constructor(weapon?: Weapon) {
    if (weapon && weapon.variant != WeaponVariant.DEFAULT) {
      createAnim({ sprite: weapon.object, range: { start: 0, end: 9 }, key: weapon.variant, animKey: 'idle' });
      this.idle = () => {
        weapon.object.anims.play({ key: 'idle', repeat: -1 });
      }
      this.idle();

      createAnim({ sprite: weapon.object, range: { start: 0, end: 9 }, key: weapon.variant, animKey: 'hurt' });
      this.hurt = async () => {
        weapon.object.anims.play({ key: 'hurt', repeat: 0 });
        await wait(1000);
        this.idle();
      }

      createAnim({ sprite: weapon.object, range: { start: 0, end: 9 }, key: weapon.variant, animKey: 'win' });
      this.win = async () => {
        weapon.object.anims.play({ key: 'win', repeat: 3 });
        await wait(2000);
        this.idle();
      }

      createAnim({ sprite: weapon.object, range: { start: 0, end: 9 }, key: weapon.variant, animKey: 'defeat' });
      this.defeat = async () => {
        weapon.object.anims.play({ key: 'defeat', repeat: 0 });
        await wait(2000);
      }

      createAnim({ sprite: weapon.object, range: { start: 0, end: 9 }, key: weapon.variant, animKey: 'shot' });
      this.shot = async () => {
        weapon.object.anims.play({ key: 'shot', repeat: 0 });
        await wait(1000);
        this.idle();
      }
    }
  }
}