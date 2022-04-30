import { BasicPageParams, PageResult } from '/@/api/model/baseModel';

export interface File {
  id?: string;
  fileType?: string;
  storageType?: string;
  bucket?: string;
  path?: string;
  url?: string;
  uniqueName?: string;
  originalName?: string;
  suffix?: string;
  size?: string;
  md5?: string;
  contentType?: string;
  bizType?: string;
  remark?: string;
  createTime?: string;
  createUser?: string;
  updateTime?: string;
  updateUser?: string;
}

export interface FileParams {
  id?: string;
  fileType?: string;
  storageType?: string;
  bucket?: string;
  path?: string;
  url?: string;
  uniqueName?: string;
  originalName?: string;
  suffix?: string;
  size?: string;
  md5?: string;
  contentType?: string;
  bizType?: string;
}

export interface UploadApiResult {
  errorCode: number;
  errorMessage: string;
  success: boolean;
  result: {
    filename: string;
    url: string;
  };
}

export type getFileListResultModel = PageResult<File>;

export type FilePageParam = FileParams & BasicPageParams;
