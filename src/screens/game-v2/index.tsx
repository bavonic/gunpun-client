import { getGameConfig } from "game-config";
import { wait } from "game-play-v2/game-play/game-play.utils";
import { SceneLoadAssets } from "game-play-v2/scenes/sub-monitor/SceneLoadAssets";
import { useAccount } from "modules/account/context";
import { useEffect } from "react";
import { useBlockchain } from "shared/blockchain";

export let game_v2;

export const GamePlayV2 = () => {
  const { connectWallet } = useBlockchain();
  const account = useAccount();
  const { wallet } = useBlockchain();

  const init = async () => {
    game_v2 = await new Phaser.Game(
      getGameConfig({
        parent: "Game-v2",
        width: 1920,
        height: 1080,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      })
    );
    game_v2.scene.add("SceneLoadAssets", SceneLoadAssets);
    await wait(1000);
    game_v2.scene.start("SceneLoadAssets", {
      wallet: connectWallet,
      social: account,
    });
  };

  useEffect(() => {
    if (account.isInitialized) {
      init();
    }
  }, [account.isInitialized]);

  return (
    <div className="Game-v2">
      <div id="Game-v2" />
    </div>
  );
};
