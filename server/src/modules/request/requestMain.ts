import Axios, { AxiosRequestConfig } from "axios";
import { getEnv } from "../../AppConfigs";
import { ObjectUtils } from "../../utils";
import { RequestError } from "./requestError";

export class RequestMain {
  static getURL(subURL: string) {
    return `${getEnv('MAIN_SERVER_PORTAL_URL')}${subURL}`
  }

  static async getConfigs(params = {}): Promise<AxiosRequestConfig> {
    let headers = {} as any;

    return {
      params: Object.assign(ObjectUtils.cleanObj(params), {}),
      timeout: 1000 * 60 * 60 * 24,
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

  static async delete(subURL: string, payload = {}) {
    const configs = await this.getConfigs();

    return Axios.delete(this.getURL(subURL), { ...configs, data: payload })
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