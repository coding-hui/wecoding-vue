import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel, SysMenu, SysMenuParams } from './model/menuModel';

const RootPath = '/sys/menu';

/**
 * @description: Get user routers
 */
export const findRouterList = () => {
  return defHttp.get<getMenuListResultModel>({ url: `${RootPath}/routers` });
};

/**
 * @description: Get user menu treeselect
 */
export const findMenuSelect = (params?: SysMenuParams) => {
  return defHttp.get<getMenuListResultModel>({ url: `${RootPath}/tree-select`, params: params });
};

/**
 * @description: Get user menu based on id
 */
export const findMenuList = (params?: SysMenuParams) => {
  return defHttp.get<getMenuListResultModel>({ url: `${RootPath}/tree`, params: params });
};

/**
 * @description: Get Menu Detail
 */
export const getMenuById = (menuId: number) => {
  return defHttp.get<SysMenu>({ url: `${RootPath}/${menuId}` });
};

/**
 * @description: Save Menu
 */
export const saveOrUpdateMenu = (data: SysMenu, isUpdate: boolean) => {
  const config = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<SysMenu>(config, { successMessageMode: 'success' });
  } else {
    return defHttp.post<SysMenu>(config, { successMessageMode: 'success' });
  }
};

/**
 * @description: Remove Menu
 */
export const removeMenu = (menuId: number) => {
  return defHttp.delete({ url: `${RootPath}/${menuId}` }, { successMessageMode: 'success' });
};
