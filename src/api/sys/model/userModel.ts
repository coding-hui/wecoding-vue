import { BasicPageParams } from '/@/api/model/baseModel';

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
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface SysUser {
  userId: string;
  deptId: string;
  account: string;
  password: string;
  nickName: string;
  realName: string;
  avatar: string;
  birthday: string;
  sex: number;
  email: string;
  phone: string;
  telephone: string;
  lastLoginIp: string;
  lastLoginTime: string;
  userType: string;
  status: string;
}

export interface SysUserParams {
  deptId: string;
  realName: string;
  nickName: string;
}

export type getUserListResultModel = SysUser[];

export type SysUserPageParam = SysUserParams & BasicPageParams;
