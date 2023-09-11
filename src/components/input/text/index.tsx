import { FC } from 'react'
import { InputProps } from 'shared/form'

interface Props extends InputProps {
  placeholder?: string,
  onBlur?: (value: any) => void
  type?: string
}

export const InputText: FC<Props> = ({ onChange, value, placeholder, isDisabled, type }) => {
  return (
    <input
      type={type}
      onChange={e => onChange(e.target.value)}
      value={value === null ? undefined : value}
      placeholder={placeholder}
      disabled={isDisabled}
    />
  )
}

InputText.defaultProps = {
  type: 'text',
}