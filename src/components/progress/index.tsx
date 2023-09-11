import { FC } from 'react';
import { ClassNames } from 'shared/utils';

interface ProgressBarProps {
  value: number
  label?: string
}

export const ProgressBar: FC<ProgressBarProps> = ({ value, label }) => {
  const isHaftPercent = value >= 48

  return (
    <div className="progress-bar">
      <span className="progress-bar__text">{label || 'Loading...'}</span>
      <div className='progress-bar__process' style={{ width: `${Math.ceil(value)}%` }} />
      <span className={ClassNames({ [`progress-bar__percent${isHaftPercent ? '--dark' : ''}`]: true })}>
        {Math.ceil(value)}%
        
      </span>
    </div>
  )
}
