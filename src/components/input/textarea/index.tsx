import { FC } from 'react'
import { InputProps } from 'shared/form'

export const InputTextArea: FC<InputProps> = ({ onChange, value }) => {
  return (
    <textarea
      onChange={e => onChange(e.target.value)}
      value={value}
    />
  )
}