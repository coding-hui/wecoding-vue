<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('common.title.add') }} </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: t('common.title.edit'),
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: t('common.title.remove'),
              popConfirm: {
                placement: 'left',
                title: `${t('common.tips.confirmRemove')}`,
                confirm: handleDelete.bind(null, record),
              },
            },
            {
              icon: 'ant-design:menu-fold-outlined',
              tooltip: t('common.title.grantMenu'),
              onClick: handleGrantMenu.bind(null, record),
            },
            {
              icon: 'ant-design:database-outlined',
              tooltip: t('common.title.grantData'),
              onClick: handleGrantData.bind(null, record),
            },
            {
              icon: 'ant-design:usergroup-add-outlined',
              tooltip: t('common.title.assignUser'),
              onClick: handleEdit.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
    <RoleMenuDrawer @register="registerRoleMenuDrawer" @success="handleSuccess" />
    <RoleDeptDrawer @register="registerRoleDeptDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { findRoleList, removeRole } from '/@/api/sys/role';
  import RoleDrawer from './RoleDrawer.vue';
  import RoleMenuDrawer from './RoleMenuDrawer.vue';
  import RoleDeptDrawer from './RoleDeptDrawer.vue';
  import { columns, searchFormSchema } from './role.data';

  export default defineComponent({
    name: 'RoleList',
    components: { BasicTable, RoleDrawer, RoleMenuDrawer, RoleDeptDrawer, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerRoleMenuDrawer, { openDrawer: openRoleMenuDrawer }] = useDrawer();
      const [registerRoleDeptDrawer, { openDrawer: openRoleDataDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('system.role.table.title'),
        api: findRoleList,
        columns,
        rowKey: 'roleId',
        formConfig: {
          baseColProps: { lg: 6, md: 8 },
          labelWidth: 90,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: true,
        canResize: false,
        actionColumn: {
          width: 120,
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

      function handleCreate() {
        openDrawer(true, {
          actionType: ActionEnum.ADD,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          actionType: ActionEnum.EDIT,
          record,
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

      return {
        t,
        registerTable,
        registerDrawer,
        registerRoleMenuDrawer,
        registerRoleDeptDrawer,
        handleCreate,
        handleEdit,
        handleGrantMenu,
        handleGrantData,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
