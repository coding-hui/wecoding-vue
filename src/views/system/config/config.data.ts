import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
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
    dictType: 'yes_or_no',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'configName',
    label: '配置名称',
    component: 'Input',
  },
  {
    field: 'configKey',
    label: '配置键名',
    component: 'Input',
  },
  {
    field: 'configValue',
    label: '配置键值',
    component: 'Input',
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
      dictType: 'yes_or_no',
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
