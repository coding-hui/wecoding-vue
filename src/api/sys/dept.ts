import { defHttp } from '/@/utils/http/axios';
import { getDeptListResultModel, SysDept, SysDeptPageParam } from './model/deptModel';

const RootPath = '/sys/dept';

export const findDeptList = (params: SysDeptPageParam) => {
  return defHttp.get<getDeptListResultModel>({ url: `${RootPath}/tree`, params: params });
};

export const findDeptTreeSelect = () => {
  return defHttp.get({ url: `${RootPath}/tree-select` });
};

export const getDeptById = (deptId: string) => {
  return defHttp.get<SysDept>({ url: `${RootPath}/${deptId}` });
};

export const saveOrUpdateDept = (data: SysDept, isUpdate: boolean) => {
  const config = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<SysDept>(config, { successMessageMode: 'success' });
  } else {
    return defHttp.post<SysDept>(config, { successMessageMode: 'success' });
  }
};

export const removeDept = (deptId: string) => {
  return defHttp.delete({ url: `${RootPath}/${deptId}` }, { successMessageMode: 'success' });
};
