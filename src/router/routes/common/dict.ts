import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

export const DICT_DATA_ROUTE: AppRouteModule = {
  path: '/system/dict-data',
  name: 'DictData',
  component: LAYOUT,
  redirect: '/system/dict-data/:type',
  meta: {
    title: 'DictData',
    hideBreadcrumb: true,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: ':type',
      name: 'DictDataList',
      props: (route) => ({
        type: route.params.type,
        name: route.query.name,
      }),
      component: () => import('/@/views/system/dict/DictData.vue'),
      meta: {
        title: '字典项',
        hideBreadcrumb: true,
        currentActiveMenu: '/system/dict',
      },
    },
  ],
};
