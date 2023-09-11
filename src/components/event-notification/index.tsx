import { FC, useEffect, useState } from 'react';

interface EventNotificationProps {
  text: string,
  timeOut?: number,
}

export let ShowEventNotification: (state: EventNotificationProps) => any = (state) => state;
export const EventNotification: FC = () => {
  const [isShow, setIsShow] = useState(false)
  const [content, setContext] = useState('')
  const [timeOutEvent, setTimeOutEvent] = useState(0)

  ShowEventNotification = (state) => {
    setIsShow(true)
    setContext(state.text)
    setTimeOutEvent(state.timeOut || 0)
  }

  useEffect(() => {
    if (!!timeOutEvent) {
      let timeout = setTimeout(() => {
        setIsShow(false)

      }, timeOutEvent)
      return () => {
        clearTimeout(timeout)
      }
    }

  }, [isShow])

  if (!isShow) return null

  return (
    <div className="EventNotification">
      <div className="content">
        <div className='wrapperText'>
          <p className="text fontHeadline">
            {content}
          </p>
        </div>
      </div>
    </div>
  )
}
