import { getGameConfig } from 'game-config';
import { Button, InputSelect } from 'components';
import { loadMatchAssets } from 'game-play-v2/game-play/game-play.assets';
import { wait } from 'game-play-v2/game-play/game-play.utils';
import { Player } from 'game-play-v2/game-play/players/player.core';
import { PlayerSchema, PlayerVariant } from 'game-play-v2/game-play/players/player.types';
import { DefaultPlayer } from 'game-play-v2/game-play/players/variants/player.default';
import { PersonalPlayer } from 'game-play-v2/game-play/players/variants/player.personal';
import { WeaponVariant } from 'game-play-v2/game-play/players/weapons/types';
import { FC, useEffect, useState } from 'react';
import { SimulatorScene } from 'simulators/simulator.scene';

export const DemoPlayers: FC = () => {
  const [game, setGame] = useState(undefined as Phaser.Game | undefined);
  const [player, setPlayer] = useState<Player>();
  const [playerVariant, setPlayerVariant] = useState<PlayerVariant>(PlayerVariant.DEFAULT);
  const [weaponVariant, setWeaponVariant] = useState<WeaponVariant>(WeaponVariant.DEFAULT);

  const initialize = () => {
    setGame(new Phaser.Game(getGameConfig({
      parent: 'DemoPlayers',
      width: 2000,
      height: 2000,
    }, true)))
  }

  const renderPlayer = async () => {
    try {
      if (!game) return;

      game.scene.remove('SimulatorScene');
      game.scene.add('SimulatorScene', SimulatorScene);
      await wait(100);
      game.scene.start('SimulatorScene');

      const scene = game.scene.getScene('SimulatorScene') as SimulatorScene;
      const staticGroup = scene.physics.add.staticGroup();

      await new Promise((resolve) => {
        const id = Date.now().toString();
        loadMatchAssets(scene);

        let schema: PlayerSchema = {
          weaponVariant,
          name: "123",
          speed: 1,
          id: id,
          remainHp: 1000,
          totalHp: 1500,
          isFlip: false,
          isInTurn: true,
          rulerAngle: 25,
          size: 10,
          teamId: 'A',
          toJSON: () => { },
          controller: "2",
          x: 1000,
          y: 800,
          skills: [],
          variant: playerVariant,
          isMoving: false,
        }

        let player: Player;
        if (schema.variant === PlayerVariant.DEFAULT) player = new DefaultPlayer({ schema });
        if (schema.variant === PlayerVariant.PERSONAL_I) player = new PersonalPlayer({ schema });
        if (!player) throw Error("Not supported yet!");

        player.preload(scene);

        scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
          // Draw player
          player.initialize();

          // Draw platform
          const platform = staticGroup.create(1000, 1500, '');
          platform.setBodySize(2000, 100);
          scene.physics.add.collider(staticGroup, player.object);
          setPlayer(player);
          resolve(true);
        })

        scene.load.start();
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!game) initialize();
  }, [game])

  return (
    <div className="DemoPlayers">
      <div id="DemoPlayers"></div>

      <div className="panel">
        <div className="box">
          {/* <div className="title">Enter Asset URL</div> */}
          {/* <input value={assetUrl} onChange={e => setAsseturl(e.target.value)} /> */}
          <div className="label">Player</div>
          <InputSelect
            options={Object.values(PlayerVariant).map((v) => ({ label: v, value: v }))}
            value={playerVariant}
            onChange={e => setPlayerVariant(e)}
          />
          <div className="label">Weapon</div>
          <InputSelect
            options={Object.values(WeaponVariant).map((v) => ({ label: v, value: v }))}
            value={weaponVariant}
            onChange={e => setWeaponVariant(e)}
          />
          <Button
            onClick={() => renderPlayer()}
            async
          >
            Render
          </Button>
        </div>

        <div className="box">
          <div className="title">Anims</div>
          {!!player && <>
            <button type='button' onClick={() => player.anims.idle()}>idle</button>
            <button type='button' onClick={() => player.anims.hurt()}>hurt</button>
            <button type='button' onClick={() => player.anims.move()}>move</button>
            <button type='button' onClick={() => player.anims.shot()}>shot</button>

            {/* <button type='button' onClick={() => player.anims.shotAnim()}>shotAnim</button> */}

            <button type='button' onClick={() => player.anims.win()}>win</button>
            <button type='button' onClick={() => player.anims.defeat()}>defeat</button>
          </>}
        </div>

        <div className="box">
          <div className="title">Funcs</div>
          {!!player && <>
            <button type='button' onClick={() => player.flip(!player.isFlip)}>flip</button>
            {/* <button type='button' onClick={() => player.minusHp(10)}>minusHp</button> */}
            {/* <button type='button' onClick={() => player.anims.endDefeat()}>endDefeat</button> */}
          </>}
        </div>
      </div>
    </div>
  )
}