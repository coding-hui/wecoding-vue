import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '配置名称',
    dataIndex: 'configName',
    align: 'left',
    width: 200,
  },
  {
    title: '配置键名',
    dataIndex: 'configKey',
    align: 'left',
    width: 200,
  },
  {
    title: '配置键值',
    dataIndex: 'configValue',
    width: 100,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 100,
    format: (record) => {
      return !record ? '--' : formatToDateTime(record);
    },
  },
  {
    title: '系统内置',
    dataIndex: 'configType',
    width: 80,
    customRender: ({ record }) => {
      const configType = record.configType;
      const color = configType == 'Y' ? 'processing' : '';
      const text = configType == 'Y' ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'configName',
    label: '配置名称',
    component: 'Input',
    colProps: { md: 6, sm: 24 },
  },
  {
    field: 'configKey',
    label: '配置键名',
    component: 'Input',
    colProps: { md: 6, sm: 24 },
  },
  {
    field: 'configValue',
    label: '配置键值',
    component: 'Input',
    colProps: { md: 6, sm: 24 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'configId',
    component: 'Input',
    show: false,
  },
  {
    field: 'configName',
    label: '配置名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'configKey',
    label: '配置键名',
    component: 'Input',
    required: true,
  },
  {
    field: 'configValue',
    label: '配置键值',
    component: 'Input',
    required: true,
  },
  {
    field: 'configType',
    label: '系统内置',
    component: 'RadioButtonGroup',
    defaultValue: 'N',
    componentProps: {
      options: [
        { label: '系统内置', value: 'Y' },
        { label: '普通配置', value: 'N' },
      ],
    },
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
