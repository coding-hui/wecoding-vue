import { BasicPageParams } from '/@/api/model/baseModel';

export interface Log {
  id: string;
  account: string;
  userId: string;
  clientId: string;
  ipaddr: string;
  loginLocation: string;
  browser: string;
  os: string;
  status: string;
  msg: string;
  loginTime: string;
  logoutTime: string;
  loginUuid: string;
}

export interface LogParams {
  account: string;
  userId: string;
  ipaddr: string;
  loginLocation: string;
  browser: string;
  os: string;
  status: string;
  msg: string;
  loginTime: string;
  logoutTime: string;
  loginUuid: string;
}

export type getLogListResultModel = Log[];

export type LogPageParam = LogParams & BasicPageParams;
