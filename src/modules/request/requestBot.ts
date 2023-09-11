import Axios, { AxiosRequestConfig } from 'axios';
import { RequestError } from './requestError';
import { ObjectUtils } from 'shared/utils';
import { CookieVariable } from 'modules/cookie';

export class RequestBotService {
  static getURL(subURL: string) {
    return `https://mangamon-greedy-production-k63qe6pefa-as.a.run.app/v1/trader${subURL}`
  }

  static async getConfigs(params = {}): Promise<AxiosRequestConfig> {
    let headers = {};

    if (typeof window !== 'undefined') {
      const accessToken = sessionStorage.getItem(CookieVariable.USER_ACCESS_TOKEN);
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`
    }

    return {
      params: Object.assign(ObjectUtils.cleanObj(params), {}),
      timeout: 100000,
      headers,
    }
  }

  static async get(subURL: string, params = {}) {
    const configs = await this.getConfigs(params);
    return Axios.get(this.getURL(subURL), configs)
      .then(res => res.data)
      .catch(err => { throw new RequestError(err) });
  }

  static async post(subURL: string, payload = {}) {
    const configs = await this.getConfigs();
    return Axios.post(this.getURL(subURL), ObjectUtils.cleanObj(payload), configs)
      .then(res => res.data)
      .catch(err => { throw new RequestError(err) });
  }

  static async put(subURL: string, payload = {}) {
    const configs = await this.getConfigs();
    return Axios.put(this.getURL(subURL), ObjectUtils.cleanObj(payload), configs)
      .then(res => res.data)
      .catch(err => { throw new RequestError(err) });
  }

  static async patch(subURL: string, payload = {}) {
    const configs = await this.getConfigs();
    return Axios.patch(this.getURL(subURL), ObjectUtils.cleanObj(payload), configs)
      .then(res => res.data)
      .catch(err => { throw new RequestError(err) });
  }

  static async delete(subURL: string) {
    const configs = await this.getConfigs();
    return Axios.delete(this.getURL(subURL), configs)
      .then(res => res.data)
      .catch(err => { throw new RequestError(err) });
  }
}