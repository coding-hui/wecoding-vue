import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DictEnum } from '/@/enums/commonEnum';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('system.role.name'),
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: t('system.role.code'),
    dataIndex: 'code',
    width: 200,
    align: 'left',
  },
  {
    title: t('system.role.sort'),
    dataIndex: 'sort',
    width: 50,
  },
  {
    title: t('system.role.createUser'),
    dataIndex: 'createUser',
    width: 100,
  },
  {
    title: t('system.role.status'),
    dataIndex: 'status',
    width: 80,
    dictType: DictEnum.COMMON_STATUS,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('system.role.name'),
    component: 'Input',
  },
  {
    field: 'code',
    label: t('system.role.code'),
    component: 'Input',
  },
  {
    field: 'status',
    label: t('system.role.status'),
    component: 'Select',
    componentProps: {
      dictType: DictEnum.COMMON_STATUS,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'roleId',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('system.role.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'code',
    label: t('system.role.code'),
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: t('system.role.sort'),
    component: 'InputNumber',
  },
  {
    field: 'status',
    label: t('system.role.status'),
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      dictType: DictEnum.COMMON_STATUS,
    },
    required: true,
  },
  {
    field: 'remark',
    label: t('system.role.remark'),
    component: 'InputTextArea',
    colProps: {
      lg: 24,
      md: 24,
    },
  },
];

export const roleMenuFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'roleId',
    component: 'Input',
    show: false,
  },
  {
    field: 'menuCheckStrictly',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('system.role.name'),
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'grantMenuIdList',
    label: '',
    component: 'Input',
    slot: 'menu',
  },
];

export const roleDeptFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'roleId',
    component: 'Input',
    show: false,
  },
  {
    field: 'deptCheckStrictly',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('system.role.name'),
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'dataScopeType',
    label: t('system.role.dataScopeType'),
    component: 'Select',
    componentProps: {
      dictType: DictEnum.DATA_SCOPE_TYPE,
    },
    required: true,
  },
  {
    field: 'grantDeptIdList',
    label: '',
    component: 'Input',
    slot: 'data',
    ifShow: (record) => {
      return record.values.dataScopeType === '5';
    },
  },
];
