import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'name',
    align: 'left',
    width: 200,
  },
  {
    title: '负责人',
    dataIndex: 'leader',
    align: 'left',
    width: 200,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    width: 100,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
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
    field: 'deptId',
    component: 'Input',
    show: false,
  },
  {
    field: 'parentId',
    label: '父级部门',
    component: 'TreeSelect',
    ifShow: (params) => {
      return params?.values?.parentId != '0';
    },
    componentProps: {
      replaceFields: {},
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'name',
    label: '部门名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'leader',
    label: '负责人',
    component: 'Input',
  },
  {
    field: 'phone',
    label: '联系电话',
    component: 'Input',
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
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
