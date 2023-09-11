import Axios, { AxiosRequestConfig } from "axios";
import { ObjectUtils } from "shared/utils";
import { RequestError } from "./requestError";
import { getConfig } from "modules/configs/context";

export class RequestGameModule {
  static getURL(subURL: string) {
    return `${getConfig('URL_SERVER_GAME')}${subURL}`
  }

  static async getConfigs(params = {}): Promise<AxiosRequestConfig> {
    let headers = {} as any;

    headers['Access-Control-Allow-Origin'] = '*';

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

  static async post(subURL: string, payload = {}, headers?: any) {
    const configs = await this.getConfigs();
    if (headers) configs.headers = { ...configs.headers, ...headers }

    return Axios.post(this.getURL(subURL), ObjectUtils.cleanObj(payload), configs)
      .then(res => res.data)
      .catch(err => { throw new RequestError(err) });
  }
}