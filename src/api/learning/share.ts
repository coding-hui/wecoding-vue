import { defHttp } from '/@/utils/http/axios';
import { Share, SharePageParam, getShareListResultModel } from './model/shareModel';

const RootPath = '/learning/share';

export const findShareList = (params: SharePageParam) => {
  return defHttp.get<getShareListResultModel>({ url: `${RootPath}/page`, params: params });
};

export const getShareById = (id: string) => {
  return defHttp.get<Share>({ url: `${RootPath}/${id}` });
};

export const saveOrUpdateShare = (data: Share, isUpdate: boolean) => {
  const Share = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<Share>(Share, { successMessageMode: 'success' });
  } else {
    return defHttp.post<Share>(Share, { successMessageMode: 'success' });
  }
};

export function removeShare(id: string) {
  return defHttp.delete({ url: `${RootPath}/${id}` }, { successMessageMode: 'success' });
}
