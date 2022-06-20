import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { DictEnum } from '/@/enums/commonEnum';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('system.loginLog.account'),
    dataIndex: 'account',
    align: 'left',
    width: 100,
  },
  {
    title: t('system.loginLog.clientId'),
    dataIndex: 'clientId',
    align: 'left',
    width: 100,
  },
  {
    title: t('system.loginLog.ipaddr'),
    dataIndex: 'ipaddr',
    align: 'left',
    width: 100,
  },
  {
    title: t('system.loginLog.browser'),
    dataIndex: 'browser',
    align: 'left',
    width: 80,
  },
  {
    title: t('system.loginLog.os'),
    dataIndex: 'os',
    align: 'left',
    width: 80,
  },
  {
    title: t('system.loginLog.loginLocation'),
    dataIndex: 'loginLocation',
    align: 'left',
    width: 100,
  },
  {
    title: t('system.loginLog.msg'),
    dataIndex: 'msg',
    align: 'left',
    width: 150,
  },
  {
    title: t('system.loginLog.loginTime'),
    dataIndex: 'loginTime',
    align: 'left',
    width: 150,
  },
  {
    title: t('system.loginLog.logoutTime'),
    dataIndex: 'logoutTime',
    align: 'left',
    width: 150,
  },
  {
    title: t('system.loginLog.loginUuid'),
    dataIndex: 'loginUuid',
    align: 'left',
    width: 150,
  },
  {
    title: t('system.loginLog.status'),
    dataIndex: 'status',
    align: 'left',
    dictType: DictEnum.VIS_LOG_TYPE,
    width: 90,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: t('system.loginLog.account'),
    field: 'account',
    component: 'Input',
  },
  {
    label: t('system.loginLog.status'),
    field: 'status',
    component: 'Select',
    componentProps: {
      dictType: DictEnum.VIS_LOG_TYPE,
    },
  },
];

export const schema: DescItem[] = [
  {
    label: t('system.loginLog.account'),
    field: 'account',
  },
  {
    label: t('system.loginLog.userId'),
    field: 'userId',
  },
  {
    label: t('system.loginLog.ipaddr'),
    field: 'ipaddr',
  },
  {
    label: t('system.loginLog.loginLocation'),
    field: 'loginLocation',
  },
  {
    label: t('system.loginLog.os'),
    field: 'os',
  },
  {
    label: t('system.loginLog.status'),
    field: 'status',
    dictType: DictEnum.VIS_LOG_TYPE,
  },
  {
    label: t('system.loginLog.loginTime'),
    field: 'loginTime',
  },
  {
    label: t('system.loginLog.logoutTime'),
    field: 'logoutTime',
  },
  {
    label: t('system.loginLog.loginUuid'),
    field: 'loginUuid',
  },
  {
    label: t('system.loginLog.msg'),
    field: 'msg',
  },
];
