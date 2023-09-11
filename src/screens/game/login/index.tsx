import { ButtonHexagon } from 'components/button-hexagon';
import { FC } from 'react';
import { useBlockchain } from 'shared/blockchain/context';

export const GameLogin: FC = () => {
  const { connectWallet } = useBlockchain();

  return (
    <div className="game-login">
      <img src='/game/assets/login/logo.png' className='game-login__logo' draggable={false} />

      <ButtonHexagon className='game-login__button'
        onClick={() => connectWallet('unipass').catch(er => console.log(er))}
      >
        <img src='/game/assets/logos/unipass.png' className='button__login' draggable={false} />

        <span>UNIPASS</span>
      </ButtonHexagon>
    </div>
  )
}
