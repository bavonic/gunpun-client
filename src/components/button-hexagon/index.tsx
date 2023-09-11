import React, { CSSProperties, FC, PropsWithChildren, SyntheticEvent, useState } from 'react';
import { ClassNames } from 'shared/utils';

export type TButtonStyleType = 'primary' | 'blue';
export type TButtonType = 'button' | 'submit' | 'reset';

export interface IButtonProps {
  isVisible?: boolean,
  onClick?: any,
  isMiddle?: boolean,
  style?: CSSProperties,
  type?: TButtonType,
  buttonType?: TButtonStyleType,
  isLoading?: boolean,
  className?: string,
  disabled?: boolean,
  icon?: React.ReactNode,
  async?: boolean,
  iconPos?: 'left' | 'right',
  isFreeze?: boolean,
}

const Wrapper: any = (props: any) => {
  if (props.isMiddle) return <div className="Button_Hexagon_Wrapper_Middle">
    {props.children}
  </div>
  return props.children
}

export const ButtonHexagon: FC<PropsWithChildren<IButtonProps>> = (props) => {
  const {
    async, isVisible, type, onClick,
    isMiddle, style, buttonType, isLoading, className, disabled, icon
  } = props;

  const iconPos = props.iconPos || 'left';

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const loading = isButtonLoading || isLoading;

  const buttonClassName = ClassNames({
    ButtonHexagon: true,
    middle: isMiddle,
    loading: !!loading,
    [buttonType as string]: !!buttonType,
    [className as string]: !!className,
    iconRight: iconPos === 'right',
  })

  const handleClick = async (e?: SyntheticEvent) => {
    if (isButtonLoading || disabled) return;
    if (e) e.preventDefault();
    if (async && typeof isLoading !== 'boolean') setIsButtonLoading(true);
    await onClick();
    if (async && typeof isLoading !== 'boolean') setIsButtonLoading(false);
  }

  if (!isVisible) return null

  let btnStyle: CSSProperties = {
    ...style,
  }

  return (
    <Wrapper isMiddle={isMiddle}>
      {(props.isFreeze && props.isLoading) && <div className="freeze" />}
      {(() => {
        if (onClick) return <button disabled={disabled} style={btnStyle} type={type} className={buttonClassName} onClick={handleClick}>
          {icon && iconPos === 'left' ? icon : null}
          <span className="label fontHeadline">
            {props.children}
          </span>
          {icon && iconPos === 'right' ? icon : null}

          {loading ? <div className="iconLoading">
            <div className="IconLoading"></div>
          </div> : null}
          <div className={ClassNames({ [buttonType as string]: !!buttonType })} />
        </button>

        return <button disabled={disabled} style={btnStyle} type={type} className={buttonClassName}>
          {icon && iconPos === 'left' ? icon : null}
          <span className="label fontHeadline">
            {props.children}
          </span>
          {icon && iconPos === 'right' ? icon : null}

          {loading ? <div className="iconLoading">
            <div className="IconLoading"></div>
          </div> : null}
          <div className={ClassNames({ [buttonType as string]: !!buttonType })} />
        </button>
      })()}

    </Wrapper>
  )
}

ButtonHexagon.defaultProps = {
  isVisible: true,
  isMiddle: false,
  type: 'button',
  buttonType: 'blue',
}