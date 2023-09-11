import { ObjectID, Query } from "types";


export class UserEntity {
  _id: ObjectID;
  uid: string;
  provider: UserProvider;
  email?: string;
  phone?: string;
  name?: string;
  nickname?: string;
  avatar?: string;
  password?: string;
  isEmailVerified: boolean;
  roles: UserRoles[];
  authVersion: number;
  createdAt: number;
  updatedAt: number;
}

export enum UserRoles {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UserProvider {
  ADMIN = 'admin',
  FACEBOOK = 'facebook.com',
  GOOGLE = 'google.com',
}

export class UserInfo {
  type: UserProvider;
  idType?: string;
}

export interface UserQuery extends Query {
  // Filter
  email?: string;
  name?: string;
  phone?: string;
  // Sort
  createdAt?: number,
  roles?: string | string[],
}

export interface UserSignInWithSocialPayload {
  idToken: string,
}

export interface UserSignInDefault {
  email: string,
  password: string,
}

export interface UserSignInDefaultPayload {
  name: string,
  email: string,
  password: string,
}

export interface UserChangePasswordPayload {
  oldPassword: string,
  newPassword: string,
}

export interface UserSignInResponse {
  user: UserEntity
  accessToken: string
  refreshToken: string
}

export interface UpdateUserPayload {
  nickname: string,
  avatar: string,
}
