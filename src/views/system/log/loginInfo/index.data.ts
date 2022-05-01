import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';

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

export const schema: DescItem[] = [
  {
    label: '登录账号',
    field: 'account',
  },
  {
    label: '用户编号',
    field: 'userId',
  },
  {
    label: '登录IP地址',
    field: 'ipaddr',
  },
  {
    label: '登录地点',
    field: 'loginLocation',
  },
  {
    label: '浏览器',
    field: 'os',
  },
  {
    label: '登录状态',
    field: 'status',
    dictType: 'vis_log_type',
  },
  {
    label: '登录时间',
    field: 'loginTime',
  },
  {
    label: '登出时间',
    field: 'logoutTime',
  },
  {
    label: 'Token',
    field: 'loginUuid',
  },
  {
    label: '提示消息',
    field: 'msg',
  },
];
