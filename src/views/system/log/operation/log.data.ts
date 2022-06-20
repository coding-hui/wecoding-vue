import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { DictEnum } from '/@/enums/commonEnum';
import { useI18n } from '/@/hooks/web/useI18n';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('system.opLog.title'),
    dataIndex: 'title',
  },
  {
    title: t('system.opLog.businessType'),
    dataIndex: 'businessType',
    dictType: 'op_type',
  },
  {
    title: t('system.opLog.op'),
    dataIndex: 'ip',
  },
  {
    title: t('system.opLog.userAgent'),
    dataIndex: 'userAgent',
  },
  {
    title: t('system.opLog.requestUri'),
    dataIndex: 'requestUri',
  },
  {
    title: t('system.opLog.requestMethod'),
    dataIndex: 'requestMethod',
  },
  {
    title: t('system.opLog.serviceId'),
    dataIndex: 'serviceId',
    width: 80,
  },
  {
    title: t('system.opLog.time'),
    dataIndex: 'time',
    width: 80,
  },
  {
    title: t('system.opLog.type'),
    dataIndex: 'type',
    width: 80,
    dictType: DictEnum.OP_RUN_STATUS,
  },
  {
    title: t('system.opLog.createTime'),
    dataIndex: 'createTime',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: t('system.opLog.title'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'businessType',
    label: t('system.opLog.businessType'),
    component: 'Select',
    componentProps: {
      dictType: DictEnum.OP_TYPE,
    },
    colProps: { span: 8 },
  },
];

export const schema: DescItem[] = [
  {
    label: t('system.opLog.title'),
    field: 'title',
    render: (curVal, data) => {
      return `${curVal} / ${data.opType} / ${data.time}ns`;
    },
  },
  {
    label: t('system.opLog.requestUri'),
    field: 'requestUri',
  },
  {
    label: t('system.opLog.requestMethod'),
    field: 'requestMethod',
  },
  {
    label: t('system.opLog.userAgent'),
    field: 'userAgent',
  },
  {
    label: t('system.opLog.serviceId'),
    field: 'serviceId',
  },
  {
    label: t('system.opLog.createUser'),
    field: 'createUser',
    render: (curVal, data) => {
      return `${curVal} / ${data.ip}`;
    },
  },
  {
    label: t('system.opLog.type'),
    field: 'type',
    dictType: DictEnum.OP_RUN_STATUS,
  },
  {
    label: t('system.opLog.createTime'),
    field: 'createTime',
  },
  {
    label: t('system.opLog.method'),
    field: 'method',
    span: 2,
  },
  {
    label: t('system.opLog.params'),
    field: 'params',
    render: (curVal) => {
      return h('span', { innerHTML: curVal });
    },
    span: 2,
  },
  {
    label: t('system.opLog.exception'),
    field: 'exception',
    render: (curVal) => {
      return h('span', { innerHTML: curVal });
    },
    span: 2,
  },
];
