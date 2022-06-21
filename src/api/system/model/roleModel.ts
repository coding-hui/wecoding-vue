import { BasicPageParams } from '/@/api/model/baseModel';

export interface SysRole {
  roleId: string;
  name: string;
  code: string;
  sort: number;
  dataScopeType?: string;
  status?: string;
  remark?: string;
  menuCheckStrictly: boolean;
  deptCheckStrictly: boolean;
}

export interface SysRoleParams {
  name: string;
  code: string;
}

export type getRoleListResultModel = SysRole[];

export type SysRolePageParam = SysRoleParams & BasicPageParams;
