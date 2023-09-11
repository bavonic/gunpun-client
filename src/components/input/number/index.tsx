import { useSelector } from 'stores';
import { FC } from 'react'
import NumberFormat from 'react-number-format';
import { InputProps } from 'shared/form';

interface Props extends InputProps {
  isDisableTyping?: boolean,
  isHasPlusMinus?: boolean,
}

export const InputNumber: FC<Props> = (props) => {
  return (
    <InputNumberPure
      value={props.value}
      onChange={props.onChange}
      isDisabled={props.isDisabled}
    />
  )
}

interface IInputNumberPure {
  value: any,
  onChange: (v: any) => any,
  onTouched?: () => any,
  isDisabled?: boolean
}

export const InputNumberPure: FC<IInputNumberPure> = (props) => {
  const device = useSelector(s => s.device);
  const isLocalVN = false;
  const isIOS = device.isiPad || device.isiPhone;

  return <NumberFormat
    disabled={!!props.isDisabled}
    thousandSeparator={isLocalVN ? '.' : ','}
    decimalSeparator={isLocalVN ? ',' : '.'}
    value={props.value}
    onValueChange={({ floatValue, value }) => {
      if (!value) return props.onChange(undefined);
      const integer = value.split('.')[0] || '';
      const decimal = value.split('.')[1] || '';
      if (decimal === '000000') return props.onChange(+(`${integer}.00001`));
      if (decimal.length > 6) return props.onChange(+(`${integer}.${decimal.slice(0, 6)}`));
      return props.onChange(floatValue);
    }}
    onBlur={() => props.onTouched && props.onTouched()}
    inputMode={isIOS ? 'text' : 'numeric'}
  />
}