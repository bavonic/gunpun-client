import { FC } from 'react';

interface FlexProps {
  children?: any,
  className?: string,
  /****** Container Props ********/
  flexDirection?: 'row' | 'column',
  justifyContent?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'initial'
  | 'inherit',
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse',
  alignItems?:
  | 'stretch'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'baseline'
  | 'initial'
  | 'inherit',
  /****** Child Props ********/
  flexGrow?: number,
  flexShrink?: number,
  flexBasis?: number,
  flex?: string,
  /****** Common Layout Props ********/
  padding?: string,
  margin?: string,
  width?: string,
  height?: string,
  maxWidth?: string,
  maxHeight?: string,
  gap?: string | number,
}

export const Flex: FC<FlexProps> = (props) => {

  return (
    <div
      className={props.className}
      style={{
        display: 'flex',
        justifyContent: props.justifyContent || 'flex-start',
        flexDirection: props.flexDirection || 'row',
        flexGrow: props.flexGrow || 0,
        flexBasis: props.flexBasis || 'auto',
        flexShrink: props.flexShrink || 1,
        flexWrap: props.flexWrap || 'nowrap',
        flex: props.flex || '0 1 auto',
        alignItems: props.alignItems || 'stretch',
        margin: props.margin || '0',
        padding: props.padding || '0',
        width: props.width || 'auto',
        height: props.height || 'auto',
        maxWidth: props.maxWidth || 'none',
        gap: props.gap || 0,
      }}
    >
      {props.children || ''}
    </div>
  )
}
