import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DictEnum } from '/@/enums/commonEnum';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('system.user.avatar'),
    dataIndex: 'avatar',
    align: 'left',
    width: 50,
  },
  {
    title: t('system.user.realName'),
    dataIndex: 'realName',
    align: 'left',
    width: 120,
  },
  {
    title: t('system.user.account'),
    dataIndex: 'account',
    align: 'left',
    width: 120,
  },
  {
    title: t('system.user.phone'),
    dataIndex: 'phone',
    align: 'left',
    width: 80,
  },
  {
    title: t('system.user.email'),
    dataIndex: 'email',
    align: 'left',
    width: 120,
  },
  {
    title: t('system.user.gender'),
    dataIndex: 'gender',
    align: 'left',
    width: 50,
    dictType: DictEnum.GENDER_TYPE,
  },
  {
    title: t('system.user.lastLoginTime'),
    dataIndex: 'lastLoginTime',
    align: 'left',
    width: 120,
  },
  {
    title: t('system.user.updateTime'),
    dataIndex: 'updateTime',
    width: 120,
    align: 'left',
  },
  {
    title: t('system.user.status'),
    dataIndex: 'status',
    width: 50,
    align: 'left',
    dictType: DictEnum.COMMON_STATUS,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'realName',
    label: t('system.user.realName'),
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'account',
    label: t('system.user.account'),
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: t('system.user.status'),
    component: 'Select',
    componentProps: {
      dictType: DictEnum.COMMON_STATUS,
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'userId',
    component: 'Input',
    show: false,
  },
  {
    field: 'account',
    label: t('system.user.account'),
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: t('system.user.password'),
    component: 'InputPassword',
    ifShow: (params) => {
      return !params?.values?.userId;
    },
    required: true,
  },
  {
    field: 'realName',
    label: t('system.user.realName'),
    component: 'Input',
    required: true,
  },
  {
    field: 'birthday',
    label: t('system.user.birthday'),
    component: 'DatePicker',
  },
  {
    field: 'gender',
    label: t('system.user.gender'),
    component: 'RadioButtonGroup',
    componentProps: {
      dictType: DictEnum.GENDER_TYPE,
    },
  },
  {
    field: 'email',
    label: t('system.user.email'),
    component: 'Input',
  },
  {
    field: 'phone',
    label: t('system.user.phone'),
    component: 'Input',
  },
  {
    field: 'remark',
    label: t('system.user.remark'),
    component: 'InputTextArea',
    colProps: {
      lg: 24,
      md: 24,
    },
  },
];
