import { BasicPageParams } from '/@/api/model/baseModel';

export interface SysConfig {
  configId: string;
  configName: string;
  configKey: string;
  configValue: string;
  configType?: number;
  remark: string;
}

export interface SysConfigParams {
  configName: string;
  configValue: string;
}

export type getConfigListResultModel = SysConfig[];

export type SysConfigPageParam = SysConfigParams & BasicPageParams;
