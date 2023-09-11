import type Phaser from 'phaser';

export interface CreateAnimParams {
  sprite: Phaser.Physics.Arcade.Sprite,
  key: string,
  animKey: string,
  range?: { start: number, end: number }
  frames?: number[],
  repeat?: number,
}

export function createAnim(params: CreateAnimParams) {
  let config: Phaser.Types.Animations.GenerateFrameNames = {
    zeroPad: 5,
    prefix: `${params.animKey}_`,
    suffix: '.png',
  }

  if (params.range) {
    config = {...config, ...params.range};
  }

  if (params.frames) {
    config.frames = params.frames;
  }

  const frameNames = params.sprite.scene.anims.generateFrameNames(params.key, config);
  return params.sprite.anims.create({ key: params.animKey, frames: frameNames, frameRate: 12, repeat: params.repeat });
}

export function wait(time: number) {
  return new Promise(r => setTimeout(r, time));
}

export function requestTime<T>(process: () => Promise<any>, time: number): Promise<T> {
  return new Promise(async (resolve, reject) => {
    let inTime = false, data: any;

    process()
      .then(res => {
        data = res;
        if (inTime) resolve(data);
      })
      .catch(err => reject(err))

    setTimeout(() => {
      inTime = true;
      if (data) resolve(data);
    }, time)
  })
}

export const toHHMMSS = (input: number) => {
  let secs = typeof input === "number" ? input : 0;

  const secNum = parseInt(secs.toString(), 10);
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor(secNum / 60) % 60;
  const seconds = secNum % 60;

  return [hours, minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val))
    .filter((val, index) => val !== "00" || index > 0)
    .join(":")
    .replace(/^0/, "");
};