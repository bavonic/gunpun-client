import { useSounds } from "sounds";
import { getGameConfig } from "game-config";
import { Room } from "colyseus.js";
import { Button } from "components";
import { Emitter } from "game-play-v2/game-play/emitter";
import {
  SkillServerProcessResponse,
  PlayerSkillId,
  SkillParams,
} from "game-play-v2/game-play/skills/skills.types";
import {
  getSkillInstance,
  originCornertoCenter,
} from "game-play-v2/game-play/skills/skills.utils";
import { gameClient } from "index";
import { MapConfig } from "modules/maps";
import Phaser from "phaser";
import Slider from "rc-slider";
import { FC, useEffect, useState } from "react";
import { SimulatorScene } from "simulators/simulator.scene";
import { MatchScene } from "game-play-v2/scenes/main-monitor/game/match-game/match.scene";
import { GameEvent } from "game-play-v2/game-play/game-play.types";
import { wait } from "game-play-v2/game-play/game-play.utils";
import { SceneController } from "game-play-v2/scenes/sub-monitor/SceneController";
import { SceneLoadAssets } from "game-play-v2/scenes/sub-monitor/SceneLoadAssets";

const emitter = new Emitter();

let serverCheckingGame: Phaser.Game;
let clientCheckingGame: Phaser.Game;
let room: Room;
let tempServerSkillCheckingOutput;

