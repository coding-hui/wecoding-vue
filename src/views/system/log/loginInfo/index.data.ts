import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '登录账号',
    dataIndex: 'account',
    align: 'left',
  },
  {
    title: '用户id',
    dataIndex: 'userId',
    align: 'left',
  },
  {
    title: '登录IP地址',
    dataIndex: 'ipaddr',
    align: 'left',
  },
  {
    title: '登录地点',
    dataIndex: 'loginLocation',
    align: 'left',
  },
  {
    title: '浏览器类型',
    dataIndex: 'browser',
    align: 'left',
  },
  {
    title: '操作系统',
    dataIndex: 'os',
    align: 'left',
  },
  {
    title: '登录状态（0登录失败 1登录成功 2登出）',
    dataIndex: 'status',
    align: 'left',
  },
  {
    title: '提示消息',
    dataIndex: 'msg',
    align: 'left',
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
    align: 'left',
  },
  {
    title: '登出时间',
    dataIndex: 'logoutTime',
    align: 'left',
  },
  {
    title: '用户登录时保存token的uuid',
    dataIndex: 'loginUuid',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '登录账号',
    field: 'account',
    component: 'Input',
  },
  {
    label: '登录状态（0登录失败 1登录成功 2登出）',
    field: 'status',
    component: 'RadioGroup',
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
    label: '登录账号',
    field: 'account',
    component: 'Input',
  },
  {
    label: '用户id',
    field: 'userId',
    component: 'Input',
  },
  {
    label: '登录IP地址',
    field: 'ipaddr',
    component: 'Input',
  },
  {
    label: '登录地点',
    field: 'loginLocation',
    component: 'Input',
  },
  {
    label: '浏览器类型',
    field: 'browser',
    component: 'Input',
  },
  {
    label: '操作系统',
    field: 'os',
    component: 'Input',
  },
  {
    label: '登录状态（0登录失败 1登录成功 2登出）',
    field: 'status',
    component: 'RadioGroup',
  },
  {
    label: '提示消息',
    field: 'msg',
    component: 'Input',
  },
  {
    label: '登录时间',
    field: 'loginTime',
    component: 'DatePicker',
  },
  {
    label: '登出时间',
    field: 'logoutTime',
    component: 'DatePicker',
  },
  {
    label: '用户登录token',
    field: 'loginUuid',
    component: 'Input',
  },
];
