import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '模块名称',
    dataIndex: 'title',
    align: 'left',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    align: 'left',
  },
  {
    title: '浏览器',
    dataIndex: 'userAgent',
  },
  {
    title: 'URI',
    dataIndex: 'requestUri',
  },
  {
    title: '操作方式',
    dataIndex: 'requestMethod',
  },
  {
    title: '执行时间',
    dataIndex: 'time',
  },
  {
    title: '业务类型',
    dataIndex: 'businessType',
    dictType: 'op_type',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '状态',
    dataIndex: 'type',
    width: 80,
    dictType: 'op_run_status',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '模块名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'businessType',
    label: '业务类型',
    component: 'Select',
    componentProps: {
      dictType: 'op_type',
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '模块标题',
    field: 'title',
    component: 'Input',
  },
  {
    label: '结果类型（1:成功，0失败）',
    field: 'type',
    component: 'Select',
  },
  {
    label: '方法名称',
    field: 'method',
    component: 'Input',
  },
  {
    label: '请求方式',
    field: 'requestMethod',
    component: 'Input',
  },
  {
    label: '用户浏览器',
    field: 'userAgent',
    component: 'Input',
  },
  {
    label: '操作类别',
    field: 'operatorType',
    component: 'Select',
  },
  {
    label: '部门名称',
    field: 'deptName',
    component: 'Input',
  },
  {
    label: '请求 URI',
    field: 'requestUri',
    component: 'Input',
  },
  {
    label: '主机地址',
    field: 'ip',
    component: 'Input',
  },
  {
    label: '操作地点',
    field: 'location',
    component: 'Input',
  },
  {
    label: '执行时间',
    field: 'time',
    component: 'Input',
  },
  {
    label: '业务操作类型',
    field: 'businessType',
    component: 'Select',
    componentProps: {
      dictType: 'op_type',
    },
  },
  {
    label: '请求参数',
    field: 'params',
    component: 'InputTextArea',
  },
  {
    label: '错误消息',
    field: 'exception',
    component: 'InputTextArea',
  },
];
