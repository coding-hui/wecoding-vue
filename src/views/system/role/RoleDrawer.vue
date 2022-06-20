<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t(`system.role.form.${actionType}`)"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getRoleById, saveOrUpdateRole } from '/@/api/sys/role';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const actionType = ref<ActionEnum>(ActionEnum.ADD);
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        schemas: formSchema,
        showActionButtonGroup: false,
        labelWidth: 100,
        baseColProps: { lg: 24, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ loading: true });
        actionType.value = data?.actionType;
        isUpdate.value = data?.actionType === ActionEnum.EDIT;

        if (unref(isUpdate)) {
          const { roleId } = data.record;
          const res = await getRoleById(roleId);
          await setFieldsValue(res);
        }
        setDrawerProps({ loading: false });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          await saveOrUpdateRole(values, unref(isUpdate));
          setTimeout(closeDrawer);
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { t, actionType, registerDrawer, registerForm, handleSubmit };
    },
  });
</script>
