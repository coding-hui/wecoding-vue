import { BasicPageParams } from '/@/api/model/baseModel';

export interface SysDept {
  deptId: string;
  parentId: string;
  ancestors: string;
  name: string;
  sort?: number;
  leader: string;
  phone?: string;
  email?: string;
  status?: string;
}

export interface SysDeptParams {
  name?: string;
  status?: string;
}

export type getDeptListResultModel = SysDept[];

export type SysDeptPageParam = SysDeptParams & BasicPageParams;
