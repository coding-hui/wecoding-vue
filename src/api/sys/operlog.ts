import { defHttp } from '/@/utils/http/axios';
import { getLogListResultModel, SysLog, SysLogPageParam } from './model/logModel';

const RootPath = '/sys/log';

/**
 * @description: Get user Log based on id
 */
export const findLogList = (params: SysLogPageParam) => {
  return defHttp.get<getLogListResultModel>({ url: `${RootPath}/page`, params: params });
};

/**
 * @description: Get Log Detail
 */
export const getLogById = (logId: number) => {
  return defHttp.get<SysLog>({ url: `${RootPath}/${logId}` });
};

/**
 * @description: Save Log
 */
export const saveOrUpdateLog = (data: SysLog, isUpdate: boolean) => {
  const config = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<SysLog>(config, { successMessageMode: 'success' });
  } else {
    return defHttp.post<SysLog>(config, { successMessageMode: 'success' });
  }
};

/**
 * @description: Remove Log
 */
export const removeLog = (logId: number) => {
  return defHttp.delete({ url: `${RootPath}/${logId}` }, { successMessageMode: 'success' });
};

/**
 * @description: clean Log
 */
export const cleanLog = () => {
  return defHttp.delete({ url: `${RootPath}/clean` }, { successMessageMode: 'success' });
};
