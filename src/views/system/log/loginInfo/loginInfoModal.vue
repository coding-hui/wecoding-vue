<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :cancelText="t('common.back')"
    :showOkBtn="false"
    showFooter
    :title="t('system.loginLog.table.title')"
    width="40%"
  >
    <Description @register="register" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDict } from '/@/components/Dict';
  import { DictEnum } from '/@/enums/commonEnum';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { schema } from '/@/views/system/log/loginInfo/index.data';

  export default defineComponent({
    name: 'Modal',
    components: { BasicModal, Description },
    emits: ['success', 'register'],
    setup(_) {
      const { t } = useI18n();
      const { initDict } = useDict();

      const [register, { setDescProps }] = useDescription({
        bordered: false,
        column: 2,
        labelStyle: {
          color: '#606266',
          'font-weight': 700,
        },
        schema: schema,
        dictTypes: [DictEnum.VIS_LOG_TYPE],
      });

      const [registerModal, { setModalProps }] = useModalInner(async (data) => {
        await initDict([DictEnum.VIS_LOG_TYPE]);
        await setDescProps({ data: data.record });
        setModalProps({ confirmLoading: false });
      });

      return { t, register, registerModal };
    },
  });
</script>
