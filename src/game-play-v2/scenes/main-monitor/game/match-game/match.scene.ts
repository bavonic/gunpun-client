// import { SoundContext } from "sounds";
import { Room } from "colyseus.js";
import { ButtonTweens } from "game-play-v2/components/ButtonTweens";
import { ControlsGame } from "game-play-v2/game-play/controller/index";
import { Emitter } from "game-play-v2/game-play/emitter";
import { loadAsset, loadMatchAssets } from "game-play-v2/game-play/game-play.assets";
import { GameEvent } from "game-play-v2/game-play/game-play.types";
import { wait } from "game-play-v2/game-play/game-play.utils";
import { createPlayer } from "game-play-v2/game-play/players";
import { Player } from "game-play-v2/game-play/players/player.core";
import { PlayerSchema } from "game-play-v2/game-play/players/player.types";
import { performNpcNormalSkill } from "game-play-v2/game-play/skills/npcs/normal.skill";
import { NpcSkillId, PerformNpcSkillParams, PerformPlayerSkillParams, PlayerSkillId } from "game-play-v2/game-play/skills/skills.types";
import { getSkillInstance } from "game-play-v2/game-play/skills/skills.utils";
import { UiAlert } from "game-play-v2/game-play/utils/alert.util";
import { sizeScene } from "game-play-v2/game-type";
import { getInfoGame } from "game-play-v2/scene-info";
import { SceneController } from "game-play-v2/scenes/sub-monitor/SceneController";
import { CanvasTexture, DynamicGroup, MatchResult, StaticGroup, TeamId } from "game-types";
import { getUserInformation } from "modules/account/context";
import { ENV, IS_DEV } from "modules/configs/context";
import { MapConfig } from "modules/maps";
import { UserEntity } from "modules/user";
import { Scene } from "phaser";
import { game_v2 } from "screens/game-v2";
import { AppEnv } from "types";

export class MatchScene extends Scene {
  platforms: StaticGroup;
  canvas: CanvasTexture;
  canvasImg: any
  room: Room;
  playerGroup: DynamicGroup;
  backgroundSprite: Phaser.GameObjects.Image;
  mapConfig: MapConfig;
  players: Player[] = [];
  emitter: Emitter;
  // sounds: SoundContext;
  userInformation: UserEntity;
  isDebugSkill = ENV !== AppEnv.PRODUCTION;
  control!: ControlsGame;
  sceneControl: SceneController
  //
  soundTurn: Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound;

  getMapAssetKey(key: string) {
    return this.mapConfig.id + `_${key}`;
  }

  getMyTeam(): TeamId | undefined {
    const player = this.players.find(v => v.isAbleToControl);
    if (player) return player.schema.teamId;
  }

  async create(params: { room: Room, ignoreAuth?: boolean }) {
    this.userInformation = getUserInformation();
    if (!this.userInformation && !params.ignoreAuth) throw Error("Unauthorized");

    if (!params || !params.room) {
      throw Error("Invalid create match scene params");
    }

    this.room = params.room;
    // this.sounds = params.sounds;
    this.emitter = new Emitter();

    // new getInfoGame(this)
  }

  async initializeMap() {
    return new Promise(async (resolve) => {
      this.physics.world.setBounds(0, 0, 2465, 1878);
      this.physics.world.setBoundsCollision(true, true, false, true);
      this.platforms = this.physics.add.staticGroup();
      // Background
      const backgroundKey = this.getMapAssetKey('background');
      const bg = this.add.image(0, 0, backgroundKey).setOrigin(0);
      await this.buildMap();
      // Camera
      this.cameras.main.setBounds(0, 0, bg.width, bg.height);
      this.physics.world.setBounds(0, 0, bg.width, bg.height);
      let playersSitdown = [];
      // Players
      this.players.map(async (player: any) => {
        await player.initialize();
        this.physics.add.collider(player.object, this.platforms, async () => {
          if (playersSitdown.includes(player.schema.id)) return;
          playersSitdown.push(player.schema.id);
          if (playersSitdown.length === this.players.length) resolve(true);
        });
      });

      if (this.mapConfig.id === 'SkillChecking') return
      this.scene.add('SceneController', SceneController);
      this.scene.run('SceneController');
      this.sceneControl = game_v2.scene.getScene('SceneController');
      this.soundMatchRoom();
      // const controls = new ControlsGame(this)
      // controls.create();
    })
  }

  soundMatchRoom() {
    this.soundTurn = this.sound.add('my-turn');
    const sound = this.sound.add('in-game-background')
    sound.setLoop(true);
    sound.play();
  }

