import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { FormProps } from '/@/components/Form';
import { DictEnum } from '/@/enums/commonEnum';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const tableColumns: BasicColumn[] = [
  {
    title: t('system.dictType.name'),
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: t('system.dictType.type'),
    dataIndex: 'type',
    align: 'left',
  },
  {
    title: t('system.dictType.remark'),
    dataIndex: 'remark',
  },
  {
    title: t('system.dictType.sort'),
    dataIndex: 'sort',
    width: 100,
  },
  {
    title: t('system.dictType.status'),
    dataIndex: 'status',
    dictType: DictEnum.COMMON_STATUS,
    width: 80,
  },
  {
    title: t('system.dictType.updateTime'),
    dataIndex: 'updateTime',
    width: 150,
    align: 'left',
  },
];

export const searchForm: FormProps = {
  baseColProps: { lg: 6, md: 8 },
  labelWidth: 90,
  schemas: [
    {
      field: 'name',
      label: t('system.dictType.name'),
      component: 'Input',
    },
    {
      field: 'type',
      label: t('system.dictType.type'),
      component: 'Input',
    },
    {
      field: 'status',
      label: t('system.dictType.status'),
      component: 'Select',
      componentProps: {
        dictType: DictEnum.COMMON_STATUS,
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
    label: t('system.dictType.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'type',
    label: t('system.dictType.type'),
    component: 'Input',
    required: true,
  },
  {
    field: 'status',
    label: t('system.dictType.status'),
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      dictType: DictEnum.COMMON_STATUS,
    },
    required: true,
  },
  {
    field: 'sort',
    label: t('system.dictType.sort'),
    component: 'InputNumber',
  },
  {
    field: 'remark',
    label: t('system.dictType.remark'),
    component: 'InputTextArea',
    colProps: {
      lg: 24,
      md: 24,
    },
  },
];
