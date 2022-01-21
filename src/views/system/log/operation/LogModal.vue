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
  import { formSchema } from './log.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { getRoleById, saveOrUpdateRole } from '/@/api/sys/role';

  export default defineComponent({
    name: 'RoleModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const parentId = ref(null);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        parentId.value = data?.parentId;

        // 添加子菜单
        if (unref(parentId)) {
          await setFieldsValue({ parentId: unref(parentId) });
        }

        if (unref(isUpdate)) {
          const { roleId } = data.record;
          getRoleById(roleId).then((res) => {
            setFieldsValue({ ...res });
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          saveOrUpdateRole(values, unref(isUpdate))
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
