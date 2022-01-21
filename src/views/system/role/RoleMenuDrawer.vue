<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="授权菜单"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          ref="treeRef"
          toolbar
          title="菜单分配"
          v-model:value="model[field]"
          :replaceFields="{ title: 'name', key: 'id', value: 'id' }"
          :treeData="menuTreeData"
          :auto-expand-parent="true"
          :checked-keys="checkedKeys"
          :checkable="true"
          :default-expand-level="3"
          :default-expand-all="true"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicTree, TreeActionType } from '/@/components/Tree/index';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { roleMenuFormSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { getOwnMenuIds, grantMenu } from '/@/api/sys/role';
  import { findMenuSelect } from '/@/api/sys/menu';
  import type { RouteItem } from '/@/api/sys/model/menuModel';

  export default defineComponent({
    name: 'RoleMenuDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const menuTreeData = ref<RouteItem[]>([]);
      const checkedKeys = ref([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        schemas: roleMenuFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        const { roleId, name } = data.record;
        await setFieldsValue({ roleId, name });

        menuTreeData.value = await findMenuSelect();
        checkedKeys.value = await getOwnMenuIds(roleId);

        setDrawerProps({ confirmLoading: false });
        getTree().expandAll(true);
      });

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          grantMenu(values)
            .then(() => {
              emit('success');
            })
            .finally(() => {
              closeDrawer();
            });
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, handleSubmit, treeRef, menuTreeData, checkedKeys };
    },
  });
</script>
