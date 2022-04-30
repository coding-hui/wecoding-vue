import { defHttp } from '/@/utils/http/axios';
import { Log, LogPageParam, getLogListResultModel } from './model/loginLogModel';

const RootPath = '/sys/login-log';

export const findLogList = (params: LogPageParam) => {
  return defHttp.get<getLogListResultModel>({ url: `${RootPath}/page`, params: params });
};

export const getLogById = (id: string) => {
  return defHttp.get<Log>({ url: `${RootPath}/${id}` });
};

export const saveOrUpdateLog = (data: Log, isUpdate: boolean) => {
  const Log = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<Log>(Log, { successMessageMode: 'success' });
  } else {
    return defHttp.post<Log>(Log, { successMessageMode: 'success' });
  }
};

export function removeLog(id: string) {
  return defHttp.delete({ url: `${RootPath}/${id}` }, { successMessageMode: 'success' });
}

export const cleanLog = () => {
  return defHttp.delete({ url: `${RootPath}/clean` }, { successMessageMode: 'success' });
};
