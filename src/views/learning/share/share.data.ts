import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '圈子名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '圈子介绍',
    dataIndex: 'descInfo',
    align: 'left',
  },
  {
    title: '负责人',
    dataIndex: 'leaderName',
    align: 'left',
  },
  {
    title: '限制人数',
    dataIndex: 'limitUser',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '圈子名称',
    field: 'name',
    component: 'Input',
    colProps: { md: 6, sm: 24 },
  },
  {
    label: '负责人',
    field: 'leader',
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
    label: '圈子名称',
    field: 'name',
    component: 'Input',
    required: true,
  },
  {
    label: '圈子介绍',
    field: 'descInfo',
    component: 'InputTextArea',
  },
  // {
  //   label: '圈子封面',
  //   field: 'cover',
  //   component: 'Upload',
  //   componentProps: {
  //     api: uploadApi,
  //     multiple: false,
  //     emptyHidePreview: true,
  //   },
  // },
  {
    label: '限制人数',
    field: 'limitUser',
    component: 'InputNumber',
  },
];