  async buildMap() {
    this.platforms.clear();
    if (this.textures) {
      this.textures.remove('canvastexture');
    }
    this.canvas = this.textures.createCanvas('canvastexture', 2645, 1080);
    const img = this.textures.get(this.getMapAssetKey('platform')).getSourceImage() as any;
    this.canvas.draw(0, 0, img);
    const canvasImg = this.add.image(0, 0, 'canvastexture').setOrigin(0);
    this.canvasImg = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    this.canvasImg.add(canvasImg);
    this.canvas.context.globalCompositeOperation = 'destination-out';

    const pixel = new Phaser.Display.Color() as any;
    const dataPixel = [];

    for (let y = 0; y < 1080; y++) {
      for (let x = 0; x < 2645; x++) {
        this.canvas?.getPixel(x, y, pixel);
        if (pixel.a > 0) {
          if (x % 12 == 0 && y % 12 == 0) {
            dataPixel.push({ x, y });
          }
        }
      }
    }
    dataPixel.map((i) => {
      this.platforms.add(this.add.rectangle(i.x, i.y, 1, 1))
    })

  }

  async playerTurn(playerId: string) {

    const player = this.players.find(v => v.schema.id === playerId);
    if (!player) return;
    await this.cameraPan(player.object);
    this.cameraZoom(1.2);
    this.cameraFollow(player.object);
    // if (player.isAbleToControl) this.sounds.play('my_turn');
    this.soundTurn.play();
    await UiAlert.playerTurn(this, player.isAbleToControl);

    player.ruler.show();
    if (player.isAbleToControl) {
      this.sceneControl.input.keyboard.enabled = true;
      this.emitter.emit('ENABLE_CONTROLLER', player);
    }
  }

  async preloadAssets(params: {
    mapConfig: MapConfig,
  }) {

    await wait(200);
    this.mapConfig = params.mapConfig;
    // Preload general assets
    loadMatchAssets(this);

    // await Promise.all([
    //   ...playerSkills.map(v => v.avatar),
    //   `${this.mapConfig.assetUrl}/background.png`,
    //   `${this.mapConfig.assetUrl}/platform.png`,
    // ].map((v) => loadImage(v)))

    // Preload map
    loadAsset(this, {
      key: this.getMapAssetKey('background'),
      type: 'image',
      url: `${this.mapConfig.assetUrl}/background.png`
    });

    loadAsset(this, {
      key: this.getMapAssetKey('platform'),
      type: 'image',
      url: `${this.mapConfig.assetUrl}/platform.png`
    });

    // Preload players
    this.room.state.players.forEach((schema: PlayerSchema) => {
      const player = createPlayer(schema);
      this.players.push(player);
      player.preload(this);
    });

    this.load.addListener(Phaser.Loader.Events.COMPLETE, async () => {
      await this.initializeMap();
      const positions = [];

      this.players.map((v) => {
        positions.push({
          id: v.schema.id,
          x: v.object.x,
          y: v.object.y,
        });
      });

      this.room.send(GameEvent.USER_PRELOAD_ASSETS_COMPLETED, { positions });
    });

    this.load.addListener(Phaser.Loader.Events.FILE_LOAD_ERROR, (e) => {
      console.error(e);
    });

    // this.load.addListener(Phaser.Loader.Events.PROGRESS, params.onLoad);
    this.load.start();
  }

  // ======================= Perform =======================
  async performIntro() {
    if (IS_DEV) return;

    let teamA: Player[] = this.players.filter(v => v.schema.teamId === "A");
    let teamB: Player[] = this.players.filter(v => v.schema.teamId === "B");

    let players: Player[] = [...this.players];
    players.reverse();

    // Team B
    this.cameraZoom(1.3);
    await this.cameraPan(teamB[0].object);

    await Promise.all(teamB.map(async (player) => {
      await player.anims.win();
      player.anims.idle();
    }))

    // Team A
    this.cameraZoom(1.3);
    await this.cameraPan(teamA[0].object);

    await Promise.all(teamA.map(async (player) => {
      await player.anims.win();
      player.anims.idle();
    }))

    await wait(1000);
  }

