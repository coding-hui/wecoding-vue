<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t(`system.menu.form.${actionType}`)"
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
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { findMenuSelect, getMenuById, saveOrUpdateMenu } from '/@/api/sys/menu';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const parentId = ref(null);
      const actionType = ref<ActionEnum>(ActionEnum.ADD);
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        schemas: formSchema,
        showActionButtonGroup: false,
        showSubmitButton: false,
        labelWidth: 120,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ loading: true });
        actionType.value = data?.actionType;
        parentId.value = data?.parentId;
        isUpdate.value = data?.actionType === ActionEnum.EDIT;

        // 添加子菜单
        if (unref(parentId)) {
          await setFieldsValue({ parentId: unref(parentId) });
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

        if (unref(actionType) === ActionEnum.EDIT) {
          const { menuId } = data.record;
          const res = await getMenuById(menuId);
          await setFieldsValue(res);
        }

        setDrawerProps({ loading: false });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          await saveOrUpdateMenu(values, unref(isUpdate));
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
