import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

import { findDeptTreeSelect } from '/@/api/sys/dept';

export const columns: BasicColumn[] = [
  {
    title: '用户名称',
    dataIndex: 'realName',
    align: 'left',
    width: 200,
  },
  {
    title: '部门',
    dataIndex: 'dept.name',
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
    title: '电话',
    dataIndex: 'phone',
    align: 'left',
    width: 100,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'left',
    width: 150,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'left',
    width: 50,
    customRender: ({ record }) => {
      switch (record.sex) {
        case 1:
          return '男';
        case 2:
          return '女';
        default:
          return '未知';
      }
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
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '正常' : '锁定';
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'realName',
    label: '用户名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'account',
    label: '登录账号',
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
    field: 'deptId',
    label: '归属部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: findDeptTreeSelect,
      replaceFields: {},
      getPopupContainer: () => document.body,
    },
    required: true,
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
      options: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
        {
          label: '示知',
          value: 3,
        },
      ],
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
