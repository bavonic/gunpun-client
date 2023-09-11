import { Room } from "colyseus.js";
import { GameEvent } from "game-play-v2/game-play/game-play.types";
import { PlayerSchema } from "game-play-v2/game-play/players/player.types";
import { PlayerSkillId } from "game-play-v2/game-play/skills/skills.types";
import { sizeScene } from "game-play-v2/game-type";
import CircleMaskImage from 'phaser3-rex-plugins/plugins/circlemaskimage.js';

interface SkillAssets {
  id: PlayerSkillId,
  asset: string
}

const skills: SkillAssets[] = [
  {
    id: PlayerSkillId.P_PLUS_30_DAMAGE,
    asset: `/images/player-skills/${PlayerSkillId.P_PLUS_30_DAMAGE.toLowerCase()}.png`,
  },
  {
    id: PlayerSkillId.P_PLUS_50_DAMAGE,
    asset: `/images/player-skills/${PlayerSkillId.P_PLUS_50_DAMAGE.toLowerCase()}.png`,
  },
  {
    id: PlayerSkillId.P_RECOVER_200HP,
    asset: `/images/player-skills/${PlayerSkillId.P_RECOVER_200HP.toLowerCase()}.png`,
  },
  {
    id: PlayerSkillId.PLUS_ONE_BULLETS,
    asset: `/images/player-skills/${PlayerSkillId.PLUS_ONE_BULLETS.toLowerCase()}.png`,
  },
  {
    id: PlayerSkillId.PLUS_TWO_BULLETS,
    asset: `/images/player-skills/${PlayerSkillId.PLUS_TWO_BULLETS.toLowerCase()}.png`,
  },
  {
    id: PlayerSkillId.THREE_BULLETS,
    asset: `/images/player-skills/${PlayerSkillId.THREE_BULLETS.toLowerCase()}.png`,
  }
]
export class SceneSelectSkill extends Phaser.Scene {
  constructor() {
    super('SceneSelectSkill');
  }

  async create({ room, player }) {
    this.add.image(0, 0, 'assets', 'background.png').setOrigin(0);

    await this.createCard(room)
    this.loadSkill(room);
    this.setTimeCountDown(room)
  }

  createCard(room) {
    const card = this.add.container(sizeScene.width / 2, sizeScene.height / 2 - 150);

    const cardImg = this.add.image(0, 0, 'select-skill', 'card.png');
    const body = this.add.image(-20, -10, 'select-skill', 'body.png');
    // const avatar = this.add.image(-20, -10, 'avatar');


    var image = new CircleMaskImage(this, 0, 0, 'avatar');
    this.add.existing(image);
    image.setScale(.6)
    const head = this.add.container(-30, -60);
    // const graphics = this.add.graphics();
    // graphics.fillStyle(0xffffff, 0.1);
    // graphics.fillCircle(0, 0, 256);
    // graphics.setScale(4 / 20);

    const r3 = this.add.circle(0, 0, 90);
    r3.setStrokeStyle(4, 0x1a65ac, 0.8);


    head.add([image, r3]);
    // head.mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
    // head.setScale(4 / 10)

    card.add([cardImg, head, body])
  }

  setTimeCountDown(room: Room) {
    const time = this.add.text(0, sizeScene.height / 2 + 420, '', { align: 'center', fontSize: 50, fontFamily: 'Oswald' })
    time.x = (sizeScene.width / 2) - (time.width / 2);

    room.state.listen("preparingTime", (value: number) => {
      if (value > 0) {
        time.setText(value.toString());
      }
    })
  }

  async loadSkill(room) {
    const random = require('lodash');
    const skillsChoose = random.sampleSize(skills, 3);
    await room.send(GameEvent.USER_SELECT_SKILLS, skillsChoose.map(v => v.id));

    let listSkills = [];
    skillsChoose.map((i) => {
      listSkills.push(this.add.image(0, 0, 'skills', `${i.id.toLowerCase()}.png`));
    });

    Phaser.Actions.GridAlign(listSkills, {
      width: 3,
      height: 2,
      cellWidth: 150,
      cellHeight: 200,
      x: sizeScene.width / 2 - 205.5,
      y: sizeScene.height / 2 + 250
    });
  }
}