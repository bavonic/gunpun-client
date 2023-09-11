import { SoundConfigType, UseSounds, useSounds as coreUseSounds, playSound as corePlaySound, SoundContext as CoreSoundContext } from 'shared/sounds';

export const soundConfigs = {
  click: {
    src: '/sounds/click.wav',
    type: SoundConfigType.FX,
  },
  background: {
    src: '/sounds/background.mp3',
    type: SoundConfigType.MUSIC,
  },
  shot: {
    src: '/sounds/shot.wav',
    type: SoundConfigType.FX,
  },
  collide: {
    src: '/sounds/collide.wav',
    type: SoundConfigType.FX,
  },
  my_turn: {
    src: '/sounds/my-turn.mp3',
    type: SoundConfigType.FX,
  },
  map_1_background: {
    src: '/sounds/map_1_background.mp3',
    type: SoundConfigType.MUSIC,
  },
  end_defeat: {
    src: '/sounds/end_defeat.wav',
    type: SoundConfigType.FX,
  },
  pun_woo_hoo: {
    src: '/sounds/pun_woo_hoo.mp3',
    type: SoundConfigType.FX,
  },
}

export const useSounds: UseSounds<typeof soundConfigs> = coreUseSounds;
export const playSound: (key: keyof typeof soundConfigs) => void = corePlaySound;
export type SoundContext = CoreSoundContext<typeof soundConfigs>;