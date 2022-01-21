<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除角色',
              popConfirm: {
                placement: 'left',
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
          :drop-down-actions="[
            {
              label: '授权菜单',
              onClick: handleGrantMenu.bind(null, record),
            },
            {
              label: '授权数据',
              onClick: handleGrantData.bind(null, record),
            },
            {
              label: '分配用户',
              onClick: handleGrantData.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleModal @register="registerModal" @success="handleSuccess" />
    <RoleMenuDrawer @register="registerRoleMenuDrawer" @success="handleSuccess" />
    <RoleDeptDrawer @register="registerRoleDeptDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import { findRoleList, removeRole } from '/@/api/sys/role';

  import RoleModal from './RoleModal.vue';
  import RoleMenuDrawer from './RoleMenuDrawer.vue';
  import RoleDeptDrawer from './RoleDeptDrawer.vue';

  import { columns, searchFormSchema } from './role.data';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleModal, RoleMenuDrawer, RoleDeptDrawer, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerRoleMenuDrawer, { openDrawer: openRoleMenuDrawer }] = useDrawer();
      const [registerRoleDeptDrawer, { openDrawer: openRoleDataDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '角色列表',
        api: findRoleList,
        columns,
        rowKey: 'roleId',
        formConfig: {
          rowProps: {
            gutter: 20,
          },
          labelAlign: 'left',
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: true,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleGrantMenu(record: Recordable) {
        openRoleMenuDrawer(true, {
          record,
        });
      }

      function handleGrantData(record: Recordable) {
        openRoleDataDrawer(true, {
          record,
        });
      }

      function handleDelete(record: Recordable) {
        removeRole(record?.roleId).then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
      }

      return {
        registerTable,
        registerModal,
        registerRoleMenuDrawer,
        registerRoleDeptDrawer,
        handleCreate,
        handleEdit,
        handleGrantMenu,
        handleGrantData,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
