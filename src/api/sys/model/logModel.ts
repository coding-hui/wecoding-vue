import { BasicPageParams } from '/@/api/model/baseModel';

export interface SysLog {
  id: string;
  traceId: string;
  type: string;
  title: string;
  ip?: string;
  location: string;
  userAgent?: string;
  requestUri?: string;
  requestMethod?: string;
  params: string;
  time?: number;
  exception?: string;
  serviceId?: string;
  method?: string;
  businessType?: string;
}

export interface SysLogParams {
  name: string;
  code: string;
}

export type getLogListResultModel = SysLog[];

export type SysLogPageParam = SysLogParams & BasicPageParams;
