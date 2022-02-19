import { BasicPageParams } from '/@/api/model/baseModel';

export interface Share {
  id: string;
  name: string;
  descInfo: string;
  leader: string;
  cover: string;
  limitUser: string;
  deleted: string;
}

export interface ShareParams {
  name: string;
  leader: string;
}

export type getShareListResultModel = Share[];

export type SharePageParam = ShareParams & BasicPageParams;
