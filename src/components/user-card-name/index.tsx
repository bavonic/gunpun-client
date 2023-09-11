import { Flex } from 'components';
import { useAccount } from 'modules/account/context';
import { FC } from 'react';
import { Animated } from 'react-animated-css';

export const UserCardName: FC = () => {
  const account = useAccount();

  return (
    <>
      {/* @ts-ignore */}
      <Animated Animated Animated animationIn='bounceInDown' isVisible >
        <Flex className='UserCardName' alignItems='center' flexDirection='column'>
          <div className='wires'>
            <img src='/elements/cards/wire.png' className='wire' />
            <img src='/elements/cards/wire.png' className='wire' />
          </div>

          <Flex alignItems='center' className='board-name'>
            <div className='card-avatar'>
              <img src='/elements/cards/avatar-frame.png' />
              <img src={account.information.avatar} className='avatar-image' />
            </div>

            <div className='card-label'>
              <div className='label'>
                {account.information.nickname || account.information.name}
              </div>
              {/* <button className='ButtonActive btn-edit' onClick={() => gameDemoUpdatePlayer(true)}>
                <img src='/elements/pencil.png' />
              </button> */}
            </div>
          </Flex>
        </Flex>
      </Animated>
    </>
  )
}
