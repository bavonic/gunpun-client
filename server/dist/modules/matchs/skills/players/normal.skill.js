"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalSkill = void 0;
const skills_utils_1 = require("../skills.utils");
exports.normalSkill = {
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
            params.targets.map((stat) => {
                const sizeRate = stat.size / 10;
                const targetStat = (0, skills_utils_1.originCenterToCorner)({ x: stat.x, y: stat.y, w: 200 * sizeRate, h: 400 * sizeRate });
                const target = physics.add.staticBody(targetStat.x, targetStat.y, targetStat.w, targetStat.h);
                target._type = 'target';
                target._id = stat.id;
            });
            params.dataPixel.map((i) => {
                physics.add.staticBody(i.x, i.y, 1 / 12, 1 / 12);
            });
            let playerEffecteds = [];
            physics.world.staticBodies.forEach((item) => {
                const type = item._type;
                const id = item._id;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsLnNraWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvbWF0Y2hzL3NraWxscy9wbGF5ZXJzL25vcm1hbC5za2lsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxrREFBeUU7QUFFNUQsUUFBQSxXQUFXLEdBQWtCO0lBQ3hDLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3ZCLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBRXBDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3QixNQUFNLE9BQU8sR0FBRyxJQUFBLCtCQUFnQixFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXpDLE1BQU0sVUFBVSxHQUFHLElBQUEsbUNBQW9CLGtDQUFNLE1BQU0sQ0FBQyxJQUFJLEtBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFHLENBQUM7WUFDMUUsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUUxRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElB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