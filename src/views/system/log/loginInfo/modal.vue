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

  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { getLogById, saveOrUpdateLog } from '/@/api/sys/loginLog';

  import { formSchema } from './index.data';

  export default defineComponent({
    name: 'Modal',
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

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const { id } = data.record;
          getLogById(id).then((res) => {
            setFieldsValue({ ...res });
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增系统登录日志' : '编辑系统登录日志'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          saveOrUpdateLog(values, unref(isUpdate))
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

      return { registerModal, registerForm, handleSubmit, getTitle };
    },
  });
</script>
