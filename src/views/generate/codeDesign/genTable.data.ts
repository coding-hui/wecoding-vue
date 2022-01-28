import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '数据源',
    dataIndex: 'dsName',
    align: 'left',
    customRender: ({ record }) => {
      return h(Tag, { color: 'success' }, () => record.dsName);
    },
  },
  {
    title: '物理表名',
    dataIndex: 'tableName',
    align: 'left',
    customRender: ({ record }) => {
      return h(Tag, { color: 'processing' }, () => record.tableName);
    },
  },
  {
    title: '表描述',
    dataIndex: 'tableComment',
    align: 'left',
  },
  {
    title: '实体类名称',
    dataIndex: 'className',
    align: 'left',
  },
  {
    title: '生成方式',
    dataIndex: 'generateType',
    align: 'left',
    customRender: ({ record }) => {
      const generateType = record.generateType;
      const zip = generateType === '1';
      const color = zip ? 'warning' : 'green';
      const text = zip ? 'zip' : '自定义路径';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '版本',
    dataIndex: 'version',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '表名称',
    field: 'tableName',
    component: 'Input',
    colProps: { md: 6, sm: 24 },
  },
  {
    label: '表描述',
    field: 'tableComment',
    component: 'Input',
    colProps: { md: 6, sm: 24 },
  },
];

export const tableColumns: BasicColumn[] = [
  {
    title: '物理表名',
    dataIndex: 'tableName',
    align: 'left',
    customRender: ({ record }) => {
      return h(Tag, { color: 'processing' }, () => record.tableName);
    },
  },
  {
    title: '表描述',
    dataIndex: 'tableComment',
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'left',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'left',
  },
];

export const tableSearchFormSchema: FormSchema[] = [
  {
    label: '数据源',
    field: 'dsName',
    component: 'Input',
    slot: 'dsSelect',
    colProps: { md: 8, sm: 24 },
  },
  {
    label: '表名称',
    field: 'tableName',
    component: 'Input',
    colProps: { md: 8, sm: 24 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'tableId',
    component: 'Input',
    show: false,
  },
  {
    label: '数据源',
    field: 'datasource',
    component: 'Input',
    slot: 'datasource',
    required: true,
    span: 24,
  },
];
