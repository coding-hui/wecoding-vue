import { defHttp } from '/@/utils/http/axios';
import { getRoleListResultModel, SysRole, SysRolePageParam } from './model/roleModel';

const RootPath = '/sys/role';

/**
 * @description: Get user Role based on id
 */
export const findRoleList = (params: SysRolePageParam) => {
  return defHttp.get<getRoleListResultModel>({ url: `${RootPath}/page`, params: params });
};

/**
 * @description: Get Role Detail
 */
export const getRoleById = (roleId: number) => {
  return defHttp.get<SysRole>({ url: `${RootPath}/${roleId}` });
};

/**
 * @description: Save Role
 */
export const saveOrUpdateRole = (data: SysRole, isUpdate: boolean) => {
  const config = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<SysRole>(config, { successMessageMode: 'success' });
  } else {
    return defHttp.post<SysRole>(config, { successMessageMode: 'success' });
  }
};

/**
 * @description: Remove Role
 */
export const removeRole = (roleId: number) => {
  return defHttp.delete({ url: `${RootPath}/${roleId}` }, { successMessageMode: 'success' });
};
