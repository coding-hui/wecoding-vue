import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DictEnum } from '/@/enums/commonEnum';
import { useI18n } from '/@/hooks/web/useI18n';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('system.file.id'),
    dataIndex: 'id',
    align: 'left',
  },
  {
    title: t('system.file.uniqueName'),
    dataIndex: 'uniqueName',
    align: 'left',
  },
  {
    title: t('system.file.originalName'),
    dataIndex: 'originalName',
    align: 'left',
  },
  {
    title: t('system.file.fileType'),
    dataIndex: 'fileType',
    align: 'left',
  },
  {
    title: t('system.file.bizType'),
    dataIndex: 'bizType',
    align: 'left',
  },
  {
    title: t('system.file.bucket'),
    dataIndex: 'bucket',
    align: 'left',
  },
  {
    title: t('system.file.size'),
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
    title: t('system.file.storageType'),
    dataIndex: 'storageType',
    align: 'left',
    dictType: DictEnum.SYS_FILE_STORAGE_TYPE,
    width: 90,
  },
  {
    title: t('system.file.remark'),
    dataIndex: 'remark',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: t('system.file.fileType'),
    field: 'fileType',
    component: 'Input',
  },
  {
    label: t('system.file.storageType'),
    field: 'storageType',
    component: 'Select',
    componentProps: {
      dictType: 'sys_file_storage_type',
    },
  },
  {
    label: t('system.file.bucket'),
    field: 'bucket',
    component: 'Input',
  },
  {
    label: t('system.file.bizType'),
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
    label: t('system.file.storageType'),
    field: 'storageType',
    component: 'Select',
    required: true,
    componentProps: {
      dictType: DictEnum.SYS_FILE_STORAGE_TYPE,
    },
  },
  {
    label: t('system.file.bucket'),
    field: 'bucket',
    component: 'Input',
  },
  {
    label: t('system.file.bizType'),
    field: 'bizType',
    component: 'Select',
  },
  {
    label: t('system.file.fileList'),
    field: 'fileList',
    component: 'Upload',
    required: true,
    componentProps: {
      maxSize: 1,
    },
  },
  {
    label: t('system.file.remark'),
    field: 'remark',
    component: 'Input',
  },
];
