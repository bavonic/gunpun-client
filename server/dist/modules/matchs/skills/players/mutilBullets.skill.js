"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMutilBulletsSkillInstance = void 0;
const skills_utils_1 = require("../skills.utils");
const renderMutilBulletsSkillInstance = (config) => {
    const skillInstance = {
        serverProcess: (input) => {
            const { params, deltaTime } = input;
            const physics = (0, skills_utils_1.getArcadePhysics)(params);
            return new Promise((resolve) => {
                const bullets = new Array(config.numberOfBullet).fill(0).map((_, key) => {
                    const strength = params.strength + (key) * 80;
                    const bulletStat = (0, skills_utils_1.originCenterToCorner)(Object.assign(Object.assign({}, params.from), { w: 50, h: 50 }));
                    const bullet = physics.add.body(bulletStat.x, bulletStat.y);
                    bullet.setSize(bulletStat.w, bulletStat.h);
                    bullet.setCircle(25);
                    bullet.setCollideWorldBounds(true, 0, 0, true);
                    physics.velocityFromAngle(params.angle, strength, bullet.velocity);
                    return bullet;
                });
                let playerEffecteds = [];
                // params.platforms.map((stat) => {
                //   const platformStat = originCenterToCorner(stat);
                //   const target = physics.add.staticBody(platformStat.x, platformStat.y, platformStat.w, platformStat.h);
                //   (target as any)._type = 'platform';
                // })
                params.dataPixel.map((i) => {
                    physics.add.staticBody(i.x, i.y, 1 / 12, 1 / 12);
                });
                params.targets.map((stat) => {
                    const sizeRate = stat.size / 10;
                    const targetStat = (0, skills_utils_1.originCenterToCorner)({ x: stat.x, y: stat.y, w: 200 * sizeRate, h: 400 * sizeRate });
                    const target = physics.add.staticBody(targetStat.x, targetStat.y, targetStat.w, targetStat.h);
                    target._type = 'target';
                    target._id = stat.id;
                });
                physics.world.staticBodies.forEach((item) => {
                    bullets.map((bullet) => {
                        const type = item._type;
                        const id = item._id;
                        physics.add.overlap(bullet, item, () => {
                            bullet.destroy();
                            if (type === 'target') {
                                playerEffecteds.push({ id, damage: input.getDamage({ targetId: id }) });
                            }
                            return () => { };
                        });
                    });
                });
                const onResponse = () => {
                    physics.destroy();
                    resolve({ playerEffecteds });
                };
                if (input.onUpdate && requestAnimationFrame) {
                    let tick = 0;
                    const update = () => {
                        if (tick >= (deltaTime * 60)) {
                            return onResponse();
                        }
                        physics.world.update(tick * 1000, 1000 / 60);
                        physics.world.postUpdate();
                        input.onUpdate(physics);
                        tick++;
                        requestAnimationFrame(update);
                    };
                    requestAnimationFrame(update);
                }
                else {
                    physics.world.update(Date.now(), deltaTime * 1000);
                    onResponse();
                }
            });
        },
    };
    return skillInstance;
};
exports.renderMutilBulletsSkillInstance = renderMutilBulletsSkillInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0aWxCdWxsZXRzLnNraWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL3NraWxscy9wbGF5ZXJzL211dGlsQnVsbGV0cy5za2lsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxrREFBeUU7QUFFbEUsTUFBTSwrQkFBK0IsR0FBRyxDQUFDLE1BQWtDLEVBQUUsRUFBRTtJQUNwRixNQUFNLGFBQWEsR0FBa0I7UUFDbkMsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkIsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLENBQUM7WUFDcEMsTUFBTSxPQUFPLEdBQUcsSUFBQSwrQkFBZ0IsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUV6QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzdCLE1BQU0sT0FBTyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUN0RSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUU5QyxNQUFNLFVBQVUsR0FBRyxJQUFBLG1DQUFvQixrQ0FBTSxNQUFNLENBQUMsSUFBSSxLQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBRyxDQUFDO29CQUMxRSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENB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