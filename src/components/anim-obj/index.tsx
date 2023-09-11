import { FC, useEffect, useRef, useState } from "react";

export type AnimObjType = 'loop' | 'forward'

export interface AnimObjProps {
  name: string,
  numberOfFrames: number,
  cssLink: string,
  zeroPad?: number,
  speed?: number,
  className?: string,
  onEnd?: Function,
}

export const AnimObj: FC<AnimObjProps> = (props) => {
  let interval: NodeJS.Timer, link: HTMLLinkElement;
  const { numberOfFrames, name, zeroPad, cssLink, speed } = props;
  const [dataFrames] = useState(new Array(numberOfFrames).fill(0).map((_, key) => `${name}_${key.toString().padStart(zeroPad!, '0')}`).toString());
  const id = `_${props.name}`;
  const ref = useRef<HTMLDivElement>(null);
  const type: AnimObjType = props.onEnd ? 'forward' : 'loop';

  useEffect(() => {
    try {
      if (!link) {
        link = document.createElement('link');
        link.id = `link_${id}`;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = cssLink;
        link.media = 'all';
        window.document.head.appendChild(link);
      }

      const cssClass = props.className ? props.className : 'animation';
      const frameSpeed = speed || 100;

      if (interval) clearInterval(interval);
      interval = setInterval(function () {
        try {
          const el = ref.current as any;
          const frames = el.getAttribute("data-frames").split(",");
          let frame = +el.getAttribute("data-frame") || 0;
          frame = (++frame) % frames.length;
          el.setAttribute("data-frame", frame.toString());
          el.className = cssClass + ' ' + frames[frame]

          if (type === 'forward' && frame === props.numberOfFrames - 1) {
            clearInterval(interval);
            if (props.onEnd) props.onEnd();
          }
        } catch (error) {
          clearInterval(interval);
        }
      }, frameSpeed);

      return () => {
        clearInterval(interval);
        window.document.head.removeChild(link);
      }
    } catch (error) {
      console.error(`Cannot start animation: ${name}`)
    }
  }, [props])

  return <div
    ref={ref} id={id}
    data-frames={dataFrames}
  />
}

AnimObj.defaultProps = {
  zeroPad: 5,
}