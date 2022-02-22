import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { Tinymce } from '/@/components/Tinymce';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    align: 'left',
  },
  {
    title: '发送者账户',
    dataIndex: 'sendUserAccount',
    align: 'left',
  },
  {
    title: '发送者姓名',
    dataIndex: 'sendRealName',
    align: 'left',
  },
  {
    title: '消息类型',
    dataIndex: 'messageType',
    dictType: 'mes_message_type',
    align: 'center',
  },
  {
    title: '接收人数',
    dataIndex: 'receiveUserCount',
    align: 'center',
  },
  {
    title: '已读人数',
    dataIndex: 'readCount',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'left',
  },
];

export const userMessageColumns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    align: 'left',
  },
  {
    title: '发送者账户',
    dataIndex: 'sendUserAccount',
    align: 'left',
  },
  {
    title: '发送者姓名',
    dataIndex: 'sendRealName',
    align: 'left',
  },
  {
    title: '消息类型',
    dataIndex: 'messageType',
    dictType: 'mes_message_type',
    align: 'center',
  },
  {
    title: '是否阅读',
    dataIndex: 'readed',
    align: 'center',
    dictType: 'yes_or_no',
  },
  {
    title: '阅读时间',
    dataIndex: 'readTime',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '标题',
    field: 'title',
    component: 'Input',
  },
  {
    label: '发送者账户',
    field: 'sendUserAccount',
    component: 'Input',
  },
  {
    label: '消息类型',
    field: 'messageType',
    component: 'Select',
    componentProps: {
      dictType: 'mes_message_type',
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
    label: '标题',
    field: 'title',
    required: true,
    component: 'Input',
  },
  {
    label: '类型',
    field: 'messageType',
    component: 'Select',
    required: true,
    componentProps: {
      dictType: 'mes_message_type',
    },
  },
  {
    label: '内容',
    field: 'content',
    component: 'InputTextArea',
    rules: [{ required: true, trigger: 'blur' }],
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        showImageUpload: false,
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
    colProps: {
      span: 24,
    },
  },
];
