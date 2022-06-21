<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="title"
    width="60%"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { grantRole, ownRole } from '/@/api/system/user';
  import { findRoleList } from '/@/api/system/role';

  export default defineComponent({
    name: 'UserModal',
    components: { BasicModal, BasicTable },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const userIdRef = ref();
      const title = ref();
      const { createMessage } = useMessage();
      const { t } = useI18n();

      const [registerTable, { reload, getSelectRows, setSelectedRowKeys }] = useTable({
        api: findRoleList,
        columns: [
          {
            title: t('system.role.name'),
            dataIndex: 'name',
            align: 'left',
          },
          {
            title: t('system.role.code'),
            dataIndex: 'code',
            align: 'left',
          },
        ],
        immediate: false,
        rowKey: 'roleId',
        useSearchForm: false,
        showTableSetting: false,
        showIndexColumn: true,
        inset: true,
        rowSelection: {
          type: 'checkbox',
        },
        canResize: false,
      });

      const [registerModal, { setDrawerProps, closeDrawer }] = useModalInner(async (data) => {
        setDrawerProps({ loading: true });
        const { userId, realName } = data.record;
        userIdRef.value = userId;
        title.value = realName + `【${t('common.title.grantRole')}】`;
        await reload();
        const res = await ownRole(userId);
        setSelectedRowKeys(res);
        setDrawerProps({ loading: false });
      });

      async function handleSubmit() {
        try {
          const rows = getSelectRows();
          if (rows.length === 0) {
            createMessage.warning(t('common.tips.leastSelectOneRecord'));
            return;
          }
          setDrawerProps({ confirmLoading: true });

          const roleIds = rows.map((item) => {
            return item.roleId;
          });
          await grantRole({ userId: unref(userIdRef), roleIds: roleIds });
          setTimeout(closeDrawer);
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerTable, handleSubmit, title };
    },
  });
</script>
