import { BasicColumn, FormProps } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '字典标签',
    dataIndex: 'label',
    align: 'left',
    width: 200,
    slots: { customRender: 'Label' },
  },
  {
    title: '回显样式',
    dataIndex: 'listClass',
    align: 'left',
    width: 200,
    slots: { customRender: 'ListClass' },
  },
  {
    title: '字典键值',
    dataIndex: 'value',
    align: 'left',
    width: 200,
  },
  {
    title: '字典类型',
    dataIndex: 'type',
    align: 'left',
    width: 200,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 300,
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

export const searchForm: FormProps = {
  baseColProps: { lg: 6, md: 8 },
  labelWidth: 90,
  schemas: [
    {
      field: 'label',
      label: '标签',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      field: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        dictType: 'common_status',
      },
      colProps: { span: 6 },
    },
  ],
};

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'dictCode',
    component: 'Input',
    show: false,
  },
  {
    field: 'label',
    label: '字典标签',
    component: 'Input',
    required: true,
  },
  {
    field: 'value',
    label: '字典键值',
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
  },
  {
    field: 'cssClass',
    label: '样式属性',
    component: 'Input',
  },
  {
    field: 'listClass',
    label: '回显样式',
    component: 'Select',
    slot: 'ListClass',
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
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
    colProps: { lg: 24, md: 24 },
  },
];
