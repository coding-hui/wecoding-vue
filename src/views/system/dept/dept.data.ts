import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DictEnum } from '/@/enums/commonEnum';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('system.dept.name'),
    dataIndex: 'name',
    align: 'left',
    width: 200,
  },
  {
    title: t('system.dept.leader'),
    dataIndex: 'leader',
    align: 'left',
    width: 200,
  },
  {
    title: t('system.dept.phone'),
    dataIndex: 'phone',
    width: 100,
  },
  {
    title: t('system.dept.email'),
    dataIndex: 'email',
    width: 100,
  },
  {
    title: t('system.dept.status'),
    dataIndex: 'status',
    width: 80,
    dictType: DictEnum.COMMON_STATUS,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'status',
    label: t('system.dept.status'),
    component: 'Select',
    componentProps: {
      dictType: DictEnum.COMMON_STATUS,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'deptId',
    component: 'Input',
    show: false,
  },
  {
    field: 'parentId',
    label: t('system.dept.parentId'),
    component: 'TreeSelect',
    ifShow: (params) => {
      return params?.values?.parentId != '0';
    },
    required: true,
  },
  {
    field: 'name',
    label: t('system.dept.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'leader',
    label: t('system.dept.leader'),
    component: 'Input',
  },
  {
    field: 'phone',
    label: t('system.dept.phone'),
    component: 'Input',
  },
  {
    field: 'email',
    label: t('system.dept.email'),
    component: 'Input',
  },
  {
    field: 'sort',
    label: t('system.dept.sort'),
    component: 'InputNumber',
  },
  {
    field: 'status',
    label: t('system.dept.status'),
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      dictType: DictEnum.COMMON_STATUS,
    },
    required: true,
  },
  {
    field: 'remark',
    label: t('system.dept.remark'),
    component: 'InputTextArea',
    colProps: {
      lg: 24,
      md: 24,
    },
  },
];
