import Phaser from 'phaser'
import { PlayerEvent, PlayerSchema } from "./player.types";
import { loadAsset } from 'game-play-v2/game-play/game-play.assets';
import { AssetAtlas } from 'game-play-v2/game-play/game-play.types';
import { PlayerAnims } from './player.anims';
import { Weapon } from './weapons';
import { PlayerHealthBar } from './ui/heathBar';
import { PlayerRuler } from './ui/ruler';
import { PlayerSkillId } from 'game-play-v2/game-play/skills/skills.types';
import { GameEvent } from 'game-play-v2/game-play/game-play.types';
import { playerSkills } from 'game-play-v2/game-play/skills/skills.data';
import { MatchPlayerSkill } from 'game-play-v2/game-play/skills/skills.types';
import { MatchScene } from 'game-play-v2/scenes/main-monitor/game/match-game/match.scene';
import { game_v2 } from 'screens/game-v2';
import { SceneController } from 'game-play-v2/scenes/sub-monitor/SceneController';

export const bodyRawSize = { w: 1400, h: 1400 };
export const bodySize = { w: 200, h: 400 };

export interface PlayerParams {
  schema: PlayerSchema;
  asset: AssetAtlas;
}

export class Player {
  avatar?: string;
  scene?: MatchScene | Phaser.Scene;
  schema: PlayerSchema;
  object: Phaser.Physics.Arcade.Sprite;
  asset: AssetAtlas;
  anims: PlayerAnims;
  weapon: Weapon;
  events: Phaser.Events.EventEmitter;
  heathBar: PlayerHealthBar;
  ruler: PlayerRuler;
  isAbleToControl = false;
  hp: number = 0;
  isClientMoving = false;
  isFlip = false;
  skills: MatchPlayerSkill[];
  //
  halfWidth: number;
  halfHeight: number;
  status: number;
  ob: any;
  bullet: any

  //

  soundShot: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound;
  soundEnemy: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound;
  soundCollider: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound;
  soundMove: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound;

  constructor(params: PlayerParams) {
    this.schema = params.schema;
    this.asset = params.asset;
    this.weapon = new Weapon({ variant: params.schema.weaponVariant });
    this.events = new Phaser.Events.EventEmitter();
  }

  preload(scene: MatchScene | Phaser.Scene) {
    this.scene = scene;
    // Load body
    loadAsset(scene, { ...this.asset, type: 'atlas' });
    // Load weapon
    this.weapon.preload(scene);

    scene.load.image(PlayerSkillId.P_RECOVER_200HP, '/images/player-skills/p_recover_200hp.png')
    scene.load.image(PlayerSkillId.P_PLUS_30_DAMAGE, '/images/player-skills/p_plus_50_damage.png')
    scene.load.image(PlayerSkillId.P_PLUS_50_DAMAGE, '/images/player-skills/p_plus_100_damage.png')
    scene.load.image(PlayerSkillId.PLUS_TWO_BULLETS, '/images/player-skills/three_bullets_delay_time.png')
    scene.load.image(PlayerSkillId.THREE_BULLETS, '/images/player-skills/three_bullets.png')
    scene.load.image(PlayerSkillId.PLUS_ONE_BULLETS, '/images/player-skills/two_bullets_delay_time.png')
    // scene.load.image(PlayerSkillId.TWO_BULLETS, '/images/player-skills/two_bullets.png')
  }

