import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { FormProps } from '/@/components/Form';

export const tableColumns: BasicColumn[] = [
  {
    title: '字典名称',
    dataIndex: 'name',
    align: 'left',
    width: 200,
  },
  {
    title: '字典类型',
    dataIndex: 'type',
    align: 'left',
    width: 200,
    slots: { customRender: 'Type' },
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    dictType: 'common_status',
    width: 80,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 300,
  },
];

export const searchForm: FormProps = {
  baseColProps: { lg: 6, md: 8 },
  labelWidth: 90,
  schemas: [
    {
      field: 'name',
      label: '名称',
      component: 'Input',
    },
    {
      field: 'type',
      label: '类型',
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
  ],
};

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'dictId',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '字典名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'type',
    label: '字典类型',
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
