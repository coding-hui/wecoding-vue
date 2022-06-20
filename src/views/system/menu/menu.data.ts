import { BasicColumn, FormSchema } from '/@/components/Table';
import { DictEnum } from '/@/enums/commonEnum';
import { useI18n } from '/@/hooks/web/useI18n';
import { Icon } from '/@/components/Icon';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('system.menu.name'),
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: t('system.menu.code'),
    dataIndex: 'code',
    width: 200,
    align: 'left',
  },
  {
    title: t('system.menu.icon'),
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: t('system.menu.type'),
    dataIndex: 'type',
    width: 80,
    dictType: DictEnum.MENU_TYPE,
  },
  {
    title: t('system.menu.permission'),
    dataIndex: 'permission',
    align: 'left',
  },
  {
    title: t('system.menu.component'),
    dataIndex: 'component',
    align: 'left',
  },
  {
    title: t('system.menu.sort'),
    dataIndex: 'sort',
    width: 50,
  },
  {
    title: t('system.menu.status'),
    dataIndex: 'status',
    width: 80,
    dictType: DictEnum.COMMON_STATUS,
  },
];

export const isDir = (type: string) => type === '0';
export const isMenu = (type: string) => type === '1';
export const isButton = (type: string) => type === '2';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('system.menu.name'),
    component: 'Input',
  },
  {
    field: 'code',
    label: t('system.menu.code'),
    component: 'Input',
  },
  {
    field: 'status',
    label: t('system.menu.status'),
    component: 'Select',
    componentProps: {
      dictType: DictEnum.COMMON_STATUS,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'menuId',
    component: 'Input',
    show: false,
  },
  {
    field: 'type',
    label: t('system.menu.type'),
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      dictType: DictEnum.MENU_TYPE,
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'parentId',
    label: t('system.menu.parentId'),
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'name',
    label: t('system.menu.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'code',
    label: t('system.menu.code'),
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: t('system.menu.sort'),
    component: 'InputNumber',
  },
  {
    field: 'icon',
    label: t('system.menu.icon'),
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'router',
    label: t('system.menu.router'),
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: t('system.menu.component'),
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'permission',
    label: t('system.menu.permission'),
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'status',
    label: t('system.menu.status'),
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      dictType: DictEnum.COMMON_STATUS,
    },
  },
  {
    field: 'cached',
    label: t('system.menu.cached'),
    component: 'RadioGroup',
    defaultValue: 'Y',
    componentProps: {
      dictType: DictEnum.YES_OR_NO,
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'visible',
    label: t('system.menu.visible'),
    component: 'RadioGroup',
    componentProps: {
      dictType: DictEnum.YES_OR_NO,
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
];
