import { OnModalMatchResult } from 'modals/match-result';
import { ENV } from 'modules/configs/context';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppEnv } from 'types';

export const DemoScreen: FC = () => {
  const navigate = useNavigate();
  // const gamePlay = useGamePlay();

  useEffect(() => {
    if (![AppEnv.STAGING].includes(ENV)) navigate('/demo');
  }, [])

  return (
    <div className="App">
      <button type="button" onClick={() => navigate('/demo')}>
        Game Demo
      </button>

      <button type="button" onClick={() => navigate('/demo/lobby')}>
        Lobby Demo
      </button>

      <button type="button" onClick={() => {
        // gamePlay.createMatchRoom({ mapId: "DemoPlayer" })
        //   .then(() => gamePlay.startMatchRoom())
      }}>
        Start Demo Players
      </button>

      <button type="button" onClick={() => navigate('/demo/skills')}>
        Demo Skills
      </button>

      <button type="button" onClick={() => navigate('/demo/players')}>
        Demo Players
      </button>

      <button type="button" onClick={() => navigate('/demo/player-positions-simulator')}>
        Demo Player Positions Simulator
      </button>

      <button type="button" onClick={() => OnModalMatchResult({ isWin: true, onBack: () => { } })}>
        Demo Modal Match Result (Win)
      </button>

      <button type="button" onClick={() => OnModalMatchResult({ isWin: false, onBack: () => { } })}>
        Demo Modal Match Result (Defeat)
      </button>
    </div>
  );
}