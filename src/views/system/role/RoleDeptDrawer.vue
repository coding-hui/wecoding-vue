<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t('common.title.grantData')"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #data="{ model, field }">
        <BasicTree
          ref="treeRef"
          toolbar
          :title="t('system.role.form.ownData')"
          v-model:value="model[field]"
          :treeData="deptTreeData"
          :auto-expand-parent="true"
          :checked-keys="checkedKeys"
          :checkable="true"
          :default-expand-level="3"
          :check-strictly="deptCheckStrictlyRef"
          @strictly-change="handleStrictlyChange"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { get } from 'lodash-es';
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
      const { createMessage } = useMessage();
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const deptTreeData = ref([]);
      const checkedKeys = ref([]);
      const deptCheckStrictlyRef = ref<boolean>(false);
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        schemas: roleDeptFormSchema,
        showActionButtonGroup: false,
        layout: 'vertical',
        labelWidth: 120,
        baseColProps: { lg: 24, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ loading: true });
        await resetFields();
        const { roleId, name, dataScopeType, deptCheckStrictly } = data.record;
        await setFieldsValue({ roleId, name, dataScopeType });

        deptCheckStrictlyRef.value = deptCheckStrictly;
        deptTreeData.value = await findDeptTreeSelect();
        checkedKeys.value = await getOwnData(roleId);
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
        deptCheckStrictlyRef.value = strictly;
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          if (values.dataScopeType == '5') {
            let keys = getTree().getCheckedKeys();
            if (Reflect.has(keys, 'checked')) {
              values.grantDeptIdList = get(keys, 'checked');
            } else {
              values.grantDeptIdList = getTree().getCheckedKeys();
            }
            values.deptCheckStrictly = deptCheckStrictlyRef.value;
          }
          setDrawerProps({ confirmLoading: true });
          await grantData(values);
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
        deptTreeData,
        checkedKeys,
        deptCheckStrictlyRef,
      };
    },
  });
</script>
