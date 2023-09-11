export function calcVelocity(sourceObject: any, targetObject: any, scene: Phaser.Scene, isCollision: boolean): Phaser.Curves.Spline {
  // const launchVelocity = new Phaser.Math.Vector2();
  // const x1 = sourceObject.x;
  // const y1 = sourceObject.y;
  // let x2 = targetObject.x;
  // const y2 = targetObject.y;
  let targetX = targetObject.x
  let targetY = targetObject.y
  if (!isCollision) {
    targetX = sourceObject.x
    targetY = sourceObject.y
  };

  // const gravity = scene.physics.world.gravity.y !== 0 ? scene.physics.world.gravity.y : 300;
  // const dx = x2 - x1;
  // const vx = Math.sign(dx) * Phaser.Math.Between(500, 600);
  // const t = dx / vx;
  // const vy = (-0.5 * gravity * t ** 2 - y1 + y2) / t;
  // launchVelocity.set(vx, vy);


  const p0 = new Phaser.Math.Vector2(targetX, targetY);
  const p1 = new Phaser.Math.Vector2(Phaser.Math.Between(120, 200), Phaser.Math.Between(300, 400));
  const p2 = new Phaser.Math.Vector2(Phaser.Math.Between(700, 800), Phaser.Math.Between(100, 200));
  // const p3 = new Phaser.Math.Vector2(sourceObject.x, sourceObject.y - 500);
  const p4 = new Phaser.Math.Vector2(sourceObject.x, sourceObject.y);

  const pointer = [p4, p2, p1, p0]
  const curve = new Phaser.Curves.Spline(pointer);

  return curve;
}