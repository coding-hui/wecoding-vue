import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '模块名称',
    dataIndex: 'title',
    align: 'left',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    align: 'left',
  },
  {
    title: '浏览器',
    dataIndex: 'userAgent',
  },
  {
    title: 'URI',
    dataIndex: 'requestUri',
  },
  {
    title: '操作方式',
    dataIndex: 'requestMethod',
  },
  {
    title: '执行时间',
    dataIndex: 'time',
  },
  {
    title: '业务类型',
    dataIndex: 'businessType',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '状态',
    dataIndex: 'type',
    width: 80,
    customRender: ({ record }) => {
      const status = record.type;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '成功' : '失败';
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '模块名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '业务类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '操作编号',
    field: 'id',
    component: 'Input',
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
