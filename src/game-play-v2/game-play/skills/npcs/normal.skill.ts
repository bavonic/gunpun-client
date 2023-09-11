import { MapScene } from "game-types";
import { PerformNpcSkillParams } from "../skills.types";
import { calcVelocity } from "game-play-v2/game-play/utils/calcVelocity.util";
import { WeaponVariant } from "game-play-v2/game-play/players/weapons/types";
import { wait } from "game-play-v2/game-play/game-play.utils";

export const performNpcNormalSkill = async (params: PerformNpcSkillParams, scene: MapScene) => {
  await new Promise(async (resolve) => {
    const npc = scene.players.find(v => v.schema.id === params.from.id);
    const player = scene.players.find(v => v.schema.teamId !== npc.schema.teamId);
    const effected = params.playerEffecteds.find(v => v.id === player.schema.id);
    const velocity = calcVelocity(npc.object, player.object, scene, !!effected) as any;
    await npc.weapon.anims.shot();
    scene.cameraZoom(1);

    let overlaps: Phaser.Physics.Arcade.Collider[] = [];

    const onFinished = () => {
      // overlaps?.map(v => v.destroy());
      resolve(true);
      npc.anims.idle();
    }

    const bullet = scene.add.follower(velocity, npc.object.x, npc.object.y, 'DefaultPlayer', 'bullet.png');
    await wait(1000);
    player.soundEnemy.play();
    bullet.startFollow({
      duration: 2000,
      rotateToPath: false,
      // rotationOffset: 90,
      onComplete: () => {
        bullet.destroy();
        onFinished();
      }
    });
    scene.tweens.add({
      targets: bullet,
      angle: '+=360',
      duration: 300,
      repeat: -1,
      onComplete: (i) => i.destroy()
    })
    scene.physics.add.existing(bullet);
    scene.cameraFollow(bullet);

    // followBullet()

    scene.players.map((player) => {
      if (player.schema.id === params.from.id) return;
      overlaps.push(scene.physics.add.overlap(player.object, bullet, async () => {
        // scene.events.removeListener(Phaser.Scenes.Events.UPDATE, updateBullet);
        bullet.destroy();
        player.soundCollider.play();
        const damage = params.playerEffecteds.find(v => v.id === player.schema.id)?.damage || 0;
        scene?.cameraShake();
        await player.minusHp(damage);
        scene.sceneControl.updateBar();
        onFinished();
      }));
    })

    const onWorldBounds = (body: Phaser.Physics.Arcade.Body) => {
      // if (body.gameObject !== bullet) return;
      // scene.physics.world.removeListener('worldbounds', onWorldBounds);
      // scene.events.removeListener(Phaser.Scenes.Events.UPDATE, updateBullet);
      // bullet.destroy();
      onFinished();
    };

    scene.physics.world.on('worldbounds', onWorldBounds);

    // const events = scene.events.on('update', async () => {
    //   if (bullet.body) {
    //     update();
    //   }
    //   else return
    // });
    ///
    // let halfHeight = 50
    // let halfWidth = 50
    // //update
    // const update = async () => {
    //   const statusBelow = await checkBelow();
    //   if (statusBelow.isOnGround) {
    //     scene.canvas.context.beginPath()
    //     scene.canvas.context.arc(bullet.x, bullet.y, 60, 0, Math.PI * 2, false)
    //     scene.canvas.context.fill()
    //     await scene.canvas.update();
    //     bullet.destroy();
    //     onFinished();
    //   }
    // }

    // const followBullet = () => {

    // }

    // const getBottomLeft = (output?) => {
    //   if (!output) { output = new Phaser.Math.Vector2(); }
    //   output.x = Math.floor(bullet?.x - halfWidth);
    //   output.y = Math.floor(bullet?.y + halfHeight);
    //   return output;
    // }

    // const getBottomRight = (output?) => {
    //   if (!output) { output = new Phaser.Math.Vector2(); }
    //   output.x = Math.floor(bullet?.x + halfWidth);
    //   output.y = Math.floor(bullet?.y + halfHeight);
    //   return output;
    // }

    // const isAir = (coord) => {
    //   const color = scene.canvas?.getPixel(coord.x, coord.y) as any
    //   if (color) return (color.a === 0);
    // }

    // const checkBelow = () => {
    //   const bottomleft = getBottomLeft();
    //   const bottomright = getBottomRight();
    //   let leftbelow = 50;
    //   let lefthit = false;
    //   let rightbelow = 50;
    //   let righthit = false;
    //   for (let i = 0; i < 5; i++) {
    //     if (!isAir(bottomleft) && !lefthit) {
    //       leftbelow = i;
    //       lefthit = true;
    //     }
    //     if (!isAir(bottomright) && !righthit) {
    //       rightbelow = i;
    //       righthit = true;
    //     }
    //   }
    //   return { isOnGround: leftbelow === 0 && rightbelow === 0 }
    // }
  })

  await scene.cameraResetZoom();


}