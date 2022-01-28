import { defHttp } from '/@/utils/http/axios';
import {
  getGenTableListResultModel,
  GenTable,
  GenTablePageParam,
  ImportGenTableParams,
  GenTableInfo,
} from './model/tableModel';

const RootPath = '/gen/table';

export const findGenTableList = (params: GenTablePageParam) => {
  return defHttp.get<getGenTableListResultModel>({ url: `${RootPath}/page`, params: params });
};

export const findDbTableList = (params: GenTablePageParam) => {
  return defHttp.get<getGenTableListResultModel>({ url: `${RootPath}/db/page`, params: params });
};

export const getGenTableByKey = (key: string) => {
  return defHttp.get<GenTable>({ url: `${RootPath}/${key}` });
};

export const getGenTableById = (id: string) => {
  return defHttp.get<GenTableInfo>({ url: `${RootPath}/${id}` });
};

export const importDbTable = (data: ImportGenTableParams) => {
  const params = {
    url: `${RootPath}/import/tables`,
    data: data,
  };
  return defHttp.post<GenTable>(params, { successMessageMode: 'success' });
};

export const updateGenTable = (data) => {
  const genTable = {
    url: `${RootPath}`,
    data: data,
  };
  return defHttp.put<GenTable>(genTable, { successMessageMode: 'success' });
};

export const removeGenTable = (id: string) => {
  return defHttp.delete({ url: `${RootPath}/${id}` }, { successMessageMode: 'success' });
};

export const preview = (id: string) => {
  return defHttp.get({ url: `${RootPath}/preview/${id}` });
};

export const download = (tableName: string) => {
  return defHttp.get(
    { url: `${RootPath}/download/${tableName}`, responseType: 'blob' },
    { successMessageMode: 'success', isReturnNativeResponse: true },
  );
};

export const genCode = (tableName: string) => {
  return defHttp.get(
    { url: `${RootPath}/gen-code/${tableName}` },
    { successMessageMode: 'success' },
  );
};

export const syncDb = (tableName: string) => {
  return defHttp.get(
    { url: `${RootPath}/sync-db/${tableName}` },
    { successMessageMode: 'success' },
  );
};
