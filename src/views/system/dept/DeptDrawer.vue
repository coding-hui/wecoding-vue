<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t(`system.dept.form.${actionType}`)"
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
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getDeptById, saveOrUpdateDept, findDeptTreeSelect } from '/@/api/sys/dept';
  import { formSchema } from './dept.data';

  export default defineComponent({
    name: 'DeptDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const parentId = ref(null);
      const actionType = ref<ActionEnum>(ActionEnum.ADD);
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ loading: true });
        actionType.value = data?.actionType;
        parentId.value = data?.parentId;
        isUpdate.value = data?.actionType === ActionEnum.EDIT;

        if (unref(parentId)) {
          await setFieldsValue({ parentId: unref(parentId) });
        }

        if (unref(isUpdate)) {
          const { deptId } = data.record;
          const res = await getDeptById(deptId);
          await setFieldsValue(res);
        }

        // 更新父级菜单选择框
        await updateSchema({
          field: 'parentId',
          componentProps: {
            api: findDeptTreeSelect,
            immediate: true,
            fieldNames: {
              value: 'value',
              label: 'title',
            },
          },
        });
        setDrawerProps({ loading: false });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          await saveOrUpdateDept(values, unref(isUpdate));
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
