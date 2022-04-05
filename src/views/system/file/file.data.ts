import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '唯一文件名',
    dataIndex: 'uniqueName',
    align: 'left',
  },
  {
    title: '原始文件名',
    dataIndex: 'originalName',
    align: 'left',
  },
  {
    title: '文件类型',
    dataIndex: 'fileType',
    align: 'left',
    width: 80,
  },
  {
    title: '文件内容类型',
    dataIndex: 'contentType',
    align: 'left',
  },
  {
    title: '业务类型',
    dataIndex: 'bizType',
    align: 'left',
    width: 90,
  },
  {
    title: '文件仓库',
    dataIndex: 'bucket',
    align: 'left',
    width: 90,
  },
  {
    title: '文件大小',
    dataIndex: 'size',
    align: 'left',
    width: 90,
    customRender: ({ record }) => {
      let { size } = record;
      size = Number(size / 1024).toFixed(2);
      return h('div', size + 'KB');
    },
  },
  {
    title: '存储类型',
    dataIndex: 'storageType',
    align: 'left',
    dictType: 'sys_file_storage_type',
    width: 90,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'left',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '文件类型',
    field: 'fileType',
    component: 'Input',
  },
  {
    label: '存储类型',
    field: 'storageType',
    component: 'Select',
    componentProps: {
      dictType: 'sys_file_storage_type',
    },
  },
  {
    label: '文件仓库',
    field: 'bucket',
    component: 'Input',
  },
  {
    label: '业务类型',
    field: 'bizType',
    component: 'Input',
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
    label: '存储类型',
    field: 'storageType',
    component: 'Select',
    required: true,
    componentProps: {
      dictType: 'sys_file_storage_type',
    },
  },
  {
    label: '文件仓库',
    field: 'bucket',
    component: 'Input',
  },
  {
    label: '业务类型',
    field: 'bizType',
    component: 'Select',
  },
  {
    label: '文件',
    field: 'fileList',
    component: 'Upload',
    required: true,
    componentProps: {
      maxSize: 1,
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
];
