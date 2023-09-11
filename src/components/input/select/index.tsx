import { FC } from "react";
import Select, { components } from "react-select";
import { ClassNames } from "shared/utils";
const { Option } = components;
interface Props {
  options: { value: any; label: string, icon?: any }[];
  fontFamily?: string;
  onChange: (value: any) => any;
  value: any;
}


export const InputSelect: FC<Props> = (props) => {
  return (
    <Select
      value={props.options.find((v) => v.value === props.value)}
      className={ClassNames({ InputSelect: true, [props.fontFamily as string]: !!props.fontFamily })}
      classNamePrefix="IS"
      options={props.options}
      onChange={(e) => {
        if (e) props.onChange(e.value);
        else props.onChange("");
      }}
      isSearchable
    />
  );
};
