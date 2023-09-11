export enum SoundConfigType {
  FX = 'FX',
  MUSIC = 'MUSIC'
}

export interface SoundConfig {
  src: string | string[],
  type: SoundConfigType
}

export interface SoundConfigs {
  [key: string]: SoundConfig
}

export interface SoundManager {
  mute: boolean,
  volume: number,
  stop: boolean,
}

