import { Icon } from 'components/icon'
import { FC } from 'react'
import { ClassNames } from 'shared/utils'

export interface LoadingBoxProps {
  message?: string,
  mode?: 'light' | 'dark',
}

export const LoadingBox: FC<LoadingBoxProps> = (props) => {
  return (
    <div className={ClassNames({ LoadingBox: true, [props.mode!]: true })}>
      <Icon.Loading />
      {!!props.message && <p>{props.message}</p>}
    </div>
  )
}

LoadingBox.defaultProps = {
  mode: 'light'
}