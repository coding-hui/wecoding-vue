import { BasicPageParams } from '/@/api/model/baseModel';

export interface SysDictType {
  dictId: string;
  name: string;
  type: string;
  sort: string;
  status?: string;
  remark: string;
}

export interface SysDictData {
  dictCode: string;
  type: string;
  sort: string;
  label: string;
  value?: string;
  defaultValue: string;
  status?: string;
  remark: string;
}

export interface SysDictTypeParams {
  label: string;
  type: string;
}

export interface SysDictDataParams {
  label: string;
  type: string;
}

export type getDictTypesResultModel = SysDictType[];
export type getDictDataResultModel = SysDictData[];

export type SysDictTypePageParam = SysDictTypeParams & BasicPageParams;
export type SysDictDataPageParam = SysDictDataParams & BasicPageParams;
