import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  getUserListResultModel,
  SysUserPageParam,
  SysUser,
  SysUserParams,
} from './model/userModel';
import { ErrorMessageMode } from '/#/axios';

const RootPath = '/sys/user';

enum Api {
  Login = '/auth/token',
  Logout = '/auth/logout',
  GetUserInfo = '/sys/user/login-info',
  GetPermCode = '/sys/menu/permissions',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      data: {
        account: params.account,
        password: params.password,
        grantType: 'password',
        scope: 'all',
      },
    },
    {
      errorMessageMode: mode,
      withToken: false,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'message' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.delete({ url: Api.Logout });
}

export const findUserList = (params: SysUserPageParam) => {
  return defHttp.get<getUserListResultModel>({ url: `${RootPath}/page`, params: params });
};

export const getUserById = (id: string) => {
  return defHttp.get<SysUser>({ url: `${RootPath}/${id}` });
};

export const saveOrUpdateUser = (data: SysUser, isUpdate: boolean) => {
  const config = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<SysUser>(config, { successMessageMode: 'success' });
  } else {
    return defHttp.post<SysUser>(config, { successMessageMode: 'success' });
  }
};

export const removeUser = (id: string) => {
  return defHttp.delete({ url: `${RootPath}/${id}` }, { successMessageMode: 'success' });
};

export const grantRole = (data: SysUserParams) => {
  const config = {
    url: `${RootPath}/grant-role`,
    data: data,
  };
  return defHttp.post(config, { successMessageMode: 'success' });
};

export const ownRole = (id: string) => {
  return defHttp.get({ url: `${RootPath}/own-role/${id}` });
};
