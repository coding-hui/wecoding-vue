import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const DB_DRIVER_CLASS = [
  {
    label: 'MySQL',
    value: 'com.mysql.cj.jdbc.Driver',
  },
  {
    label: 'postgresql',
    value: 'org.postgresql.Driver',
  },
  {
    label: 'oracle',
    value: 'oracle.jdbc.OracleDriver',
  },
];

const isJDBCUrl = (type: string) => type === '1';
const isHost = (type: string) => type === '2';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '数据库驱动类',
    dataIndex: 'dbType',
    align: 'left',
  },
  {
    title: '配置方式',
    dataIndex: 'configType',
    align: 'left',
    customRender: ({ record }) => {
      const category = record.configType;
      const abs = category === '1';
      const color = abs ? 'warning' : 'green';
      const text = abs ? 'JDBC_URL' : '服务器';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: 'JDBC_URL',
    dataIndex: 'url',
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    align: 'left',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    colProps: { md: 6, sm: 24 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    required: true,
  },
  {
    label: '类型',
    field: 'dbType',
    component: 'Select',
    componentProps: {
      options: DB_DRIVER_CLASS,
    },
    required: true,
  },
  {
    label: '账号',
    field: 'username',
    component: 'Input',
    required: true,
  },
  {
    label: '密码',
    field: 'password',
    component: 'InputPassword',
    required: true,
  },
  {
    label: '配置方式',
    field: 'configType',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: 'JDBCUrl', value: '1' },
        { label: '服务器', value: '2' },
      ],
    },
    required: true,
  },
  {
    label: 'JDBCURL',
    field: 'url',
    component: 'Input',
    ifShow: ({ values }) => isJDBCUrl(values.configType),
    required: ({ values }) => isJDBCUrl(values.configType),
  },
  {
    label: '主机',
    field: 'host',
    component: 'Input',
    ifShow: ({ values }) => isHost(values.configType),
    required: ({ values }) => isHost(values.configType),
  },
  {
    label: '端口',
    field: 'port',
    component: 'Input',
    ifShow: ({ values }) => isHost(values.configType),
    required: ({ values }) => isHost(values.configType),
  },
  {
    label: '数据库',
    field: 'databaseName',
    component: 'Input',
    ifShow: ({ values }) => isHost(values.configType),
    required: ({ values }) => isHost(values.configType),
  },
  {
    label: '实例',
    field: 'instance',
    component: 'Input',
    ifShow: ({ values }) => isHost(values.configType),
    required: ({ values }) => isHost(values.configType),
  },
  {
    label: '排序',
    field: 'sort',
    component: 'InputNumber',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
];
