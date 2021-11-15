<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
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
  import { formSchema } from './menu.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { findMenuSelect, getMenuById, saveOrUpdateMenu } from '/@/api/sys/menu';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const parentId = ref(null);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 80,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        parentId.value = data?.parentId;

        // 添加子菜单
        if (unref(parentId)) {
          await setFieldsValue({ parentId: unref(parentId) });
        }

        if (unref(isUpdate)) {
          const { id } = data.record;
          getMenuById(id).then((res) => {
            setFieldsValue({ ...res });
          });
        }
        const treeData = await findMenuSelect();
        await updateSchema({
          field: 'parentId',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          saveOrUpdateMenu(values, unref(isUpdate))
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

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
