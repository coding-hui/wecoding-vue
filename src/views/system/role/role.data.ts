import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '编码',
    dataIndex: 'code',
    width: 200,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 50,
  },
  {
    title: '创建者',
    dataIndex: 'createUser',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    dictType: 'common_status',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      dictType: 'common_status',
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
    label: '角色名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'code',
    label: '角色编码',
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      dictType: 'common_status',
    },
    required: true,
  },
  {
    field: 'remark',
    label: '备注',
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
    label: '是否关联显示',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '角色名称',
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
    label: '是否关联显示',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'dataScopeType',
    label: '数据范围类型',
    component: 'Select',
    componentProps: {
      dictType: 'data_scope_type',
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
