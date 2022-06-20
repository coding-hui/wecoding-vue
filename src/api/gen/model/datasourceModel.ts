import { BasicPageParams } from '/@/api/model/baseModel';

export interface GenDatasource {
  id: string;
  name: string;
  dbType: string;
  configType: string;
  url: string;
  username: string;
  password: string;
  sort: string;
  host: string;
  port: string;
  databaseName: string;
  instance: string;
  remark: string;
  createTime: string;
  createUser: string;
  updateTime: string;
  updateUser: string;
}

export interface GenDatasourceParams {
  id: string;
  name: string;
  dbType: string;
  configType: string;
  url: string;
  username: string;
  password: string;
  sort: string;
  host: string;
  port: string;
  databaseName: string;
  instance: string;
  remark: string;
  createTime: string;
  createUser: string;
  updateTime: string;
  updateUser: string;
}

export type getGenDatasourceListResultModel = GenDatasource[];

export type GenDatasourcePageParam = GenDatasourceParams & BasicPageParams;
