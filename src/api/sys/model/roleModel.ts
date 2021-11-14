import { BasicPageParams } from '/@/api/model/baseModel';

export interface SysRole {
  parentId: string;
  name: string;
  code: string;
  type: string;
  icon?: string;
  router: string;
  component?: string;
  permission?: string;
  openType?: string;
  visible: boolean;
  frame?: boolean;
  link?: string;
  redirect?: string;
  sort?: number;
  cached?: boolean;
}

export interface SysRoleParams {
  name: string;
  code: string;
}

export type getRoleListResultModel = SysRole[];

export type SysRolePageParam = SysRoleParams & BasicPageParams;
