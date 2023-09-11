import ReactHtmlParser from 'html-react-parser';
import { CookieModule, CookieVariable } from 'modules/cookie';

import { ELocale } from "./types";
import dictionary from 'lang/dictionary.json';

export interface Locale {
  id: number,
  key: ELocale,
  label: string,
  icon: string,
}

export const getLocales: () => Locale[] = () => [
  {
    id: 1,
    key: ELocale.ENGLISH,
    label: 'English - EN',
    icon: `/images/languages/${ELocale.ENGLISH}.png`,
  },
  {
    id: 2,
    key: ELocale.JAPAN,
    label: '日本語 - JA',
    icon: `/images/languages/${ELocale.JAPAN}.png`,
  },
];

export const setLocale = (locale: ELocale): void => {
  CookieModule.set(CookieVariable.USER_LOCALE, locale);
};

export const getLocale = (): Locale => {
  let locale: Locale;

  const fromCookie = CookieModule.get(CookieVariable.USER_LOCALE);
  const currentLocale = getLocales().find(item => item.key === fromCookie);
  if (!currentLocale) {
    const locales = getLocales();
    // locale = locales.find(v => v.key === getEnv('LOCALE_DEFAULT')) || locales[0];
    locale = locales[0];
    CookieModule.set(CookieVariable.USER_LOCALE, locale.key);
  } else {
    locale = currentLocale;
  }

  return locale;
}

export const getLocaleKey = (isUseJSFunc = false): string => isUseJSFunc ? getLocale().key.replace('_', '-') : getLocale().key

export const translate = (id: string, values?: any): any => {
  const locale: string = getLocaleKey();
  let sentence: string;

  // @ts-ignore
  if (dictionary[id] && dictionary[id][locale]) {
    // @ts-ignore
    sentence = dictionary[id][locale]
  } else {
    console.warn(`[WARNING][TRANSLATE] Miss translate | Locale: "${locale}" | id: "${id}"`);
    return `@_${id}`
  }

  // Match values
  if (typeof values === 'object') {
    Object.entries(values).map(item => {
      // @ts-ignore
      sentence = sentence.replace(new RegExp(`{${item[0]}}`, 'g'), item[1])
      return item
    })
  }

  if (/<\/?[a-z][\s\S]*>/.test(sentence)) return ReactHtmlParser(sentence);
  return sentence;
}

function getEnv(arg0: string) {
  throw new Error('Function not implemented.');
}
