<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerDrawer"
    cancelText="返回"
    :showOkBtn="false"
    showFooter
    title="操作日志"
    width="70%"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './log.data';

  export default defineComponent({
    name: 'LogPreviewModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_) {
      const data = reactive({
        log: {},
      });
      const [registerForm, { setFieldsValue }] = useForm({
        baseColProps: {
          span: 8,
        },
        rowProps: {
          gutter: 24,
        },
        schemas: formSchema,
        showResetButton: false,
        showSubmitButton: false,
        showActionButtonGroup: false,
      });
      const [registerDrawer, { setModalProps }] = useModalInner(async (data) => {
        await setFieldsValue({ ...data.record });
        setModalProps({ confirmLoading: false });
      });

      return { registerForm, registerDrawer, ...toRefs(data) };
    },
  });
</script>
