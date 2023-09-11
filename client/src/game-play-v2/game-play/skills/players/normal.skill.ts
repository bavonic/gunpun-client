import { wait } from '@testing-library/user-event/dist/utils';
import { PlayerEffected, SkillInstance } from '../skills.types';
import { getArcadePhysics, originCenterToCorner } from '../skills.utils';

export const normalSkill: SkillInstance = {
  serverProcess: (input) => {
    const { params, deltaTime } = input;

    return new Promise((resolve) => {
      const physics = getArcadePhysics(params);

      const bulletStat = originCenterToCorner({ ...params.from, w: 50, h: 50 });
      const bullet = physics.add.body(bulletStat.x, bulletStat.y);
      bullet.setSize(bulletStat.w, bulletStat.h);
      bullet.setCircle(25);
      bullet.setCollideWorldBounds(true, 0, 0, true);
      physics.velocityFromAngle(params.angle, 996, bullet.velocity);

      params.targets.map((stat) => {
        const sizeRate = stat.size / 10;
        const targetStat = originCenterToCorner({ x: stat.x, y: stat.y, w: 200 * sizeRate, h: 400 * sizeRate });
        const target = physics.add.staticBody(targetStat.x, targetStat.y, targetStat.w, targetStat.h);
        (target as any)._type = 'target';
        (target as any)._id = stat.id;
      })

      params.dataPixel.map((i) => {
        physics.add.staticBody(i.x, i.y, 1 / 12, 1 / 12)
      })

      let playerEffecteds: PlayerEffected[] = [];

      physics.world.staticBodies.forEach((item) => {
        const type = (item as any)._type;
        const id = (item as any)._id;

        physics.add.overlap(bullet, item, () => {
          bullet.destroy();

          if (type === 'target') {
            const target = params.targets.find(v => v.id === id);
            if (target && !playerEffecteds.find(v => v.id === id)) {
              playerEffecteds.push({
                id,
                damage: input.getDamage({ targetId: id })
              });
            }
          }

          return () => { }
        })
      })

      const onResponse = () => {
        physics.destroy();
        resolve({ playerEffecteds });
      }

      if (input.onUpdate && requestAnimationFrame) {
        let tick = 0;
        const update = () => {
          if (tick >= (deltaTime * 60)) {
            return onResponse();
          }

          physics.world.update(tick * 1000, 1000 / 60)
          physics.world.postUpdate();
          input.onUpdate(physics);

          tick++;
          requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
      } else {
        physics.world.update(Date.now(), deltaTime * 1000);
        onResponse();
      }
    })
  },
  clientProcess: async (params, scene) => {
    const player = scene.players.find(v => v.schema.id === params.from.id);
    if (!player) return;

    return new Promise(async (resolve) => {
      scene.cameraZoom(1);

      const bullet = player.weapon.createBullet(params.from);
      bullet.setBodySize(50, 50);
      bullet.setCircle(25);
      bullet.body.setCollideWorldBounds(true, 0, 0, true);
      console.log(params.strength)
      scene.physics.velocityFromAngle(params.angle, 996, bullet.body.velocity);

      scene.cameraFollow(bullet);
      // scene.sounds.play('shot');
      player.weapon.anims.shot();

      const updateBullet = () => bullet.angle += 8;
      scene.events.addListener(Phaser.Scenes.Events.UPDATE, updateBullet);


      const onFinished = () => {
        player.anims.idle();
        resolve(true);
      }

      let overlaps: Phaser.Physics.Arcade.Collider[] = [];


      scene.platforms.children.entries.forEach((item: any) => {
        overlaps.push(scene.physics.add.overlap(item, bullet, async (_, bullet: any) => {
          scene.events.removeListener(Phaser.Scenes.Events.UPDATE, updateBullet);
          player.soundCollider.play();

          overlaps.map(v => v.destroy());

          scene.canvas.context.beginPath()
          scene.canvas.context.arc(item.x, item.y, 50, 0, Math.PI * 2, false)
          scene.canvas.context.fill()
          await scene.canvas.update();

          const circle = scene.add.circle(item.x, item.y, 50);

          const { x, y, radius } = circle;

          const bodiesInCircle = scene.physics.overlapCirc(x, y, radius, true, true);

          bodiesInCircle.map(body => {
            if (body.gameObject.type === 'Rectangle') {
              body.gameObject.destroy();
              bullet.destroy();
            }
            return
          })

          // scene.platforms.children.entries.forEach((items: any) => {
          //   if (item.x < items.x < (item.x + 100) && item.y < items.y < (item.y + 100)) {
          //     items.destroy()
          //     bullet.destroy();
          //     item.destroy()
          //   }
          // })

          // await Promise.all(params.playerEffecteds.map(async (v) => {
          //   const player = scene.players.find(p => p.schema.id === v.id);
          //   if (player) await player.minusHp(v.damage);
          // }))

          onFinished();
        }));
      })


      scene.players.map((player) => {
        if (player.schema.teamId === params.from.teamId) return;
        overlaps.push(scene.physics.add.overlap(player.object, bullet, async () => {
          scene.events.removeListener(Phaser.Scenes.Events.UPDATE, updateBullet);
          bullet.destroy();
          player.soundCollider?.play();
          overlaps.map(v => v.destroy());
          scene.cameraShake();

          // scene.canvas.context.beginPath()
          // scene.canvas.context.arc(player.object.x, player.object.y, 100, 0, Math.PI * 2, false)
          // scene.canvas.context.fill()
          // await scene.canvas.update();

          // const circle = scene.add.circle(player.object.x, player.object.y, 100);

          // const { x, y, radius } = circle;

          // const bodiesInCircle = scene.physics.overlapCirc(x, y, radius, true, true);

          // bodiesInCircle.map(body => {
          //   if (body.gameObject.type === 'Rectangle') {
          //     body.gameObject.destroy();
          //     bullet.destroy();
          //   }
          //   return
          // })

          await Promise.all(params.playerEffecteds.map(async (v) => {
            const player = scene.players.find(p => p.schema.id === v.id);
            if (player) {
              await player.minusHp(v.damage);
              scene.sceneControl?.updateBar();
            }
          }))

          onFinished();
        }));
      })

      const onWorldBounds = (body: Phaser.Physics.Arcade.Body) => {
        if (body.gameObject !== bullet) return;
        scene.physics.world.removeListener('worldbounds', onWorldBounds);
        scene.events.removeListener(Phaser.Scenes.Events.UPDATE, updateBullet);
        bullet.destroy();
        onFinished();
      };

      scene.physics.world.on('worldbounds', onWorldBounds);

    })
  }

}