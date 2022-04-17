import { BasicPageParams } from '/@/api/model/baseModel';
import { UserInfo } from '/#/store';

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
  scope: string;
  license: string;
  userId: string | number;
  username: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export type GetUserInfoModel = UserInfo;

export interface SysUser {
  userId: string;
  deptId: string;
  account: string;
  password: string;
  nickName: string;
  realName: string;
  avatar: string;
  birthday: string;
  gender: string;
  email: string;
  phone: string;
  telephone: string;
  lastLoginIp: string;
  lastLoginTime: string;
  userType: string;
  status: string;
}

export interface SysUserParams {
  userId?: string;
  deptId?: string;
  realName?: string;
  nickName?: string;
  roleIds?: string[];
}

export type getUserListResultModel = SysUser[];

export type SysUserPageParam = SysUserParams & BasicPageParams;
