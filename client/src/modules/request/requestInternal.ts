import Axios, { AxiosRequestConfig } from 'axios';

import { RequestError } from './requestError';
import { ObjectUtils } from 'shared/utils';

export class RequestInternalService {
  static getURL(subURL: string) { return `/api${subURL}` }

  static async getConfigs(params = {}): Promise<AxiosRequestConfig> {
    return {
      params: Object.assign(ObjectUtils.cleanObj(params), {}),
      timeout: 20000,
      headers: {
        // "Authorization": `Bearer ${getUserAddress()}`
      }
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

  static async delete(subURL: string) {
    const configs = await this.getConfigs();
    return Axios.delete(this.getURL(subURL), configs)
      .then(res => res.data)
      .catch(err => { throw new RequestError(err) });
  }
}