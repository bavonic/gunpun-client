import { useSounds } from "sounds";
import { Button } from "components";
import { FC, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

interface ModalMatchResultState {
  isWin: boolean,
  rewardPoint?: number,
  onBack: () => any,
}

export let OnModalMatchResult: (state: ModalMatchResultState) => any = () => true;
export const ModalMatchResult: FC = () => {
  const sounds = useSounds();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(null as ModalMatchResultState | null);
  const nodeRef = useRef(null);

  OnModalMatchResult = (s) => {
    setState(s);
    setIsOpen(true);
    if (s.isWin) {

    } else sounds.play('end_defeat');
  }

  if (!state) return null;

  const close = async () => {
    setIsOpen(false);
  }

  return (
    <div className="ModalMatchResult">
      <CSSTransition
        in={isOpen}
        nodeRef={nodeRef}
        timeout={300}
        unmountOnExit
        classNames="ModalTransition"
        onExited={() => {
          state.onBack();
          setState(null);
        }}
      >
        <div className="wraper" ref={nodeRef}>
          <div className="content">
            {state.isWin ? (
              <img src="/images/match-result/victory.png" />
            ) : (
              <img src="/images/match-result/defeat.png" />
            )}

            <div className="ctas">
              {state.isWin ?
                <Button async onClick={close}>Okey!</Button>
                : <Button async onClick={close} buttonType="blue" >Back</Button>}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
