import { getGImage } from 'game-assets';
import { FC, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import { ClassNames } from 'shared/utils';

interface IWithModalWrapperSettings<T> {
  title?: string,
  className?: string,
  center?: boolean,
  bind: (configs: ContentProps<T>) => void,
}

interface ContentProps<T> {
  offModal: () => any,
  onModal: (data?: any, title?: string) => any,
  state: T,
  setTitle: (title: string) => any,
}

export function withModalWrapper<T>(configs: IWithModalWrapperSettings<T>) {
  return (Component: FC<ContentProps<T>>) => (props: any) => {
    const [state, setState] = useState({ data: null, id: null } as { id: any, data: any });
    const [isActive, setIsActive] = useState(false);
    const nodeRef = useRef(null);
    const [title, setTitle] = useState(configs.title || { label: "Title", icon: null });

    const offModal = () => setState({ data: null, id: null });
    const onModal = (data?: any, title?: string) => {
      setState({ data, id: `${Date.now()}` });
      if (title) setTitle(title);
      setTimeout(() => setIsActive(true), 1);
    };

    useEffect(() => {
      configs.bind({ offModal, onModal, state: state.data, setTitle });
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      if (state.id) {
        window.document.body.style.overflow = 'hidden';
      } else {
        window.document.body.style.overflow = 'auto';
      }

      return () => {
        window.document.body.style.overflow = 'auto';
      }
    }, [state.id])

    if (!state.id) return null

    return <div
      id={state.id}
      className={ClassNames({
        Modal: true,
        [`${configs.className}`]: !!configs.className
      })}
      onClick={(e: any) => e.target.id === state.id && setIsActive(false)}
    >
      <CSSTransition
        in={isActive}
        nodeRef={nodeRef}
        timeout={200}
        unmountOnExit
        classNames="ModalTransition"
        onExited={() => offModal()}
      >
        <div className={ClassNames({ ['modal-wrapper']: true, center: !!configs.center })} ref={nodeRef}>
          <div className="head">
            <div className='title'>
              <h1>
                {function () {
                  if (typeof title === "string") return title
                  return <>
                    {title.label}
                  </>
                }()}
              </h1>
            </div>
            <div className="btn-close" onClick={() => setIsActive(false)}>
              <img src={'/game/assets/icons/ic-x.png'} alt="" />
            </div>
          </div>

          <div className="body">
            <Component
              {...props}
              state={state.data}
              offModal={offModal}
              onModal={onModal}
              setTitle={setTitle}
            />
          </div>
        </div>
      </CSSTransition>
    </div>
  }
}