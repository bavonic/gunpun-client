import { Button } from '../button'
import { FC, useEffect, useState } from 'react'
import { ClassNames } from 'shared/utils';
import Lottie from 'lottie-react';

export interface AlertOptions {
  body?: any,
  title?: string,
  onNext?: () => any,
  nextLabel?: string,
  onClose?: () => any,
  nextIcon?: () => any,
  closeIcon?: () => any,
  closeLabel?: string,
  type?: 'NORMAL' | 'ERROR',
  render?: (onClose: () => any) => any,
}

export let OnAlert: (options: AlertOptions) => any = () => { };

export const Alert: FC = () => {
  const [animationError, setAnimationError] = useState(null);
  const [options, setOptions] = useState(null as AlertOptions | null);
  const [buttonLoading, setButtonLoading] = useState(0);
  OnAlert = (opts) => setOptions({
    ...opts,
    type: opts?.type || 'NORMAL',
    title: opts?.type === 'ERROR' && !opts.title ? ("Unsuccessful") : opts.title || 'Notification',
  })

  const fetchAni = async () => {
    try {
      const data = await fetch(`/animations/error.json`);
      const json = await data.json();
      setAnimationError(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!animationError) fetchAni();
  }, [animationError])

  useEffect(() => {
    if (options) window.document.body.style.overflow = 'hidden';
    else window.document.body.style.overflow = 'auto';

    return () => {
      window.document.body.style.overflow = 'auto';
    }
  }, [options])

  const onClose = () => {
    setOptions(null);
    setButtonLoading(0);
  }


  if (!options) return null;

  return (
    <div className={ClassNames({ Alert: true, [options.type as string]: !!options.type })}>
      <div className="box">
        {function () {
          if (options.render) return options.render(onClose)
          return <>
            {(options.type === 'ERROR' && animationError) && <Lottie
              animationData={animationError}
              autoPlay
              loop
              className="animationError"
            />}

            <div className="title fontHeadline">{options.title || ('error')}</div>
            <div className="body">
              {options.body}
            </div>

            <div className="ctas">
              <Button
                isVisible={!!options.onNext}
                isLoading={buttonLoading === 2}
                icon={<options.nextIcon />}
                onClick={async () => {
                  setButtonLoading(0);
                  if (options.onNext) await options.onNext();
                  onClose();
                }}
              >
                {options.nextLabel || 'Next'}
              </Button>

              <Button
                buttonType='grey'
                isLoading={buttonLoading === 1}
                icon={<options.closeIcon />}
                onClick={async () => {
                  setButtonLoading(1);
                  if (options.onClose) await options.onClose();
                  onClose();
                }}
              >
                {options.closeLabel || ("Close")}
              </Button>
            </div>
          </>
        }()}
      </div>
    </div>
  )
}