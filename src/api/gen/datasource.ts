import { defHttp } from '/@/utils/http/axios';
import {
  getGenDatasourceListResultModel,
  GenDatasource,
  GenDatasourceParams,
  GenDatasourcePageParam,
} from './model/datasourceModel';

const RootPath = '/gen/datasource';

export const findGenDatasourceList = (params: GenDatasourcePageParam) => {
  return defHttp.get<getGenDatasourceListResultModel>({ url: `${RootPath}/page`, params: params });
};

export const findGenDatasourceOptions = (params?: GenDatasourceParams) => {
  return defHttp.get({ url: `${RootPath}/options`, params: params });
};

export const getGenDatasourceByKey = (key: string) => {
  return defHttp.get<GenDatasource>({ url: `${RootPath}/${key}` });
};

export const getGenDatasourceById = (id: string) => {
  return defHttp.get<GenDatasource>({ url: `${RootPath}/${id}` });
};

export const saveOrUpdateGenDatasource = (data: GenDatasource, isUpdate: boolean) => {
  const genDatasource = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<GenDatasource>(genDatasource, { successMessageMode: 'success' });
  } else {
    return defHttp.post<GenDatasource>(genDatasource, { successMessageMode: 'success' });
  }
};

export const removeGenDatasource = (id: string) => {
  return defHttp.delete({ url: `${RootPath}/${id}` }, { successMessageMode: 'success' });
};
