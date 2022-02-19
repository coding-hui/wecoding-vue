import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '用户名称',
    dataIndex: 'nickName',
    align: 'left',
    width: 200,
  },
  {
    title: '登录账号',
    dataIndex: 'account',
    align: 'left',
    width: 200,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'left',
    width: 50,
    dictType: 'sex',
  },
  {
    title: '注册时间',
    dataIndex: 'updateTime',
    width: 110,
    format: (record) => {
      return !record ? '--' : formatToDateTime(record, 'YYYY-MM-DD HH:mm');
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 110,
    format: (record) => {
      return !record ? '--' : formatToDateTime(record, 'YYYY-MM-DD HH:mm');
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
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
    field: 'sex',
    label: '性别',
    component: 'Select',
    componentProps: {
      dictType: 'sex',
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
