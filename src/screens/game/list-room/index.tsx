import { ButtonHexagon } from 'components/button-hexagon';
import { FC, useState } from 'react';
import { GameNavigator } from '../navigator';
import { ClassNames } from 'shared/utils';
import { JoinLobby } from '..';
import { OnModalCreateRoom } from 'modals/create-room';

enum FilterType {
  ALL = 'All',
  ONE_VS_ONE = '1 Vs 1',
  TWO_VS_TWO = '2 Vs 2',
  THREE_VS_THREE = '3 Vs 3',
}

export const ListRoom: FC = () => {
  const filters = [FilterType.ALL, FilterType.ONE_VS_ONE, FilterType.TWO_VS_TWO, FilterType.THREE_VS_THREE]
  const [filter, setFilter] = useState(FilterType.ALL)

  return (
    <div className="game-list-room">
      <GameNavigator title='ARENA' onBack={JoinLobby} onLogout />

      <div className='game-list-room__main'>
        <div className="game-list-room__filters">
          {filters.map((item, key) => <div className="game-list-room__filter-button" key={key}>
            <button
              className={ClassNames({
                ['game-list-room__button']: true,
                ['game-list-room__button--active']: item === filter,
              })}
              onClick={() => setFilter(item)}
            >
              <span className={ClassNames({ active: item === filter })}>{item}</span>
            </button>
          </div>)}
        </div>

        <div className="game-list-room__list">
          <Room />
          <Room />
          <Room />
          <Room />
          <Room />
          <Room />
          <Room />
          <Room />
          <Room />
        </div>

        <div className='game-list-room__action'>
          <div className="game-list-room__find">
            <input className='game-list-room__input' placeholder='Room ID' />

            <ButtonHexagon>
              FIND ROOM
            </ButtonHexagon>
          </div>

          <ButtonHexagon buttonType='primary' onClick={OnModalCreateRoom}>
            Create room
          </ButtonHexagon>
        </div>
      </div>
    </div >
  )
}

const Room: FC = () => {

  return (
    <div className="game-list-room__room">
      <div className='game-list-room__room__head'>
        <div className="game-list-room__room__id">#1234</div>
        <div className="game-list-room__room__label">3 VS 3</div>
      </div>
      <div className="game-list-room__room__body">
        <div className="game-list-room__room__owner">User name</div>
        <div className="game-list-room__room__status full">
          FULL
        </div>
      </div>
    </div>
  )
}

