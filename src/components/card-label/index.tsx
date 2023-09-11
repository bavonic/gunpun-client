import { Flex } from 'components';
import { useAccount } from 'modules/account/context';
import { FC } from 'react';
import { Animated } from 'react-animated-css';

interface CardLabelProps {
  label: string
}

export const CardLabel: FC<CardLabelProps> = (props) => {
  const account = useAccount();

  return (
    <>
      {/* @ts-ignore */}
      <Animated Animated Animated animationIn='bounceInDown' isVisible >
        <Flex className='CardLabel' alignItems='center' flexDirection='column'>
          <div className='wires'>
            <img src='/elements/cards/wire.png' className='wire' />
            <img src='/elements/cards/wire.png' className='wire' />
          </div>

          <Flex alignItems='center' className='board-name'>
            <div className='card-label'>
              <div className='label'>
                {props.label}
              </div>
            </div>
          </Flex>
        </Flex>
      </Animated>
    </>
  )
}
