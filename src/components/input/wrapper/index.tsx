import { FC } from "react";

import { ClassNames } from "shared/utils";
import { InputProps, InputWrapperProps } from 'shared/form';
import { translate } from "language";

export const InputWrapper: FC<InputWrapperProps> = (props) => {
  const { inputProps, component: Component, className, render, icon } = props;
  const {
    fieldName,
    label,
    isDisabled,
    isMutilLocale,
    isVisible,
    isRequired,
    value,
    onChange,
    error,
    locales,
    description,
    props: exProps,
    onTouch,
  } = inputProps;

  if (!isVisible) return null

  return (
    <div className={ClassNames({
      InputWrapper: true,
      hasMutilLocale: isMutilLocale,
      disabled: isDisabled,
      [className as string]: !!className
    })}>
      <label htmlFor={fieldName}>
        {label} {!isRequired && <span className="tagOptional">- {translate("optional")}</span>}
      </label>

      {!!description && <>
        <span className="description">
          {description}
        </span>
      </>}

      {(() => {
        if (isMutilLocale && locales) {
          return locales.map((locale, localeIndex) => {
            const errorMessage = typeof error === 'object' && error[locale.key];
            return (
              <div
                key={localeIndex}
                className={ClassNames({
                  inputSection: true,
                  hasError: !!errorMessage
                })}
              >
                <div className="input">
                  <div className="locale">
                    <div className="name">{locale.label}</div>
                  </div>
                  <div>
                    {function () {
                      const inputProps: InputProps = {
                        isDisabled,
                        value: value[locale.key],
                        onTouch,
                        onChange: (newValue) => onChange({ ...value, [locale.key]: newValue }),
                        ...exProps
                      }

                      if (render) return render(inputProps)
                      if (Component) return <Component {...inputProps} />
                    }()}
                  </div>
                </div>
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
              </div>
            )
          })
        }

        const errorMessage = error;

        return <div className={ClassNames({ inputSection: true, hasError: !!errorMessage })}>
          <div className="input">
            {function () {
              const inputProps: InputProps = {
                isDisabled,
                value,
                onChange: onChange,
                onTouch,
                ...exProps
              }

              if (render) return render(inputProps)
              if (Component) return <Component {...inputProps} />
            }()}
          </div>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </div>
      })()}
    </div>
  )
}