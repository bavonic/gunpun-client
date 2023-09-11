import { FC } from 'react'

export interface ImageProps {
  src: string,
  className?: string,
  onClick?: any,
  draggable?: boolean,
  height?: string,
  width?: string,
}

export const Image: FC<ImageProps> = (props) => {
  return (
    <img
      src={props.src}
      className={props.className}
      alt=""
      onClick={props.onClick}
      draggable={props.draggable}
      style={{ height: props.height, width: props.width }}
    />
  )
}

Image.defaultProps = {
  draggable: true,
}