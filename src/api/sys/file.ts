import { defHttp } from '/@/utils/http/axios';
import { File, FilePageParam, FileParams, getFileListResultModel } from './model/fileModel';

const RootPath = '/sys/file';

export const findFileList = (params: FilePageParam) => {
  return defHttp.get<getFileListResultModel>({ url: `${RootPath}/page`, params: params });
};

export const getFileById = (id: string) => {
  return defHttp.get<File>({ url: `${RootPath}/${id}` });
};

export const saveOrUpdateFile = (data: File, isUpdate: boolean) => {
  const File = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<File>(File, { successMessageMode: 'success' });
  } else {
    return defHttp.post<File>(File, { successMessageMode: 'success' });
  }
};

export function removeFile(id: string) {
  return defHttp.delete({ url: `${RootPath}/${id}` }, { successMessageMode: 'success' });
}

export function downloadFile(params: FileParams) {
  return defHttp.get(
    { url: `${RootPath}/download`, params: params, responseType: 'blob' },
    { isReturnNativeResponse: true },
  );
}
