<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './config.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { getConfigById, saveOrUpdateConfig } from '/@/api/sys/config';

  export default defineComponent({
    name: 'ConfigModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        schemas: formSchema,
        showActionButtonGroup: false,
        labelCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 5, offset: 0 },
        },
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 15, offset: 0 },
        },
      });

      const [registerDrawer, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const { configId } = data.record;
          getConfigById(configId).then((res) => {
            setFieldsValue({ ...res });
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增配置' : '编辑配置'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          saveOrUpdateConfig(values, unref(isUpdate))
            .then(() => {
              emit('success');
            })
            .finally(() => {
              closeModal();
            });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
