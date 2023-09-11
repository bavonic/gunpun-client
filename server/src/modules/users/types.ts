export class UserEntity {
  _id: any;
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

export enum UserProvider {
  ADMIN = 'admin',
  FACEBOOK = 'facebook.com',
  GOOGLE = 'google.com',
}

export enum UserRoles {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  POST_ADMIN = 'POST_ADMIN',
}