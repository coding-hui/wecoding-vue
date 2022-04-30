import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '登录账号',
    dataIndex: 'account',
    align: 'left',
    width: 100,
  },
  {
    title: '客户端',
    dataIndex: 'clientId',
    align: 'left',
    width: 100,
  },
  {
    title: 'IP',
    dataIndex: 'ipaddr',
    align: 'left',
    width: 100,
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    align: 'left',
    width: 80,
  },
  {
    title: '操作系统',
    dataIndex: 'os',
    align: 'left',
    width: 80,
  },
  {
    title: '登录地点',
    dataIndex: 'loginLocation',
    align: 'left',
    width: 100,
  },
  {
    title: '提示消息',
    dataIndex: 'msg',
    align: 'left',
    width: 150,
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
    align: 'left',
    width: 150,
  },
  {
    title: '登出时间',
    dataIndex: 'logoutTime',
    align: 'left',
    width: 150,
  },
  {
    title: 'token',
    dataIndex: 'loginUuid',
    align: 'left',
    width: 150,
  },
  {
    title: '登录状态',
    dataIndex: 'status',
    align: 'left',
    dictType: 'vis_log_type',
    width: 80,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '登录账号',
    field: 'account',
    component: 'Input',
  },
  {
    label: '登录状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      dictType: 'vis_log_type',
    },
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
