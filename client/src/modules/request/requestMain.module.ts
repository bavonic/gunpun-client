import Axios, { AxiosRequestConfig } from 'axios';
import { AccessTokenModule } from 'modules/account';
import { ObjectUtils } from 'shared/utils';
import { RequestError } from './requestError';
import { getConfig as getAppConfigs } from 'modules/configs/context';

export class RequestMainModule {
  static getURL(subURL: string) {
    return `${getAppConfigs('URL_SERVER_MAIN')}${subURL}`
  }

  static async getConfigs(params = {}): Promise<AxiosRequestConfig> {
    let headers = {};

    if (typeof window !== 'undefined') {
      const accessToken = AccessTokenModule.get();
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
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
    console.log(this.getURL(subURL))
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

  static async uploadMedia(file: File, limitSize?: number) {
    const configs = await this.getConfigs();
    const formData = new FormData();
    formData.append("file", file);
    if (limitSize) formData.append("limitWitdh", limitSize.toString());

    return Axios.post(this.getURL("/media/upload"), formData, {
      ...configs,
      headers: {
        ...configs.headers,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => res.data.url)
      .catch(err => { throw new RequestError(err) });
  }
}