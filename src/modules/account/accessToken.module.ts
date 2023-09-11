import { decodeJwt } from 'jose';
import { ENV } from 'modules/configs/context';

export class AccessTokenModule {
  static getKeyOfLocalStorageTokens = () => {
    return `${ENV}_gunpun_tks`;
  }

  static save = (accessToken: string) => {
    localStorage.setItem(this.getKeyOfLocalStorageTokens(), accessToken);
  }

  static remove = () => {
    localStorage.removeItem(this.getKeyOfLocalStorageTokens())
  }

  static get = () => {
    return localStorage.getItem(this.getKeyOfLocalStorageTokens())
  }
}