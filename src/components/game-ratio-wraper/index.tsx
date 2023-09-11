import { FC, memo, useEffect, useRef } from 'react'
import { ClassNames } from 'shared/utils';
import { isMobile } from 'react-device-detect';

export const GameRatioWraper: FC<{ children: any, sizeFixed?: boolean }> = memo((props) => {
  const ref = useRef(null);
  const mainRef = useRef(null);
  const contentRef = useRef(null);

  const handle = () => {
    if (isMobile) {
      const mainEl = mainRef.current! as HTMLDivElement;
      mainEl.style.width = `${document.body.clientHeight}px`;
      mainEl.style.height = `${document.body.clientWidth}px`;

      const elContent = contentRef.current! as HTMLCanvasElement;
      elContent.style.width = `100%`;
      elContent.style.height = `100%`;

    } else {
      const el = ref.current! as HTMLCanvasElement;
      const elContent = contentRef.current! as HTMLCanvasElement;
      elContent.style.width = `${el.clientWidth}px`;
      elContent.style.height = `${el.clientHeight}px`;
    }
  }

  useEffect(() => {
    const win = window as Window;
    win.document.body.style.overflow = 'hidden';
    handle();
    win.addEventListener('resize', handle)

    return () => {
      win.document.body.style.overflow = 'auto';
      win.removeEventListener('resize', handle);
    }
  }, [])

  return (
    <div className={ClassNames({ GameRatioWraper: true, sizeFixed: props.sizeFixed })} ref={mainRef}>
      <canvas
        ref={ref}
        width={2400}
        height={1350}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          margin: '0 auto'
        }}
      />
      <div ref={contentRef} className="wraper">
        <div className="content">
          {props.children}
        </div>
      </div>
    </div>
  )
})