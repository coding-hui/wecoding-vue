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

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { grantRole, ownRole } from '/@/api/sys/user';
  import { findRoleList } from '/@/api/sys/role';

  export default defineComponent({
    name: 'UserModal',
    components: { BasicModal, BasicTable },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const userIdRef = ref();
      const title = ref();

      const { createMessage } = useMessage();
      const [registerTable, { reload, getSelectRows, setSelectedRowKeys }] = useTable({
        api: findRoleList,
        columns: [
          {
            title: '角色名称',
            dataIndex: 'name',
            align: 'left',
          },
          {
            title: '角色编码',
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

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        const { userId, realName } = data.record;
        userIdRef.value = userId;
        title.value = realName + '【授权角色】';
        await reload();
        ownRole(userId).then((res) => {
          setSelectedRowKeys(res);
        });
      });

      async function handleSubmit() {
        try {
          const rows = getSelectRows();
          if (rows.length === 0) {
            createMessage.warning('请至少选择一条记录');
            return;
          }
          setModalProps({ confirmLoading: true });

          const roleIds = rows.map((item) => {
            return item.roleId;
          });
          grantRole({ userId: unref(userIdRef), roleIds: roleIds })
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

      return { registerModal, registerTable, handleSubmit, title };
    },
  });
</script>
