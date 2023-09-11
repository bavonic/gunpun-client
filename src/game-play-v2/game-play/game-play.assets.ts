import { Asset } from "./game-play.types";

export interface MatchAssets {
  bullet: Asset;
  rulerHeath: Asset;
  damage: Asset;
  imgArrow: Asset;
  imgRuler: Asset;
  imgYourTurn: Asset;
  imgTimeOut: Asset;
  blackScene: Asset;
  powerAnim: Asset;
  headStone: Asset;
}

export const matchAssets: MatchAssets = {
  bullet: {
    key: 'MATCH_BULLET',
    url: '/game/images/bullet.png',
    type: 'image',
  },
  rulerHeath: {
    key: 'RULER_HEATH',
    url: '/game/images/ruler_heath.png',
    type: 'image',
  },
  damage: {
    key: 'DAMAGE',
    url: '/game/images/damage.png',
    type: 'image',
  },
  imgRuler: {
    key: 'RULLER',
    url: '/images/game-play/ruler.png',
    type: 'image',
  },
  imgArrow: {
    key: 'ARROW',
    url: '/images/game-play/ruler-arrow.png',
    type: 'image',
  },
  imgYourTurn: {
    key: 'TEXT_YOUR_TURN',
    url: '/game/images/your-turn.png',
    type: 'image',
  },
  imgTimeOut: {
    key: 'TEXT_TIME_OUT',
    url: '/game/images/time-out.png',
    type: 'image',
  },
  blackScene: {
    key: 'BLACK_SCENE',
    url: '/game/images/black_scene.png',
    type: 'image',
  },
  powerAnim: {
    key: 'POWER_ANIM',
    url: '/game/images/power/power',
    type: 'atlas',
  },
  headStone: {
    key: 'HEAD_STONE',
    url: '/game/images/head-stone.png',
    type: 'image',
  },
}

export const loadMatchAssets = (scene: Phaser.Scene) => {
  return loadAssets(scene, matchAssets as any);
}

export const loadAssets = (scene: Phaser.Scene, assets: { [name: string]: Asset }) => {
  Object.keys(assets).map((key) => {
    const asset = (assets as any)[key] as Asset;
    const isExisted = scene.textures.exists(asset.key)
    if (isExisted) return;

    if (asset.type === 'image') scene.load.image(asset.key, asset.url);
    if (asset.type === 'sound') scene.load.audio(asset.key, asset.url);
    if (asset.type === 'atlas') scene.load.atlas(asset.key, `${asset.url}.png`, `${asset.url}.json`);
  })
}

export const loadAsset = (scene: Phaser.Scene, asset: Asset) => {
  const isExisted = scene.textures.exists(asset.key)
  if (isExisted) return;

  if (asset.type === 'image') scene.load.image(asset.key, asset.url);
  if (asset.type === 'sound') scene.load.audio(asset.key, asset.url);
  if (asset.type === 'atlas') scene.load.atlas(asset.key, `${asset.url}.png`, `${asset.url}.json`);
}