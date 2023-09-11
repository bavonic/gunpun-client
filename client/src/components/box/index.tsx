import { FC, ReactNode } from "react";
import { ClassNames } from "shared/utils";

interface BoxProps {
  children: ReactNode;
  title?: string;
  className?: string;
  ref?: any;
  border?: "none" | "horizontal" | "full";
  onClick?: any;
  isFullWidth?: boolean;
  styleType?: "normal" | "boxGame";
}

export const Box: FC<BoxProps> = (props) => {
  return (
    <div
      ref={props.ref}
      className={ClassNames({
        Box: true,
        [props.styleType as string]: !!props.styleType,
        [props.className as string]: !!props.className,
        w100: !!props.isFullWidth,
        [props.border as string]: !!props.border,
      })}
      onClick={props.onClick}
    >
      {props.children}

      {props.border === "horizontal" && <div className={`border-${props.border}`}><hr /><hr /></div>}

      {/* {props.styleType === "boxGame" && <>
        <div className="conner topLeft"><Icon.Connor /></div>
        <div className="conner topRight"><Icon.Connor /></div>
        <div className="conner bottomRight"><Icon.Connor /></div>
        <div className="conner bottomLeft"><Icon.Connor /></div>
      </>} */}
    </div>
  );
};

Box.defaultProps = {
  border: "none",
  styleType: "normal",
}