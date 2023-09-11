import { parseCookies, setCookie } from "nookies";
import { CookieVariable } from "./cookie.types";

export class CookieModule {
  static context = null;

  static setContext(newContext: any) {
    this.context = newContext;
  }

  static convertName(name: CookieVariable) {
    return `gunpun_${name}`;
  }

  static get(name: CookieVariable): string {
    const isServer = typeof window === 'undefined';

    if (!isServer) {
      // ======================= From Client Side =======================
      const value = '; ' + document.cookie;
      const parts: any = value.split('; ' + this.convertName(name) + '=');
      if (parts.length == 2) {
        return parts.pop().split(';').shift() || '';
      } else return ''
    } else {
      // ======================= From Server Side =======================
      const cookies = parseCookies(this.context);
      return cookies[this.convertName(name)] || '';
    }
  }

  static set(name: CookieVariable, value: string, options = {}) {
    const ONE_DAY = 86400;
    const cookieOptions = {
      maxAge: ONE_DAY * 120,
      path: '/',
      ...options
    }
    setCookie(this.context, this.convertName(name), value, cookieOptions);
  }

  static remove(name: CookieVariable) {
    this.set(name, '');
  }
}