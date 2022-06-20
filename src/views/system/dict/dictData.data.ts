import { BasicColumn, FormProps } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DictEnum } from '/@/enums/commonEnum';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('system.dictData.label'),
    dataIndex: 'label',
    align: 'left',
  },
  {
    title: t('system.dictData.listClass'),
    dataIndex: 'listClass',
    align: 'left',
  },
  {
    title: t('system.dictData.value'),
    dataIndex: 'value',
    align: 'left',
  },
  {
    title: t('system.dictData.type'),
    dataIndex: 'type',
    align: 'left',
  },
  {
    title: t('system.dictData.remark'),
    dataIndex: 'remark',
  },
  {
    title: t('system.dictData.sort'),
    dataIndex: 'sort',
    width: 100,
  },
  {
    title: t('system.dictData.status'),
    dataIndex: 'status',
    width: 80,
    dictType: DictEnum.COMMON_STATUS,
  },
];

export const searchForm: FormProps = {
  baseColProps: { lg: 6, md: 8 },
  labelWidth: 90,
  schemas: [
    {
      field: 'label',
      label: t('system.dictData.label'),
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      field: 'status',
      label: t('system.dictData.status'),
      component: 'Select',
      componentProps: {
        dictType: DictEnum.COMMON_STATUS,
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
    label: t('system.dictData.label'),
    component: 'Input',
    required: true,
  },
  {
    field: 'value',
    label: t('system.dictData.value'),
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: t('system.dictData.sort'),
    component: 'InputNumber',
  },
  {
    field: 'cssClass',
    label: t('system.dictData.cssClass'),
    component: 'Input',
  },
  {
    field: 'listClass',
    label: t('system.dictData.listClass'),
    component: 'Select',
    slot: 'ListClass',
  },
  {
    field: 'icon',
    label: t('system.dictData.icon'),
    component: 'IconPicker',
  },
  {
    field: 'status',
    label: t('system.dictData.status'),
    component: 'RadioGroup',
    defaultValue: '0',
    componentProps: {
      dictType: DictEnum.COMMON_STATUS,
    },
    required: true,
  },
  {
    field: 'remark',
    label: t('system.dictData.remark'),
    component: 'InputTextArea',
    colProps: { lg: 24, md: 24 },
  },
];
