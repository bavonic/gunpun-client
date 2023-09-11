import { Howl } from 'howler';
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { SoundConfigType, SoundConfigs } from './sounds.types';

export type Sounds = { [key: string]: Howl };

export interface SoundState {
  isInitialized: boolean
  sfx: {
    isMute: boolean,
    volume: number,
  },
  music: {
    isMute: boolean,
    volume: number,
  },
  sounds: Sounds,
}

const initialState: SoundState = {
  isInitialized: false,
  sounds: {} as Sounds,
  sfx: {
    isMute: false,
    volume: 0.5,
  },
  music: {
    isMute: false,
    volume: 0.2,
  }
}

export interface SoundContext<T extends SoundConfigs> extends SoundState {
  play: (key: keyof T) => void,
  stop: (key: keyof T) => void,
  stopAll: () => void,
  setMuteSfx: (value: boolean) => void,
  adjustSfxVolume: (value: number) => void,
  setMuteMusic: (value: boolean) => void,
  adjustMusicVolume: (value: number) => void,
}

export const soundContext = createContext({} as SoundContext<any>);
export let playSound: (key: string) => void = () => { };

export const SoundProvider: FC<PropsWithChildren<{ soundConfigs: SoundConfigs }>> = (props) => {
  const [state, setState] = useState<SoundState>(initialState);

  const initialize = async () => {
    let sounds: Sounds = {};

    await Promise.all(Object.keys(props.soundConfigs).map((key) => {
      return new Promise((resolve) => {
        const soundConfig = props.soundConfigs[key];
        const howl = new Howl({
          src: typeof soundConfig.src === 'string' ? [soundConfig.src] : soundConfig.src,
          loop: soundConfig.type === 'MUSIC',
          autoplay: false,
          onloaderror: function () {
            console.warn(`Can't load sound ${key}`)
            sounds[key] = howl;
            resolve(true);
          },
          onload: () => {
            sounds[key] = howl;
            resolve(true);
          },
          volume: soundConfig.type === 'MUSIC' ? state.music.volume : state.sfx.volume
        }).load();
      })
    }));

    setState(s => ({ ...s, isInitialized: true, sounds }));
  }

  useEffect(() => {
    initialize();
  }, [props.soundConfigs])

  const context: SoundContext<any> = {
    ...state,
    adjustMusicVolume: (value) => {
      const volume = +Number(value).toFixed(1);
      Object.keys(state.sounds).map((key) => {
        const sound = state.sounds[key];
        const soundConfig = props.soundConfigs[key];
        if (soundConfig.type === SoundConfigType.MUSIC) sound.volume(volume);
      })
      setState(s => ({ ...s, music: { ...s.music, volume } }));
    },
    adjustSfxVolume: (value) => {
      const volume = +Number(value).toFixed(1);
      Object.keys(state.sounds).map((key) => {
        const sound = state.sounds[key];
        const soundConfig = props.soundConfigs[key];
        if (soundConfig.type === SoundConfigType.FX) sound.volume(volume);
      })
      setState(s => ({ ...s, sfx: { ...s.sfx, volume } }));
    },
    setMuteMusic: (isMute) => {
      Object.keys(state.sounds).map((key) => {
        const sound = state.sounds[key];
        const soundConfig = props.soundConfigs[key];
        if (soundConfig.type === SoundConfigType.MUSIC) sound.mute(isMute);
      })
      setState(s => ({ ...s, music: { ...s.music, isMute } }));
    },
    setMuteSfx: (isMute) => {
      Object.keys(state.sounds).map((key) => {
        const sound = state.sounds[key];
        const soundConfig = props.soundConfigs[key];
        if (soundConfig.type === SoundConfigType.FX) sound.mute(isMute);
      })
      setState(s => ({ ...s, sfx: { ...s.sfx, isMute } }));
    },
    play: (key: any) => {
      const sound = state.sounds[key];
      const soundConfig = props.soundConfigs[key];
      if (!sound || !soundConfig) return;

      if (soundConfig.type === SoundConfigType.MUSIC) {
        // Stop all another music
        Object.keys(state.sounds).map((soundKey) => {
          const sound = state.sounds[soundKey];
          const soundConfig = props.soundConfigs[soundKey];
          if (soundConfig.type === SoundConfigType.MUSIC) sound.stop();
        })
      }
      sound.play();
    },
    stop: (key: any) => {
      const sound = state.sounds[key];
      const soundConfig = props.soundConfigs[key];
      if (!sound || !soundConfig) return;
      sound.stop();
    },
    stopAll() {
      Object.keys(state.sounds).map((soundKey) => {
        const sound = state.sounds[soundKey];
        sound.stop();
      })
    }
  }

  playSound = (key) => context.play(key);

  return (
    <soundContext.Provider value={context}>
      {props.children}
    </soundContext.Provider>
  )
}

export type UseSounds<T extends SoundConfigs> = () => SoundContext<T>;

export const useSounds: UseSounds<any> = () => {
  const context = useContext(soundContext);
  return context;
};
