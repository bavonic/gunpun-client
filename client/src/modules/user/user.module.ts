import { RequestMainModule } from "modules/request";
import { UpdateUserPayload, UserEntity, UserRoles, UserSignInResponse, UserSignInWithSocialPayload } from "./user.types";

export class UserModule {
  static async auth(): Promise<UserEntity> {
    return RequestMainModule.get(`/users/auth`);
  }

  static async signInSocial(payload: UserSignInWithSocialPayload): Promise<UserSignInResponse> {
    return RequestMainModule.post(`/users/sign-in/social`, payload);
  }

  static async updateRoles(uid: string, roles: UserRoles[]) {
    return RequestMainModule.put(`/users/roles`, { uid, roles })
  }

  static getRoleLabel(role: UserRoles) {
    if (role === UserRoles.ADMIN) return 'Admin';
    return 'User';
  }

  static checkRole(requiredRole: UserRoles, userRoles: UserRoles[]) {
    if (userRoles.includes(UserRoles.ADMIN)) return true;
    return userRoles.includes(requiredRole);
  }

  static async remove(uid: string) {
    return RequestMainModule.delete(`/users/${uid}`)
  }

  static async update(payload: UpdateUserPayload): Promise<UserEntity> {
    return RequestMainModule.put(`/users/update`, payload)
  }
}