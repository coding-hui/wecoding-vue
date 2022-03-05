export interface BasicPageParams {
  current: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface PageResult<T = any> {
  // 分页彩虹
  rainbow?: number[];
  // 结果集
  records: T[];
  // 第几页
  current: number;
  // 每页条数
  pageSize: number;
  // 总页数
  totalPage: number;
  // 总记录数
  total: number;
}
