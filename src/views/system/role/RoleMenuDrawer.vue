<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t('common.title.grantMenu')"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          ref="treeRef"
          toolbar
          :title="t('system.role.form.ownMenu')"
          v-model:value="model[field]"
          :fieldNames="{ title: 'name', key: 'id', value: 'id' }"
          :treeData="menuTreeData"
          :auto-expand-parent="true"
          :checked-keys="checkedKeys"
          :checkable="true"
          :default-expand-level="3"
          :check-strictly="menuCheckStrictlyRef"
          @strictly-change="handleStrictlyChange"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref, unref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { get } from 'lodash-es';
  import { BasicTree, TreeActionType } from '/@/components/Tree';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { roleMenuFormSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getOwnMenuIds, grantMenu } from '/@/api/sys/role';
  import { findMenuSelect } from '/@/api/sys/menu';

  export default defineComponent({
    name: 'RoleMenuDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const menuTreeData = ref([]);
      const checkedKeys = ref([]);
      const menuCheckStrictlyRef = ref<boolean>(false);
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        schemas: roleMenuFormSchema,
        showActionButtonGroup: false,
        layout: 'vertical',
        labelWidth: 120,
        baseColProps: { lg: 24, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ loading: true });
        await resetFields();
        const { roleId, name, menuCheckStrictly } = data.record;
        await setFieldsValue({ roleId, name, menuCheckStrictly });

        menuCheckStrictlyRef.value = menuCheckStrictly;
        menuTreeData.value = await findMenuSelect();
        checkedKeys.value = await getOwnMenuIds(roleId);
        setCheckedNodes();
        setDrawerProps({ loading: false });
      });

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      function setCheckedNodes() {
        nextTick(() => {
          getTree().setCheckedKeys(checkedKeys.value);
          getTree().setExpandedKeys(checkedKeys.value);
        });
      }

      function handleStrictlyChange(strictly) {
        menuCheckStrictlyRef.value = strictly;
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          let keys = getTree().getCheckedKeys();
          setDrawerProps({ confirmLoading: true });
          if (Reflect.has(keys, 'checked')) {
            values.grantMenuIdList = get(keys, 'checked');
          } else {
            values.grantMenuIdList = getTree().getCheckedKeys();
          }
          values.menuCheckStrictly = menuCheckStrictlyRef.value;
          await grantMenu(values);
          setTimeout(closeDrawer);
          emit('success');
        } catch (error: any) {
          if (error && error.errorMessage) {
            createMessage.error(error.errorMessage);
          }
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        t,
        registerDrawer,
        registerForm,
        handleSubmit,
        handleStrictlyChange,
        treeRef,
        menuTreeData,
        checkedKeys,
        menuCheckStrictlyRef,
      };
    },
  });
</script>
