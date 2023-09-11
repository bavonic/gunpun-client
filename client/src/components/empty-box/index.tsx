import { FC } from 'react'
import { getImage } from 'assets'
import { Image } from 'components/image'

export const EmptyBox: FC<{ message?: string }> = (props) => {
  return (
    <div className="EmptyBox">
      {/* <Image src={getImage('emptyBox')} /> */}
      <p>{props.message || 'Nothing here!'}</p>
    </div>
  )
}