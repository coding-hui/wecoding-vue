import { defHttp } from '/@/utils/http/axios';
import {
  Message,
  MessagePageParam,
  getMessageListResultModel,
  ReadMessageParams,
} from './model/messageModel';

const RootPath = '/message';

export const findMessageList = (params: MessagePageParam) => {
  return defHttp.get<getMessageListResultModel>({ url: `${RootPath}/page`, params: params });
};

export const findUserMessageList = (params: MessagePageParam) => {
  return defHttp.get<getMessageListResultModel>({ url: `${RootPath}/user/page`, params: params });
};

export const getMessageById = (id: string) => {
  return defHttp.get<Message>({ url: `${RootPath}/${id}` });
};

export const readMessage = (data: ReadMessageParams) => {
  return defHttp.post<Message>({ url: `${RootPath}/user/read`, data: data });
};

export const saveOrUpdateMessage = (data: Message, isUpdate: boolean) => {
  const Message = {
    url: `${RootPath}`,
    data: data,
  };
  if (isUpdate) {
    return defHttp.put<Message>(Message, { successMessageMode: 'success' });
  } else {
    return defHttp.post<Message>(Message, { successMessageMode: 'success' });
  }
};

export function removeMessage(id: string) {
  return defHttp.delete({ url: `${RootPath}/${id}` }, { successMessageMode: 'success' });
}