  async performPlayerSkill(params: PerformPlayerSkillParams) {
    this.cameras.main.stopFollow();

    const skillInstance = getSkillInstance(params.skillId);
    if (!skillInstance) throw Error("SKILL_DOES_NOT_SUPPORTED");

    const playerShot = this.players.find(v => v.schema.id === params.from.id);
    if (playerShot) playerShot.ruler.hide();

    if (this.isDebugSkill) {
      console.log("\n\n>>>> START DEBUG SKILL")
      console.log("params ", JSON.stringify(params));
      console.log("Turn time ", this.room.state.turnTime);
      console.log("Player skill", params.skillId);
      console.log(`Total Damage Logic: ${params.playerEffecteds.reduce((a, b) => a + b.damage, 0)}`);
      console.log(`Hp Before: ${this.players.find(v => v.schema.id === params.playerEffecteds[0]?.id)?.hp || 0}`);
    }

    await skillInstance.clientProcess(params, this);

    if (this.isDebugSkill) {
      console.log(`Hp After: ${this.players.find(v => v.schema.id === params.playerEffecteds[0]?.id)?.hp || 0}`);
      console.log(">>>> END DEBUG SKILL\n\n");
    }

    await this.cameraReset();
  }

  async performNpcSkill(params: PerformNpcSkillParams) {
    const player = this.players.find(v => v.schema.id === params.from.id);
    if (!player) return;

    this.cameraZoom(1.3);
    await this.cameraPan(player.object);

    if (params.skillId === NpcSkillId.NORMAL) return performNpcNormalSkill(params, this);

    await this.cameraReset();
  }

  async performMatchResult(result: MatchResult) {
    const userResult = result.users.find(v => v.id === this.userInformation._id);
    if (userResult) {
      const scene = game_v2.scene.getScene('SceneController') as SceneController;
      if (userResult.isWin) {
        const sound = this.sound.add('you_Win')
        sound.play();
        scene.add.rectangle(sizeScene.width / 2, sizeScene.height / 2, sizeScene.width * 2, sizeScene.height, 0x000000, 0.5);
        const img = scene.add.image(sizeScene.width / 2, 450, 'end-game', 'win.png').setScrollFactor(0);
        const btn = new ButtonTweens({
          scene: scene, x: sizeScene.width / 2, y: 850, texture: 'end-game', frame: 'btn_oke.png', fn: async () => {
            await scene.scene.stop('SceneController');
            this.scene.start('SceneLobby');
          }
        }).setScrollFactor(0);
        return
      }
      const sound = this.sound.add('end_defeat')
      sound.play();
      scene.add.rectangle(sizeScene.width / 2, sizeScene.height / 2, sizeScene.width * 2, sizeScene.height, 0x000000, 0.5);
      const img = scene.add.image(sizeScene.width / 2, 450, 'end-game', 'lose.png').setScrollFactor(0);
      const btn = new ButtonTweens({
        scene: scene, x: sizeScene.width / 2, y: 850, texture: 'end-game', frame: 'btn_try_again.png', fn: async () => {
          await scene.scene.stop('SceneController');
          this.scene.start('SceneLobby');
        }
      }).setScrollFactor(0);
    }
  }

  async playerUseSkill(params: { playerId: string, skillId: PlayerSkillId }) {
    const player = this.players.find(v => v.schema.id === params.playerId);
    if (!player || !Object.values(PlayerSkillId).includes(params.skillId)) return;
    player.showSkill(params);
  }

  // ======================= Cameras =======================
  async cameraPanWithPercentOfMap(percent: number) {
    let currentCamx = 0;
    const x = this.mapConfig.width * percent;
    if (currentCamx === x) return;
    currentCamx = x;
    this.cameras.main.stopFollow();
    this.cameras.main.pan(x, this.players[0].object.y, 10);
  }

  async cameraPan(position: { x: number, y: number }, duration = 300) {
    await this.cameraStopFollow();
    this.cameras.main.pan(position.x, position.y, duration);
    await wait(duration);
  }

  async cameraZoom(value: number, duration = 300) {
    await this.cameraStopFollow();
    this.cameras.main.zoomTo(value, duration);
    await wait(duration);
  }

  async cameraResetZoom(duration = 300) {
    await this.cameraStopFollow();
    this.cameras.main.zoomTo(1, duration);
    await wait(duration);
  }

  async cameraReset(duration = 300) {
    await this.cameraStopFollow();
    await this.cameraZoom(1, duration);
  }

  async cameraFollow(sprite: any) {
    this.cameras.main.startFollow(sprite);
  }

  async cameraStopFollow() {
    this.cameras.main.stopFollow();
  }

  async cameraShake(level = 0.01, duration = 500) {
    this.cameras.main.shake(duration, level);
    await wait(duration);
  }
}