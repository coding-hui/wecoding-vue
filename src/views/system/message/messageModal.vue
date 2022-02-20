<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="getTitle"
    width="60%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';

  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { getMessageById, saveOrUpdateMessage } from '/@/api/message/message';

  import { formSchema } from './message.data';

  export default defineComponent({
    name: 'MessageModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        schemas: formSchema,
        labelWidth: 90,
        baseColProps: {
          span: 12,
        },
        rowProps: { gutter: 24 },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const { id } = data.record;
          getMessageById(id)
            .then((res) => {
              setFieldsValue({ ...res });
            })
            .finally(() => {
              setModalProps({ confirmLoading: false });
            });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增消息' : '编辑消息'));

      async function handleSubmit() {
        setModalProps({ confirmLoading: true });
        const values = await validate();
        saveOrUpdateMessage(values, unref(isUpdate))
          .then(() => {
            emit('success');
          })
          .finally(() => {
            closeModal();
            setModalProps({ confirmLoading: false });
          });
      }

      return { registerModal, registerForm, handleSubmit, getTitle };
    },
  });
</script>
