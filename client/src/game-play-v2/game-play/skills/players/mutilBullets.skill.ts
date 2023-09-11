import { PlayerEffected, SkillInstance } from '../skills.types';
import { getArcadePhysics, originCenterToCorner } from '../skills.utils';

export const renderMutilBulletsSkillInstance = (config: { numberOfBullet: number }) => {
  const skillInstance: SkillInstance = {
    serverProcess: (input) => {
      const { params, deltaTime } = input;
      const physics = getArcadePhysics(params);

      return new Promise((resolve) => {
        const bullets = new Array(config.numberOfBullet).fill(0).map((_, key) => {
          const strength = params.strength + (key) * 80;

          const bulletStat = originCenterToCorner({ ...params.from, w: 50, h: 50 });
          const bullet = physics.add.body(bulletStat.x, bulletStat.y);
          bullet.setSize(bulletStat.w, bulletStat.h);
          bullet.setCircle(25);
          bullet.setCollideWorldBounds(true, 0, 0, true);
          physics.velocityFromAngle(params.angle, strength, bullet.velocity);

          return bullet;
        })

        let playerEffecteds: PlayerEffected[] = [];

        params.dataPixel.map((i) => {
          physics.add.staticBody(i.x, i.y, 2, 2)
        })

        params.targets.map((stat) => {
          const sizeRate = stat.size / 10;
          const targetStat = originCenterToCorner({ x: stat.x, y: stat.y, w: 200 * sizeRate, h: 400 * sizeRate });
          const target = physics.add.staticBody(targetStat.x, targetStat.y, targetStat.w, targetStat.h);
          (target as any)._type = 'target';
          (target as any)._id = stat.id;
        })

        physics.world.staticBodies.forEach((item) => {
          bullets.map((bullet) => {
            const type = (item as any)._type;
            const id = (item as any)._id;

            physics.add.overlap(bullet, item, () => {
              bullet.destroy();

              if (type === 'target') {
                playerEffecteds.push({ id, damage: input.getDamage({ targetId: id }) });
              }

              return () => { }
            })
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
        let overlaps: Phaser.Physics.Arcade.Collider[] = [];
        let bulletEndcounter = 0;

        scene.cameraZoom(1);
        player.weapon.anims.shot();

        const bullets = new Array(config.numberOfBullet).fill(0).map((_, key) => {
          const strength = params.strength + (key) * 80;
          const bullet = player.weapon.createBullet(params.from);
          bullet.setBodySize(50, 50);
          bullet.setCircle(25, 25);
          bullet.body.setCollideWorldBounds(true, 0, 0, true);
          scene.cameraFollow(bullet);
          scene.physics.velocityFromAngle(params.angle, strength, bullet.body.velocity);
          // scene.sounds.play('shot');
          return bullet;
        });


        // const updateBullet = () => {
        //   bullets.map((bullet) => bullet.angle += 8);
        // };
        // scene.events.addListener(Phaser.Scenes.Events.UPDATE, updateBullet);

        const onWorldBounds = (body: Phaser.Physics.Arcade.Body) => {
          body.gameObject.destroy();
          checkResolve();
        };

        const checkResolve = () => {
          bulletEndcounter += 1;

          if (bulletEndcounter >= config.numberOfBullet) {
            // scene.events.removeListener(Phaser.Scenes.Events.UPDATE, updateBullet);
            scene.physics.world.removeListener('worldbounds', onWorldBounds);
            overlaps.map(v => v.destroy());
            player.anims.idle();
            resolve(true);
          }
        }

        scene.physics.world.on('worldbounds', onWorldBounds);

        scene.platforms.children.entries.forEach((item: any) => {
          bullets.map((bullet) => {
            overlaps.push(scene.physics.add.overlap(item, bullet, async (_, bullet) => {
              bullet.destroy();
              // scene.sounds.play('collide');
              player.soundCollider.play();
              checkResolve();

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
            }));
          })
        })

        scene.players.map((player) => {
          if (player.schema.id === params.from.id) return;
          bullets.map((bullet) => {
            overlaps.push(scene.physics.add.overlap(player.object, bullet, async (_, bullet) => {

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
              bullet.destroy();
              player.soundCollider.play();
              // scene.sounds.play('collide');
              const damage = params.playerEffecteds.find(v => v.id === player.schema.id)?.damage || 0;
              if (damage) {
                scene.cameraShake();
                await player.minusHp(damage);
                scene.sceneControl.updateBar();
              }
              checkResolve();
            }));
          })
        })
      })
    }
  }

  return skillInstance
}