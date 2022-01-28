<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerDrawer"
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
  import { formSchema } from './genDatasource.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { getGenDatasourceById, saveOrUpdateGenDatasource } from '/@/api/gen/datasource';

  export default defineComponent({
    name: 'GenDatasourceModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 80,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
        rowProps: {
          gutter: 20,
        },
      });

      const [registerDrawer, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const { id } = data.record;
          getGenDatasourceById(id).then((res) => {
            setFieldsValue({ ...res });
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增查询类型' : '编辑查询类型'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          saveOrUpdateGenDatasource(values, unref(isUpdate))
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
