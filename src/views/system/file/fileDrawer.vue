<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t('common.title.upload')"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { formSchema } from './file.data';

  export default defineComponent({
    name: 'FileDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();

      const [registerForm, { resetFields }] = useForm({
        schemas: formSchema,
        labelWidth: 100,
        showActionButtonGroup: false,
        baseColProps: { lg: 24, md: 24 },
      });

      const [registerDrawer, { closeDrawer }] = useDrawerInner(() => {
        resetFields();
      });

      async function handleSubmit() {
        emit('success');
        closeDrawer();
      }

      return { t, registerDrawer, registerForm, handleSubmit };
    },
  });
</script>
