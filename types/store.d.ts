import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
import { RoleInfo } from '/@/api/sys/model/userModel';

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface UserInfo {
  // 主页路径
  homePath?: string;
  // 角色列表
  roles: RoleInfo[];
  // 用户id
  userId: string;
  // 用户名
  account: string;
  // 部门id
  deptId: string;
  // 真实名字
  realName: string;
  // 昵称
  nickName: string;
  // 头像
  avatar: string;
  // 生日
  birthday: string;
  // 性别(字典 1男 2女 3未知)
  sex: string;
  // 邮箱
  email: string;
  // 手机
  phone: string;
  // 电话
  telephone: string;
  // 最后登陆IP
  lastLoginIp: string;
  // 最后登陆时间
  lastLoginTime: string;
  // 用户类型（1超级管理员 6非管理员）
  userType: string;
  // 状态（字典 0正常 1锁定）
  status: string;
  // 最后登陆地址
  loginLocation: string;
  // 最后登陆所用浏览器
  lastLoginBrowser: string;
  // 最后登陆所用系统
  lastLoginOs: string;
  // 已经注册天数
  registerDay?: number;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