export const DemoSkills: FC = () => {
  const sounds = useSounds();
  const [error, setError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [strengthPercent, setStrengthPercent] = useState(
    +localStorage.getItem("strengthPercent") || 45
  );

  useEffect(() => {
    localStorage.setItem("strengthPercent", strengthPercent.toString());
  }, [strengthPercent]);

  const [clientSkillCheckingOutput, setClientSkillCheckingOutput] =
    useState<SkillServerProcessResponse>();
  const [serverSkillCheckingOutput, setServerSkillcheckingOutput] =
    useState<SkillServerProcessResponse>();

  const initialize = async () => {
    if (!serverCheckingGame)
      serverCheckingGame = new Phaser.Game(
        getGameConfig(
          {
            parent: "serverCheckingGame",
            width: 2645,
            height: 1080,
          },
          true
        )
      );

    if (!clientCheckingGame)
      clientCheckingGame = new Phaser.Game(
        getGameConfig(
          {
            parent: "clientCheckingGame",
            width: 2645,
            height: 1080,
          },
          true
        )
      );

    // Client
    room = await gameClient.create("SkillChecking");

    serverCheckingGame.scene.remove("MatchScene");
    serverCheckingGame.scene.remove("SceneLoadAssets");
    serverCheckingGame.scene.add("SceneLoadAssets", SceneLoadAssets);
    serverCheckingGame.scene.add("MatchScene", MatchScene);
    await wait(100);
    serverCheckingGame.scene.start("SceneLoadAssets", { test: true });
    serverCheckingGame.scene.start("MatchScene", {
      room,
      sounds,
      ignoreAuth: true,
    });
    const scene = serverCheckingGame.scene.getScene("MatchScene") as MatchScene;

    room.onLeave(async (code) => setError(true));

    room.onMessage(GameEvent.SERVER_INITIALIZE_MATCH, () => {
      sounds.stopAll();
    });

    room.onMessage("MAP_CONFIG", (map) => {
      // sounds.stopAll();
      console.log(map);
    });

    room.onMessage(GameEvent.SERVER_PERFORM_INTRO, () => {
      sounds.stopAll();
    });

    room.onMessage(GameEvent.SERVER_TEST_SKILL_CHECKING_RESULT, (result) => {
      setServerSkillcheckingOutput(result);
      tempServerSkillCheckingOutput = result;
    });

    room.onMessage(GameEvent.SERVER_PLAYER_TURN, () => {
      setIsInitialized(true);
    });

    room.onMessage(GameEvent.SERVER_PRELOAD_ASSETS, async (params) => {
      const mapConfig = params.mapConfig as MapConfig;
      // console.log(params)
      scene.preloadAssets({ mapConfig });
    });

    room.onMessage(GameEvent.SERVER_PERFORM_PLAYER_TURN, (params) => {
      const player = scene.players[0];
      scene.performPlayerSkill(params).then(() => {
        room.send(GameEvent.USER_PERFORM_PLAYER_TURN_COMPLETED);
        scene.cameraPan(player.object);
        player.ruler.show();
      });
    });

    room.onMessage(GameEvent.SERVER_PERFORM_INTRO, () => {
      room.send(GameEvent.USER_PERFORM_INTRO_COMPLETED);
    });

    room.onMessage(
      GameEvent.SERVER_TEST_PLAYER_RESPONSE_SKILL_PARAMS,
      (skillParams) => {
        emitter.emit(
          GameEvent.SERVER_TEST_PLAYER_RESPONSE_SKILL_PARAMS,
          skillParams
        );
      }
    );

    room.send(GameEvent.USER_START);
  };

  const handleSkill = async (skillId: PlayerSkillId) => {
    let skillInstance = getSkillInstance(skillId);
    if (!isInitialized || !skillInstance) return;
    setClientSkillCheckingOutput(undefined);
    setServerSkillcheckingOutput(undefined);
    const scenes = serverCheckingGame.scene.getScene(
      "MatchScene"
    ) as MatchScene;

    await new Promise((resolve) => {
      emitter.once(
        GameEvent.SERVER_TEST_PLAYER_RESPONSE_SKILL_PARAMS,
        async (skillParms: SkillParams) => {
          clientCheckingGame.scene.remove("SimulatorScene");
          clientCheckingGame.scene.add("SimulatorScene", SimulatorScene);
          await wait(100);
          clientCheckingGame.scene.start("SimulatorScene");

          const scene = clientCheckingGame.scene.getScene("SimulatorScene");
          const staticGroup = scene.physics.add.staticGroup();

          const clientReuslt = await skillInstance.serverProcess({
            params: skillParms,
            deltaTime: 10,
            getDamage: () =>
              tempServerSkillCheckingOutput?.playerEffecteds[0]?.damage,
            onUpdate: (physics) => {
              staticGroup?.children?.entries?.map((item) => item.destroy(true));

              physics.world.staticBodies.forEach((b) => {
                const stat = originCornertoCenter({
                  x: b.x,
                  y: b.y,
                  w: b.width,
                  h: b.height,
                });
                const item = staticGroup.create(stat.x, stat.y);
                item.setBodySize(stat.w, stat.h);
              });

              physics.world.bodies.forEach((b) => {
                const stat = originCornertoCenter({
                  x: b.x,
                  y: b.y,
                  w: b.width,
                  h: b.height,
                });
                const item = staticGroup.create(stat.x, stat.y);
                item.setBodySize(stat.w, stat.h);
                if (b.isCircle) item.setCircle(b.radius);
              });
            },
          });

          setClientSkillCheckingOutput(clientReuslt);
          resolve(true);
        }
      );

      const targets = [];
      const dataPixel = [];

      scenes.players
        .filter((v) => v.asset.key === "DefaultPlayer")
        .map((i) => {
          targets.push({ x: i.object.x, y: i.object.y });
        });
      targets.map((i) => {
        scenes.platforms.children.entries.forEach((item: any) => {
          if (
            // i.x - 150 < item.x &&
            // item.x < i.x + 150 &&
            item.y <
            i.y + 100
          ) {
            if (item.x % 12 == 0 && item.y % 12 == 0) {
              dataPixel.push({ x: item.x, y: item.y });
            }
          }
        });
      });

      console.log(strengthPercent)
      room.send(GameEvent.USER_TEST_PLAYER_PERFORM_SKILL, {
        skillId,
        strengthPercent,
        dataPixel,
      });

      room.send(GameEvent.USER_TEST_PLAYER_GET_SKILL_PARAMS, {
        strengthPercent,
        dataPixel,
      });
    });
  };

  useEffect(() => {
    if (!isInitialized) initialize().catch(() => setError(true));
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
        initialize().catch(() => {
          setError(true);
        });
      }, 2000);
    }
  }, [error]);

  return (
    <div className="DemoSkills">
      <div className="monitors">
        <div id="clientCheckingGame"></div>
        <div id="serverCheckingGame"></div>
      </div>

      <div className="panel">
        <form className="form">
          <div className="strengthBar">
            <div className="name">Strength {strengthPercent}%</div>
            <Slider
              min={0}
              max={100}
              step={1}
              value={strengthPercent}
              onChange={(e) => {
                setStrengthPercent(+e);
              }}
            />
          </div>

          <div className="ctas">
            {Object.values(PlayerSkillId).map((skillId) => {
              return (
                <Button
                  key={skillId}
                  async
                  onClick={() => handleSkill(skillId)}
                >
                  {skillId}
                </Button>
              );
            })}
          </div>
        </form>

        <div className="results">
          <div className="box client">
            <div className="title">Client</div>
            <pre>
              {clientSkillCheckingOutput &&
                JSON.stringify(clientSkillCheckingOutput, null, 2)}
            </pre>
          </div>

          <div className="box server">
            <div className="title">Server Checking</div>
            <pre>
              {serverSkillCheckingOutput &&
                JSON.stringify(serverSkillCheckingOutput, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
