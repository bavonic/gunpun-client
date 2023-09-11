import { FormikHelpers } from "formik";
import { FC } from "react";

export interface Locale {
  key: string,
  label: string,
}

export type FormFieldValidate = (currentValue: any, fieldValues: any) => string | { [locale: string]: any } | void;

export interface FormField {
  label?: any,
  description?: string,
  isDisabled?: boolean,
  isVisible?: boolean,
  isRequired?: boolean,
  defaultValue?: any,
  isMutilLocale?: boolean,
  validate?: FormFieldValidate,
  props?: any,
}

export interface FormValues {
  [fieldName: string]: FormField;
}

export interface FormInputProps {
  label: any,
  value: any,
  onChange: (newValue: any) => void,
  fieldName?: string,
  description?: string,
  isDisabled?: boolean,
  isVisible?: boolean,
  isRequired?: boolean,
  isMutilLocale?: boolean,
  locales?: Locale[],
  error?: any,
  onTouch?: () => void,
  props?: any
}

export interface FormOnSubmitArgs<Fields> {
  values: { [K in keyof Fields]: any },
  formikHelpers: FormikHelpers<any>
}


export interface FormConfigs<Fields> {
  fields: Fields,
  onSubmit: (args: FormOnSubmitArgs<Fields>) => void | Promise<any>
  enableReinitialize?: boolean,
  locales?: Locale[],
  translate?: (message: string) => string,
}

export interface FormState<Fields> {
  values: { [K in keyof Fields]: any },
  inputProps: { [K in keyof Fields]: FormInputProps },
  isSubmitting: boolean,
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void,
  formikHelpers: FormikHelpers<any>,
}

export interface InputWrapperProps {
  inputProps: FormInputProps,
  className?: string,
  icon?: React.ReactNode,
  component?: FC<InputProps>,
  render?: (props: InputProps) => any,
}

export interface InputProps {
  value: any,
  onChange: (newValue: any) => void,
  isDisabled?: boolean,
  onTouch?: () => void,
}