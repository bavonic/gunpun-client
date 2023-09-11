import { FC, useEffect, useState } from 'react';
import { JOIN_CHALLENGE, RETURN_LOBBY } from 'reducers';
import { DemoLooby } from 'screens/demo/demo-lobby';
import { useBlockchain } from 'shared/blockchain/context';
import { store, useSelector } from 'stores';
import { ListRoom } from './list-room';
import { GameLogin } from './login';
import { OnModalCreateRoom } from 'modals/create-room';
// import { MatchRoom } from 'game-play';
import { MapMode, MapsModule } from 'modules/maps';
import { gameClient } from 'index';
import { useAccount } from 'modules/account/context';
// import { LoginScreen } from 'screens/demo/game-demo/login';

export let JoinChallenge: () => any = () => true;
export let JoinLobby: () => any = () => true;

export const MainGame: FC = () => {
  const { wallet } = useBlockchain();
  const gameState = useSelector(s => s.gameState);
  // const [rooms, setRooms] = useState<MatchRoom[]>([]);
  const maps = useSelector(s => s.maps);
  const pvpMaps = maps.data?.filter(v => [MapMode.DEMO_PVP].includes(v.mode));
  const account = useAccount();

  //Action game
  JoinChallenge = () => store.dispatch({ type: JOIN_CHALLENGE })
  JoinLobby = () => store.dispatch({ type: RETURN_LOBBY })

  const fetchRooms = async () => {
    // let roomsData: MatchRoom[] = [];

    // await Promise.all(pvpMaps.map(async (map) => {
    //   console.log('map', map)
    //   const data = await gameClient.getAvailableRooms(map.id);
    //   roomsData.push(...data);
    // }))

    // setRooms(roomsData);
  }

  useEffect(() => {
    fetchRooms();
    const interval = setInterval(fetchRooms, 1000 * 3);
    return () => {
      clearInterval(interval);
    }
  }, [maps])

  useEffect(() => {
    MapsModule.fetch();
  }, [])

  // console.log('rooms', rooms)
  // console.log(pvpMaps)

  return (
    <div className="main-game">
      {function () {
        // if (!account.isConnected) return <LoginScreen />
        if (!wallet) return <GameLogin />
        if (gameState.inLobby) return <DemoLooby />
        if (gameState.inChallenge) return <ListRoom />
        return <div>demo</div>
      }()}
    </div>
  )
}