  initialize() {
    if (!this.scene) throw Error("Player not preload yet!");
    //
    this.setSound();
    // Initialize Body
    this.object = this.scene.physics.add.sprite(
      this.schema.x,
      this.schema.y,
      this.asset.key,
    );

    const scale = this.schema.size / 10;

    this.object.setBodySize(bodySize.w, bodySize.h);
    this.object.setDepth(1);
    this.object.setScale(scale);
    // this.object.body.setCollideWorldBounds(true, 0, 0, true);
    this.hp = this.schema.remainHp;
    this.object.body.x = this.schema.x;
    this.object.body.y = this.schema.y;

    // Initialize weapon
    this.weapon.initialize(this);

    // Initialize anims
    this.anims = new PlayerAnims(this);

    // Initialize UIs
    this.ruler = new PlayerRuler(this);
    this.heathBar = new PlayerHealthBar(this);

    // Capture change position
    let prev_x = this.object.x;
    let prev_y = this.object.y;

    this.scene.events.addListener(Phaser.Scenes.Events.POST_UPDATE, () => {
      if (prev_x !== this.object.x || prev_y !== this.object.y) {
        prev_x = this.object.x;
        prev_y = this.object.y;

        const data = {
          x: this.object.x,
          y: this.object.y,
          isFlip: this.isFlip
        }

        this.events.emit(PlayerEvent.CHANGE_POSITION, data);

        if (
          this.scene instanceof MatchScene
          && this.isAbleToControl
          && this.schema.isInTurn
        ) {
          this.scene.room.send(GameEvent.USER_PLAYER_MOVE, data);
        }
      }
    })

    if (this.scene instanceof MatchScene) {
      this.isAbleToControl = this.scene.userInformation._id === this.schema.controller;

      // ======================= Sync form server =======================
      this.schema.onChange = (changes: any[]) => {
        changes.map(({ field, value }) => {
          // if (field === 'skillActivated' && this.isAbleToControl) {
          //   this.events.emit(PlayerEvent.UPDATE_ACTIVATED_SKILL, value);
          // }

          if (field === 'isMoving' && !this.isAbleToControl) {
            if (value) {
              this.anims.move();
              this.events.emit(PlayerEvent.MOVING);
            }
            else {
              this.anims.idle();
            }
            this.events.emit(PlayerEvent.STOP_MOVE);
          }

          if (field === 'remainHp') {
            this.hp = value;
            this.events.emit(PlayerEvent.UPDATE_HP, { hp: value });
          }

          if (field === 'x' && !this.isAbleToControl) {
            this.object.x = value;
          }

          if (field === 'y' && !this.isAbleToControl) {
            this.object.y = value;
          }

          if (field === 'rulerAngle') {
            this.ruler.update(value);
          }

          if (field === 'isFlip') {
            if (this.isClientMoving) {
              // console.log("Change flip", value);
            } else {
              this.flip(!!value);
            }
          }

          if (field === 'rulerAngle') {
            this.ruler.update(value);
          }

          if (field === 'isInTurn') {
            if (!value) this.stopTurn();
            else this.startTurn();
          }
        });
      }

      let skills: MatchPlayerSkill[] = [];

      this.schema.skills.forEach((skillSchema: any) => {
        const playerSkill = playerSkills.find(v => v.id === skillSchema.id);
        if (!playerSkill) return;
        skills.push(skillSchema.toJSON());

        skillSchema.onChange = (changes: any[]) => {
          changes.map(({ field, value }) => {
            this.skills = this.skills.map((s) => {
              if (s.id === skillSchema.id) return { ...s, [field]: value };
              return s;
            })
            this.events.emit(PlayerEvent.UPDATE_SKILLS, this.skills);
          })
        };
      })

      this.skills = skills;
    }

    // Initialize flip
    this.flip(this.schema.isFlip);
  }

  setSound() {
    this.soundShot = this.scene.sound.add('shot');
    this.soundEnemy = this.scene.sound.add('enemy-shot');
    this.soundCollider = this.scene.sound.add('collide');
    this.soundMove = this.scene.sound.add('move');
  }

  startTurn() {
    this.events.emit(PlayerEvent.IN_TURN);
  }

  stopTurn() {
    this.ruler.hide();
    this.stopMove();
    this.events.emit(PlayerEvent.STOP_TURN)
  }

  increaseRulerAngle() {
    if (this.scene instanceof MatchScene) {
      this.scene.room.send(GameEvent.USER_PLAYER_INCREASE_RULER_ANGLE)
    }
  }

