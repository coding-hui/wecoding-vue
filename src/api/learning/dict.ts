import { defHttp } from '/@/utils/http/axios';
import { Dict, DictPageParam, getDictListResultModel } from './model/dictModel';

const RootPath = '/learning/dict';

export const findDictList = (params: DictPageParam) => {
  return defHttp.get<getDictListResultModel>({ url: `${RootPath}/page`, params: params });
};

export const getDictById = (id: string) => {
  return defHttp.get<Dict>({ url: `${RootPath}/${id}` });
};

export const saveOrUpdateDict = (data: Dict, isUpdate: boolean) => {
  const Dict = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<Dict>(Dict, { successMessageMode: 'success' });
  } else {
    return defHttp.post<Dict>(Dict, { successMessageMode: 'success' });
  }
};

export function removeDict(id: string) {
  return defHttp.delete({ url: `${RootPath}/${id}` }, { successMessageMode: 'success' });
}
