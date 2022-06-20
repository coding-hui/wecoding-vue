<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'system:user:save'" type="primary" @click="handleCreate">
          {{ t('common.title.add') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatar'">
          <img
            class="user-avatar"
            :src="record.avatar"
            @click="handlePreviewAvatar(record.avatar)"
          />
        </template>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: t('common.title.edit'),
              onClick: handleEdit.bind(null, record),
              auth: 'system:user:update',
            },
            {
              icon: 'ant-design:security-scan-outlined',
              tooltip: t('common.title.grantRole'),
              onClick: handleGrantRole.bind(null, record),
              auth: 'system:user:grant',
            },
            {
              divider: true,
              icon: 'ant-design:delete-outlined',
              tooltip: t('common.title.remove'),
              color: 'error',
              auth: 'system:user:remove',
              popConfirm: {
                placement: 'left',
                title: `${t('common.tips.confirmRemove')}`,
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserDrawer @register="registerDrawer" @success="handleSuccess" />
    <GrantRoleModal @register="registerGrantRoleModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { createImgPreview } from '/@/components/Preview/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findUserList, removeUser } from '/@/api/sys/user';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import UserDrawer from './UserDrawer.vue';
  import GrantRoleModal from './GrantRoleModal.vue';
  import { columns, searchFormSchema } from './user.data';

  export default defineComponent({
    name: 'UserList',
    components: { BasicTable, UserDrawer, GrantRoleModal, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerGrantRoleModal, { openModal: openGrantRoleModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: t('system.user.table.title'),
        api: findUserList,
        columns,
        rowKey: 'userId',
        formConfig: {
          baseColProps: { lg: 6, md: 8 },
          labelWidth: 90,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
          rowProps: {
            gutter: 20,
          },
        },
        canResize: false,
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: true,
        actionColumn: {
          width: 100,
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
          record,
          actionType: ActionEnum.EDIT,
        });
      }

      function handleDelete(record: Recordable) {
        removeUser(record?.userId).then(() => {
          reload();
        });
      }

      function handleGrantRole(record: Recordable) {
        openGrantRoleModal(true, {
          record,
        });
      }

      function handleSuccess() {
        reload();
      }

      function handlePreviewAvatar(avatar: string) {
        createImgPreview({ imageList: [avatar] });
      }

      return {
        t,
        registerTable,
        registerDrawer,
        registerGrantRoleModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handlePreviewAvatar,
        handleGrantRole,
      };
    },
  });
</script>

<style scoped lang="less">
  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
</style>
