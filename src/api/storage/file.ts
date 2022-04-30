import { defHttp } from '/@/utils/http/axios';
import {
  File,
  FileParams,
  FilePageParam,
  UploadApiResult,
  getFileListResultModel,
} from './model/fileModel';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const RootPath = '/file';
const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}

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
