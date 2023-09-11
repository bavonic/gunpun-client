import { FC } from 'react';
import { ClassNames } from 'shared/utils';

interface Props {
  onBack?: () => void
  onLogout?: boolean
  title: string
  className?: string
  roomId?: string
}

export const GameNavigator: FC<Props> = (props) => {

  return (
    <div className='game-navigator__wrapper'>
      <div className={ClassNames({ ['game-navigator']: true, [props.className]: true })}>
        {props.onBack && <button className='game-navigator__button game-navigator__button--left button-style' onClick={props.onBack}>
          <img src='/game/assets/icons/ic-arrow.png' />
        </button>}

        <div className='game-navigator__title-wrapper'>
          <div className='title'>
            <span>{props.title}</span>
          </div>

          {props.roomId && <div className='room-id'>
            <span>{props.roomId}</span>
          </div>}
        </div>

        {props.onLogout && <button className='game-navigator__button game-navigator__button--right button-style'>
          <img src='/game/assets/icons/ic-lock.png' />
        </button>}
      </div>
    </div>
  )
}
