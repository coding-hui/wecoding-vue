import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '头像',
    dataIndex: 'avatar',
    align: 'left',
    width: 50,
    slots: { customRender: 'Avatar' },
  },
  {
    title: '用户名称',
    dataIndex: 'nickName',
    align: 'left',
    width: 120,
  },
  {
    title: '登录账号',
    dataIndex: 'account',
    align: 'left',
    width: 120,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    align: 'left',
    width: 80,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'left',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    align: 'left',
    width: 40,
    dictType: 'gender_type',
  },
  {
    title: '最后登陆时间',
    dataIndex: 'lastLoginTime',
    align: 'left',
    width: 120,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 120,
    align: 'left',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 40,
    align: 'left',
    dictType: 'common_status',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'realName',
    label: '用户名称',
    component: 'Input',
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
    label: '登录账号',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    ifShow: (params) => {
      return !params?.values?.userId;
    },
    required: true,
  },
  {
    field: 'realName',
    label: '用户姓名',
    component: 'Input',
    required: true,
  },
  {
    field: 'birthday',
    label: '生日',
    component: 'DatePicker',
  },
  {
    field: 'gender',
    label: '性别',
    component: 'Select',
    componentProps: {
      dictType: 'gender_type',
    },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
  },
  {
    field: 'phone',
    label: '电话',
    component: 'Input',
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
