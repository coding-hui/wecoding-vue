<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    cancelText="返回"
    :showOkBtn="false"
    showFooter
    title="登录日志"
    width="40%"
  >
    <Description @register="register" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { Description, useDescription } from '/@/components/Description';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { useDict } from '/@/components/Dict';
  import { schema } from '/@/views/system/log/loginInfo/index.data';

  export default defineComponent({
    name: 'Modal',
    components: { BasicModal, Description },
    emits: ['success', 'register'],
    setup(_) {
      const { initDict } = useDict();

      const [register, { setDescProps }] = useDescription({
        bordered: false,
        column: 2,
        labelStyle: {
          color: '#606266',
          'font-weight': 700,
        },
        schema: schema,
        dictTypes: ['vis_log_type'],
      });

      const [registerModal, { setModalProps }] = useModalInner(async (data) => {
        await initDict(['vis_log_type']);
        await setDescProps({ data: data.record });
        setModalProps({ confirmLoading: false });
      });

      return { register, registerModal };
    },
  });
</script>
