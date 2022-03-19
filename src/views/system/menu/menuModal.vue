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
    name: 'MenuModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const parentId = ref(null);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        schemas: formSchema,
        showActionButtonGroup: false,
        showSubmitButton: false,
        labelWidth: 120,
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
        const rootMenu = [
          {
            id: '0',
            name: '顶级',
            value: '0',
            children: treeData,
          },
        ];
        await updateSchema({
          field: 'parentId',
          componentProps: { treeData: rootMenu },
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
