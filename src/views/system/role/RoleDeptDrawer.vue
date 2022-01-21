<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="授权数据"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #data="{ model, field }">
        <BasicTree
          ref="treeRef"
          toolbar
          title="拥有数据"
          v-model:value="model[field]"
          :treeData="deptTreeData"
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
  import { roleDeptFormSchema } from './role.data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeActionType } from '/@/components/Tree';

  import { findDeptTreeSelect } from '/@/api/sys/dept';
  import { getOwnData, grantData } from '/@/api/sys/role';

  export default defineComponent({
    name: 'RoleDeptDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const deptTreeData = ref([]);
      const checkedKeys = ref([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        schemas: roleDeptFormSchema,
        showActionButtonGroup: false,
        layout: 'vertical',
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        const { roleId, name, dataScopeType } = data.record;
        await setFieldsValue({ roleId, name, dataScopeType });

        deptTreeData.value = await findDeptTreeSelect();
        checkedKeys.value = await getOwnData(roleId);
        setDrawerProps({ confirmLoading: false });
        if (dataScopeType === '5') {
          getTree().expandAll(true);
        }
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
          grantData(values)
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

      return { registerDrawer, registerForm, handleSubmit, treeRef, deptTreeData, checkedKeys };
    },
  });
</script>
