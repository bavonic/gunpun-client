import { CSSProperties, FC } from 'react'
interface Character {
  gameUser: any
  style?: CSSProperties
}

export const Character: FC<Character> = ({ gameUser: user, style }) => {
  return (
    <div style={style} className='Character'>
      <div className='character-head'>
        <div className='images'>
          <img src='/elements/character/head.png' />
          <div className='build-avatar'>
            <img src={user.avatar} className='avatar' />
          </div>
          <img src='/elements/character/glass.png' className='glass' />
        </div>
      </div>

      <div className='character-body'>
        <img src='/elements/character/body.png' />
        {/* <div className='shadow' /> */}
      </div>

      <div className='items'>
        <img src='/elements/circle-led.png' />
        <img src='/elements/circle-led.png' />
      </div>
    </div>
  )
}