  decreaseRulerAngle() {
    if (this.scene instanceof MatchScene) {
      this.scene.room.send(GameEvent.USER_PLAYER_DECREASE_RULER_ANGLE)
    }
  }

  shot(strengthPercent: number, dataPixel: []) {
    if (this.scene instanceof MatchScene) {
      this.scene.room.send(GameEvent.USER_PLAYER_SHOT, { strengthPercent, dataPixel });
      this.soundShot.play();
      this.scene.sceneControl.input.keyboard.enabled = false;
      const control = game_v2.scene.getScene('SceneController') as SceneController;
      control.disableTouch();
    }
  }

  moveLeft() {
    if (this.scene instanceof MatchScene) {
      if (this.isClientMoving) return;
      this.isClientMoving = true;
      this.flip(true);
      this.anims.move();
      this.object.setVelocityX(-100);
      this.soundMove.play();
      this.soundMove.setLoop(true);
    }
  }

  moveRight() {
    if (this.scene instanceof MatchScene) {
      if (this.isClientMoving) return;
      this.isClientMoving = true;
      this.flip(false);
      this.anims.move();
      this.object.setVelocityX(100);
      this.soundMove.play();
      this.soundMove.setLoop(true);
    }
  }

  stopMove() {
    if (this.scene instanceof MatchScene) {
      this.isClientMoving = false;
      this.anims.idle();
      this.object.setVelocityX(0);
      this.scene.room.send(GameEvent.USER_PLAYER_STOP_MOVE);
      this.soundMove.stop();
    }
  }

  flip(value: boolean) {
    this.isFlip = value;
    this.object?.setFlipX(value);
    this.weapon?.flip(value);
    this.ruler?.update();
  }

  useSkill(skillId: PlayerSkillId) {
    if (this.scene instanceof MatchScene) {
      this.scene.room.send(GameEvent.USER_PLAYER_USE_SKILL, skillId);
    }
  }

  async showSkill(params: { skillId: PlayerSkillId }) {
    const image = this.scene.add.image(this.object.x, this.object.y, 'skills', `${params.skillId.toLowerCase()}.png`).setScale(0.5)
    const tween = this.scene.tweens.add({
      targets: image,
      y: { start: this.object.y - 100, to: this.object.y - 200 },
      yoyo: false,
      // repeat: -1,
      duration: 600,
      onComplete: (() => {
        tween.destroy();
        image.destroy();
      })
    })
  }

  async minusHp(damage: number) {
    if (!damage) return;

    this.events.emit(PlayerEvent.COLLIDER);
    const hp = this.hp - damage;
    this.hp = hp > 0 ? hp : 0;
    this.heathBar.update();

    if (this.scene instanceof MatchScene) {
      this.events.emit(PlayerEvent.MINUS_HP, { damage });

      // if (this.scene.isDebugSkill) {
      //   console.log(`Damged effect ${this.schema.id}: ${damage}`);
      // }
    }

    // Tween text damage
    const textDamage = this.scene.add.text(this.object.x - 50, this.object.y,
      `-${damage.toLocaleString('en-US')}`,
      {
        fontFamily: 'Oswald',
        fontSize: 40,
        color: '#ffff00',
      }
    ).setScale(0).setDepth(1)

    textDamage.setStroke('#FF4040', 4);

    this.scene.add.tween({
      targets: [textDamage],
      ease: 'Quintic.easeInOut',
      duration: 1000,
      scale: 2,
      y: { from: this.object.y, to: this.object.y - 200 },
      yoyo: false,
      onComplete: (i) => {
        textDamage.destroy();
        i.destroy();
      }
    });

    await this.anims.hurt();

    if (this.hp <= 0) {
      this.heathBar.hide();
      this.weapon.anims.defeat();
      await this.anims.defeat();
      this.object?.disableBody(true, false);
      this.weapon.object?.disableBody(true, false);
    }
  }
}