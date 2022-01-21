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
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './dictData.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { getDictDataById, saveOrUpdateDictData } from '/@/api/sys/dict';

  export default defineComponent({
    name: 'DictDataModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const dictType = ref('');

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
        dictType.value = data?.dictType;

        if (unref(isUpdate)) {
          const { dictCode } = data.record;
          getDictDataById(dictCode).then((res) => {
            setFieldsValue({ ...res });
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增字典数据' : '编辑字典数据'));

      async function handleSubmit() {
        try {
          const values = await validate();
          values.type = unref(dictType);
          setModalProps({ confirmLoading: true });
          saveOrUpdateDictData(values, unref(isUpdate))
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
