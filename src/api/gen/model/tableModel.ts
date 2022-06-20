import { BasicPageParams } from '/@/api/model/baseModel';

export interface GenTable {
  tableId: string;
  tableName: string;
  tableComment: string;
  subTableName: string;
  autoRemovePrefix: string;
  subTableFkName: string;
  className: string;
  generateTemplate: string;
  packageName: string;
  moduleName: string;
  businessName: string;
  functionName: string;
  authorName: string;
  generateType: string;
  generatePath: string;
  options: string;
  remark: string;
  createTime: string;
  createUser: string;
  updateTime: string;
  updateUser: string;
  columns: [];
}

export interface GenTableInfo {
  tableInfo: GenTable;
  rows: [];
  tables: [];
}

export interface GenTableParams {
  tableId: string;
  tableName: string;
  tableComment: string;
  subTableName: string;
  autoRemovePrefix: string;
  subTableFkName: string;
  className: string;
  generateTemplate: string;
  packageName: string;
  moduleName: string;
  businessName: string;
  functionName: string;
  authorName: string;
  generateType: string;
  generatePath: string;
  options: string;
  remark: string;
  createTime: string;
  createUser: string;
  updateTime: string;
  updateUser: string;
}

export interface ImportGenTableParams {
  tables: any[];
  dsName: string;
  dsId: string;
}

export type getGenTableListResultModel = GenTable[];

export type GenTablePageParam = GenTableParams & BasicPageParams;
