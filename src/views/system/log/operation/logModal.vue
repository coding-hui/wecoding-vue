<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerDrawer"
    :cancelText="t('common.back')"
    :showOkBtn="false"
    showFooter
    :title="t('system.opLog.table.title')"
    width="50%"
  >
    <Description @register="register" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDict } from '/@/components/Dict';
  import { Description, useDescription } from '/@/components/Description';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { schema } from './log.data';
  import { DictEnum } from '/@/enums/commonEnum';

  export default defineComponent({
    name: 'LogPreviewModal',
    components: { BasicModal, Description },
    emits: ['success', 'register'],
    setup(_) {
      const { t } = useI18n();
      const { initDict, getDictLabel } = useDict();

      const [register, { setDescProps }] = useDescription({
        bordered: false,
        column: 2,
        labelStyle: {
          color: '#606266',
          'font-weight': 700,
        },
        schema: schema,
        dictTypes: ['op_run_status'],
      });

      const [registerDrawer, { setModalProps }] = useModalInner(async (data) => {
        setModalProps({ loading: true });
        await initDict([DictEnum.OP_TYPE]);
        data.record.opType = getDictLabel(DictEnum.OP_TYPE, data.record.businessType);
        await setDescProps({ data: data.record });
        setModalProps({ loading: false });
      });

      return { t, register, registerDrawer };
    },
  });
</script>
