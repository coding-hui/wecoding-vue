import { BasicPageParams, PageResult } from '/@/api/model/baseModel';

export interface Message {
  id: string;
  title: string;
  content: string;
  sendUserId: string;
  sendUserAccount: string;
  sendRealName: string;
  receiveUserCount: string;
  messageType: string;
  readCount: string;
  messageId: string;
  receiveUserId: string;
  receiveUserAccount: string;
  receiveRealName: string;
  readed: string;
  readTime: string;
}

export interface MessageParams {
  title: string;
  content: string;
  sendUserAccount: string;
  messageType: string;
}

export interface ReadMessageParams {
  userId: string | number;
  messageId?: string;
  messageIds?: string[];
}

export type getMessageListResultModel = PageResult<Message>;

export type MessagePageParam = MessageParams & BasicPageParams;
