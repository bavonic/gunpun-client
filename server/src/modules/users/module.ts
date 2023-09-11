import axios from 'axios';
import { getEnv } from "../../AppConfigs";
import { UserEntity } from "./types";

export class UserModule {
  static async auth(accessToken: string) {
    const response = await axios.get(`${getEnv('MAIN_SERVER_PORTAL_URL')}/users/auth`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return response.data as UserEntity;
  }

  static async getById(userId: string) {
    const response = await axios.get(`${getEnv('MAIN_SERVER_PORTAL_URL')}/users/id/${userId}`)
    return response.data as UserEntity;
  }
}