<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t(`system.user.form.${actionType}`)"
    width="50%"
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
  import { formSchema } from './user.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getUserById, saveOrUpdateUser } from '/@/api/sys/user';

  export default defineComponent({
    name: 'UserDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const actionType = ref<ActionEnum>(ActionEnum.ADD);
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 120,
        baseColProps: { lg: 12, md: 24 },
        schemas: formSchema,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ loading: true });
        actionType.value = data?.actionType;
        isUpdate.value = data?.actionType === ActionEnum.EDIT;

        if (unref(isUpdate)) {
          const { userId } = data.record;
          const res = await getUserById(userId);
          await setFieldsValue(res);
        }
        setDrawerProps({ loading: false });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          await saveOrUpdateUser(values, unref(isUpdate));
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
