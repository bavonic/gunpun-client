"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMutilBulletsDelayTimeSkillInstance = void 0;
const skills_utils_1 = require("../skills.utils");
const renderMutilBulletsDelayTimeSkillInstance = (config) => {
    const skillInstance = {
        serverProcess: (input) => {
            const { params, deltaTime } = input;
            return new Promise((resolve) => {
                const physics = (0, skills_utils_1.getArcadePhysics)(params);
                const bulletStat = (0, skills_utils_1.originCenterToCorner)(Object.assign(Object.assign({}, params.from), { w: 50, h: 50 }));
                const bullet = physics.add.body(bulletStat.x, bulletStat.y);
                bullet.setSize(bulletStat.w, bulletStat.h);
                bullet.setCircle(25);
                bullet.setCollideWorldBounds(true, 0, 0, true);
                physics.velocityFromAngle(params.angle, params.strength, bullet.velocity);
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
                let playerEffecteds = [];
                physics.world.staticBodies.forEach((item) => {
                    const type = item._type;
                    const id = item._id;
                    physics.add.overlap(bullet, item, () => {
                        bullet.destroy();
                        if (type === 'target') {
                            if (!playerEffecteds.find(v => v.id === id)) {
                                const damage = input.getDamage({ targetId: id });
                                playerEffecteds = new Array(config.numberOfBullet).fill({
                                    id,
                                    damage,
                                }).map((value, key) => (Object.assign(Object.assign({}, value), { bulletIndex: key })));
                            }
                        }
                        return () => { };
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
exports.renderMutilBulletsDelayTimeSkillInstance = renderMutilBulletsDelayTimeSkillInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0aWxCdWxsZXRzRGVsYXlUaW1lLnNraWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL3NraWxscy9wbGF5ZXJzL211dGlsQnVsbGV0c0RlbGF5VGltZS5za2lsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxrREFBeUU7QUFFbEUsTUFBTSx3Q0FBd0MsR0FBRyxDQUFDLE1BR3hELEVBQUUsRUFBRTtJQUNILE1BQU0sYUFBYSxHQUFrQjtRQUNuQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QixNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEtBQUssQ0FBQztZQUVwQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzdCLE1BQU0sT0FBTyxHQUFHLElBQUEsK0JBQWdCLEVBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXpDLE1BQU0sVUFBVSxHQUFHLElBQUEsbUNBQW9CLGtDQUFNLE1BQU0sQ0FBQyxJQUFJLEtBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFHLENBQUM7Z0JBQzFFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FB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