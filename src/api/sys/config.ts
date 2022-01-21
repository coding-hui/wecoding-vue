import { defHttp } from '/@/utils/http/axios';
import { getConfigListResultModel, SysConfig, SysConfigPageParam } from './model/configModel';

const RootPath = '/sys/config';

export const findConfigList = (params: SysConfigPageParam) => {
  return defHttp.get<getConfigListResultModel>({ url: `${RootPath}/page`, params: params });
};

export const getConfigByKey = (key: string) => {
  return defHttp.get<SysConfig>({ url: `${RootPath}/${key}` });
};

export const getConfigById = (configId: string) => {
  return defHttp.get<SysConfig>({ url: `${RootPath}/${configId}` });
};

export const saveOrUpdateConfig = (data: SysConfig, isUpdate: boolean) => {
  const config = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<SysConfig>(config, { successMessageMode: 'success' });
  } else {
    return defHttp.post<SysConfig>(config, { successMessageMode: 'success' });
  }
};

export const removeConfig = (id: string) => {
  return defHttp.delete({ url: `${RootPath}/${id}` }, { successMessageMode: 'success' });
};
