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
      physics.velocityFromAngle(params.angle, params.strength, bullet.velocity);

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
}