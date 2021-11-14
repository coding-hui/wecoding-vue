import type { RouteMeta } from 'vue-router';

export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

export interface SysMenu {
  parentId: string;
  name: string;
  code: string;
  type: string;
  icon?: string;
  router: string;
  component?: string;
  permission?: string;
  openType?: string;
  visible: boolean;
  frame?: boolean;
  link?: string;
  redirect?: string;
  sort?: number;
  cached?: boolean;
}

/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = RouteItem[];
