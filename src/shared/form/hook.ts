import { useFormik } from "formik";
import { ObjectUtils } from "../utils";
import { FormConfigs, FormInputProps, FormState, FormValues, FormField, Locale } from "./types";

export function useForm<Fields extends FormValues>(configs: FormConfigs<Fields>): FormState<Fields> {
  const { fields, onSubmit } = configs;
  const locales: Locale[] = configs.locales || [{ key: 'en_US', label: 'ENG' }];
  const translate = (msg: string) => configs.translate ? configs.translate(msg) : msg;

  const validateRequired = (value: any): any => {
    if (
      (typeof value === 'undefined')
      || (typeof value === 'number' && value === 0)
      || (typeof value === 'string' && value === '')
      || (Array.isArray(value) && !value.length)
    ) {
      return 'Must be provided';
    }
  }

  const initialValues = Object.keys(fields).reduce((output: any, fieldName: string) => {
    const defaultValue = fields[fieldName].defaultValue;

    // Mutil locale field
    if (fields[fieldName].isMutilLocale) {
      output[fieldName] = locales.reduce((output: any, item) => {
        output[item.key] = defaultValue && defaultValue[item.key] ? defaultValue[item.key] : '';
        return output;
      }, {});
    }

    // Normal field
    else output[fieldName] = defaultValue || '';

    return output;
  }, {});

  const validate = (currentValues: any) => {
    const errors = Object.keys(fields).reduce((output: any, fieldName: string) => {
      const field = fields[fieldName] as FormField;
      const currentValue = currentValues[fieldName];

      let error: string | void | { [locale: string]: any; };

      // Handle required case
      if (field.isRequired) {
        // Mutil locale
        if (field.isMutilLocale) {
          error = ObjectUtils.cleanObj(locales.reduce((output: any, item) => {
            output[item.key] = validateRequired(currentValue[item.key]);
            return output;
          }, {}));

        } else {
          // One locale
          error = validateRequired(currentValue);
        }
      }

      // Handle validate function
      if (!error && field.validate) error = field.validate(currentValue, currentValues);
      if (!!error) output[fieldName] = error;
      return output;
    }, {});

    return errors;
  }

  const formik = useFormik({
    enableReinitialize: !!configs.enableReinitialize,
    initialValues,
    validate,
    onSubmit: async (values, formikHelpers) => {
      try {
        await onSubmit({ values, formikHelpers })
      } catch (error: any) {
        console.error(error);
        if (typeof error !== 'object') return;
        if (typeof error.errors !== 'object') return;
        return formikHelpers.setErrors(error.errors);
      }
    }
  });

  const errors = validate(formik.values);

  const inputProps = Object.keys(fields).reduce((output: any, fieldName: string) => {
    const structureItem = fields[fieldName];
    const inputPropsItem: FormInputProps = {
      fieldName,
      label: structureItem.label || fieldName,
      description: structureItem.description || '',
      isDisabled: formik.isSubmitting || structureItem.isDisabled || false,
      isVisible: structureItem.isVisible || true,
      isRequired: !!structureItem.isRequired,
      isMutilLocale: structureItem.isMutilLocale || false,
      value: formik.values[fieldName],
      onChange: (newValue: any) => {
        if (!formik.isSubmitting && !structureItem.isDisabled) {
          formik.setFieldValue(fieldName, newValue);
        }
        formik.setFieldTouched(fieldName, true);
      },
      error: formik.touched[fieldName] && errors[fieldName],
      props: structureItem.props,
      onTouch: () => {
        if (!formik.touched[fieldName]) setTimeout(() => {
          formik.setFieldTouched(fieldName, true)
        }, 100);
      },
      locales,
    }
    output[fieldName] = inputPropsItem;
    return output;
  }, {})


  const handleSubmit = async (e: any) => {
    if (e) e.preventDefault();
    if (!formik.isSubmitting) {
      // Set all field touched
      // formikState.setTouched();
      // console.log(Object.keys(configs.fields).reduce((output: any, key: string) => {
      //   output[key] = true;
      //   return output;
      // }) as any);

      // Handle Submit
      formik.handleSubmit();
    }
  }

  return {
    isSubmitting: formik.isSubmitting,
    values: formik.values,
    inputProps,
    handleSubmit,
    formikHelpers: formik
  }
}