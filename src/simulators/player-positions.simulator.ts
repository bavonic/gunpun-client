import { GameObjectStat, PlayerStat } from "game-types";

export class PlayerPositionsSimulator {
  static process(input: PlayerPositionsSimulatorInput, scene: Phaser.Scene, resolve: (data: PlayerPositionsSimulatorOutput) => any) {
    // Initialize scene
    scene.physics.world.setBoundsCollision(false, false, false, true);
    scene.physics.world.setBounds(0, 0, input.mapSize.w, input.mapSize.h);

    // Draw platform
    const staticGroup = scene.physics.add.staticGroup();
    input.platforms.map((stat) => {
      const platform = staticGroup.create(stat.x, stat.y,);
      platform.setData("id", stat.id);
      platform.setData("type", "platform");
      platform.setBodySize(stat.w, stat.h);
      platform.setDisplaySize(0, 0);
    })

    // Resolve
    let output: PlayerStat[] = [];
    const onResolve = () => {
      if (output.length === input.players.length) {
        scene.scene.pause();
        resolve({ players: output })
        scene.physics.world.removeAllListeners('worldbounds');
      }
    }

    // Draw players
    input.players.map((stat) => {
      const sprite = scene.physics.add.sprite(stat.x, stat.y, '');
      sprite.setBodySize(200, 400);
      sprite.setScale(stat.size / 10);
      sprite.setData('id', stat.id);
      sprite.body.setCollideWorldBounds(true, 0, 0, true)

      let isChecked = false;
      scene.physics.add.collider(sprite, staticGroup, () => {
        if (isChecked) return;
        isChecked = true;
        output.push({ ...stat, y: sprite.y });

        // Resolve when enough output
        onResolve();
      });
    })

    const checkWorlBounds = (body: Phaser.Physics.Arcade.Body) => {
      const id = body.gameObject.getData("id");
      const player = input.players.find(v => v.id === id);
      if (player) output.push({ ...player, y: body.y });
      onResolve();
    }

    // let isWorldChecked = false;
    scene.physics.world.on('worldbounds', checkWorlBounds)
  }
}

export interface PlayerPositionsSimulatorInput {
  players: PlayerStat[],
  platforms: GameObjectStat[],
  mapSize: { w: number, h: number }
}

export interface PlayerPositionsSimulatorOutput {
  players: PlayerStat[],
}