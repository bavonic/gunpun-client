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

        // params.platforms.map((stat) => {
        //   const platformStat = originCenterToCorner(stat);
        //   const target = physics.add.staticBody(platformStat.x, platformStat.y, platformStat.w, platformStat.h);
        //   (target as any)._type = 'platform';
        // })

        params.dataPixel.map((i) => {
          physics.add.staticBody(i.x, i.y, 1 / 12, 1 / 12)
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
  }

  return skillInstance
}