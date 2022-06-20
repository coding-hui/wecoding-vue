import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DictEnum } from '/@/enums/commonEnum';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('system.config.configName'),
    dataIndex: 'configName',
    align: 'left',
    width: 200,
  },
  {
    title: t('system.config.configKey'),
    dataIndex: 'configKey',
    align: 'left',
    width: 200,
  },
  {
    title: t('system.config.configValue'),
    dataIndex: 'configValue',
    width: 100,
  },
  {
    title: t('system.config.updateTime'),
    dataIndex: 'updateTime',
    width: 100,
  },
  {
    title: t('system.config.configType'),
    dataIndex: 'configType',
    width: 80,
    dictType: DictEnum.YES_OR_NO,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'configName',
    label: t('system.config.configName'),
    component: 'Input',
  },
  {
    field: 'configKey',
    label: t('system.config.configKey'),
    component: 'Input',
  },
  {
    field: 'configValue',
    label: t('system.config.configValue'),
    component: 'Input',
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'configId',
    component: 'Input',
    show: false,
  },
  {
    field: 'configName',
    label: t('system.config.configName'),
    component: 'Input',
    required: true,
  },
  {
    field: 'configKey',
    label: t('system.config.configKey'),
    component: 'Input',
    required: true,
  },
  {
    field: 'configValue',
    label: t('system.config.configValue'),
    component: 'Input',
    required: true,
  },
  {
    field: 'configType',
    label: t('system.config.configType'),
    component: 'RadioButtonGroup',
    defaultValue: 'N',
    componentProps: {
      dictType: DictEnum.YES_OR_NO,
    },
  },
  {
    field: 'remark',
    label: t('system.config.remark'),
    component: 'InputTextArea',
    colProps: {
      lg: 24,
      md: 24,
    },
  },
];
