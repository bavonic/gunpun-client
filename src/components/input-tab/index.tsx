import { FC, useState } from 'react';
import { ClassNames } from 'shared/utils';

export interface TabProps {
  value: any,
  label: string,
  color?: string,
}

interface InputTabProps {
  tabs: TabProps[],
  value: any
  onChange: (value: any) => void,
}

export const InputTab: FC<InputTabProps> = ({ tabs, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  return (
    <div className="InputTab">
      {tabs.map((item, key) => {
        const isActive = inputValue === item.value;
        return <div
          className={ClassNames({ item: true, active: isActive, fontHeadline: true })}
          key={key}
          style={isActive ? { backgroundColor: item.color } : {}}
          onClick={() => (setInputValue(item.value), onChange(item.value))}
        >
          {item.label}
        </div>
      })}
    </div>
  )
}
