import { FC } from 'react';
import { GameNavigator } from '../navigator';
import { ButtonHexagon } from 'components/button-hexagon';
import { ClassNames } from 'shared/utils';

export const HostRoom: FC = () => {

  return (
    <div className="host-room-wrapper">
      <GameNavigator
        title={'ARENA'}
        className='host-room__navigator'
        onBack={() => true}
        onLogout
        roomId='#12345'
      />

      <div className='host-room-wrapper__main'>
        <section className='host-room__teams'>
          <div className='host-room__name'>
            <div className='name-group name-group--left'>
              <div className='name name--left'>
                YOUR TEAM
              </div>
            </div>

            <div className='name-group name-group--right'>
              <div className='name name--right'>
                ENEMY TEAM
              </div>
            </div>
          </div>

          <div className='host-room__cages'>
            <div className='team team--left'>
              <TeamSlot user={1} isYou />
              <TeamSlot />
              <TeamSlot />
            </div>

            <img src='/game/assets/icons/ic-change.png' />

            <div className='team team--right'>
              <TeamSlot />
              <TeamSlot />
              <TeamSlot />
            </div>
          </div>
        </section>

        <section className='host-room__actions'>
          <div className='actions-group actions__skills'>
            <div className='label'>Skills</div>
            <div className='skills-list'>
              <div className='skills-item'></div>
              <div className='skills-item'></div>
              <div className='skills-item'></div>
            </div>
          </div>

          <div className='actions-group actions__weapon'>
            <div className='skills-item'></div>
          </div>

          <div className='actions-group actions__invite'>
            <div className='skills-item'></div>
          </div>

          {/* <div className='actions-group actions__maps'>
          <span>Map:</span>
        </div> */}

          <ButtonHexagon className='actions-start-game' buttonType='primary'>
            START
          </ButtonHexagon>
        </section>
      </div>
    </div>
  )
}

interface TeamSlotProps {
  user?: any
  isYou?: boolean
}

const TeamSlot: FC<TeamSlotProps> = (props) => {

  return (
    <div className="team-slot-wrapper">
      <div className={ClassNames({ ['team-slot']: true, hasUser: !!props.user })}>
        {function () {
          if (!props.user) return <img src='/game/assets/backgrounds/bg-x.png' className='team-slot-empty' />

          return <>
            <img src='/game/assets/character/demo.png' className='character' />
            <div className='team-slot__label'>
              <div className='team-slot__name'>
                <span>Name</span>
              </div>
              <button className='button-style'>
                <img src='/game/assets/icons/ic-x.png' />
              </button>
            </div>
          </>
        }()}
      </div>
      {props.isYou && <button className='button-style team-slot__ready'>
        READY
      </button>}
    </div>
  )
}


