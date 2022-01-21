import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

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
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    labelWidth: 70,
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    labelWidth: 40,
    colProps: { span: 6 },
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
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
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
      options: [
        { label: '全部数据', value: '1' },
        { label: '本部门及以下数据', value: '2' },
        { label: '本部门数据', value: '3' },
        { label: '仅本人数据', value: '4' },
        { label: '自定义数据', value: '5' },
      ],
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
