import { defHttp } from '/@/utils/http/axios';
import {
  getDictDataResultModel,
  getDictTypesResultModel,
  SysDictData,
  SysDictDataParams,
  SysDictType,
  SysDictTypeParams,
} from './model/dictModel';

const RootPath = '/sys/dict';

export const findDictTypeList = (params: SysDictTypeParams) => {
  return defHttp.get<getDictTypesResultModel>({ url: `${RootPath}/page`, params: params });
};

export const findDictDataList = (params: SysDictDataParams) => {
  return defHttp.get<getDictDataResultModel>({ url: `${RootPath}/data/page`, params: params });
};

export const getDictTypeById = (id: string) => {
  return defHttp.get<SysDictType>({ url: `${RootPath}/${id}` });
};

export const getDictDataById = (id: string) => {
  return defHttp.get<SysDictData>({ url: `${RootPath}/data/${id}` });
};

export const getDictDataByType = (type: string) => {
  return defHttp.get<SysDictData>({ url: `${RootPath}/data/type/${type}` });
};

export const saveOrUpdateDictType = (data: SysDictType, isUpdate: boolean) => {
  const config = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<SysDictType>(config, { successMessageMode: 'success' });
  } else {
    return defHttp.post<SysDictType>(config, { successMessageMode: 'success' });
  }
};

export const saveOrUpdateDictData = (data: SysDictData, isUpdate: boolean) => {
  const config = {
    url: `${RootPath}/data`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<SysDictData>(config, { successMessageMode: 'success' });
  } else {
    return defHttp.post<SysDictData>(config, { successMessageMode: 'success' });
  }
};

export const removeDictType = (id: string) => {
  return defHttp.delete({ url: `${RootPath}/${id}` }, { successMessageMode: 'success' });
};

export const removeDictData = (id: string) => {
  return defHttp.delete({ url: `${RootPath}/data/${id}` }, { successMessageMode: 'success' });
};

export const refreshCache = () => {
  return defHttp.delete({ url: `${RootPath}/refresh-cache` }, { successMessageMode: 'success' });
};
