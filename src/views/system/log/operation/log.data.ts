import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { CodeEditor } from '/@/components/CodeEditor';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '模块名称',
    dataIndex: 'title',
  },
  {
    title: '业务类型',
    dataIndex: 'businessType',
    dictType: 'op_type',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
  },
  {
    title: '浏览器',
    dataIndex: 'userAgent',
  },
  {
    title: '请求路径',
    dataIndex: 'requestUri',
  },
  {
    title: '请求方式',
    dataIndex: 'requestMethod',
  },
  {
    title: '客户端',
    dataIndex: 'serviceId',
    width: 80,
  },
  {
    title: '执行时间',
    dataIndex: 'time',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'type',
    width: 80,
    dictType: 'op_run_status',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 150,
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

export const schema: DescItem[] = [
  {
    label: '操作模块',
    field: 'title',
    render: (curVal, data) => {
      return `${curVal} / ${data.opType} / ${data.time}ns`;
    },
  },
  {
    label: '请求地址',
    field: 'requestUri',
  },
  {
    label: '请求方式',
    field: 'requestMethod',
  },
  {
    label: '浏览器',
    field: 'userAgent',
  },
  {
    label: '客户端',
    field: 'serviceId',
  },
  {
    label: '登录信息',
    field: 'createUser',
    render: (curVal, data) => {
      return `${curVal} / ${data.ip}`;
    },
  },
  {
    label: '操作状态',
    field: 'type',
    dictType: 'op_run_status',
  },
  {
    label: '操作时间',
    field: 'createTime',
  },
  {
    label: '方法名称',
    field: 'method',
    span: 2,
  },
  {
    label: '请求参数',
    field: 'params',
    render: (curVal) => {
      return h(CodeEditor, { value: curVal, readonly: true, lineNumbers: false });
    },
  },
  {
    label: '返回消息',
    field: 'exception',
    render: (curVal) => {
      return h(CodeEditor, { value: curVal, readonly: true, lineNumbers: false });
    },
  },
];
