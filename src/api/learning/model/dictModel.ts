import { BasicPageParams } from '/@/api/model/baseModel';

export interface Dict {
  id: string;
  word: string;
  sw: string;
  phonetic: string;
  definition: string;
  translation: string;
  pos: string;
  collins: string;
  oxford: string;
  tag: string;
  bnc: string;
  frq: string;
  exchange: string;
  detail: string;
  audio: string;
}

export interface DictParams {
  word: string;
  tag: string;
}

export type getDictListResultModel = Dict[];

export type DictPageParam = DictParams & BasicPageParams;
