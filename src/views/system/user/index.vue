<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增用户 </a-button>
      </template>
      <template #Avatar="{ record }">
        <img class="user-avatar" :src="record.avatar" @click="handlePreviewAvatar(record.avatar)" />
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
              icon: 'ant-design:security-scan-outlined',
              tooltip: '授权角色',
              onClick: handleGrantRole.bind(null, record),
            },
            {
              divider: true,
              icon: 'ant-design:delete-outlined',
              tooltip: '删除用户',
              color: 'error',
              popConfirm: {
                placement: 'left',
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserModal @register="registerModal" @success="handleSuccess" />
    <GrantRoleModal @register="registerGrantRoleModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { createImgPreview } from '/@/components/Preview/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findUserList, removeUser } from '/@/api/sys/user';

  import { useModal } from '/@/components/Modal';
  import UserModal from './UserModal.vue';
  import GrantRoleModal from './GrantRoleModal.vue';

  import { columns, searchFormSchema } from './user.data';

  export default defineComponent({
    name: 'ConfigManagement',
    components: { BasicTable, UserModal, GrantRoleModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerGrantRoleModal, { openModal: openGrantRoleModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '用户列表',
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
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: true,
        canResize: false,
        actionColumn: {
          width: 100,
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

      function onFetchSuccess() {
        // 演示默认展开所有表项
      }

      return {
        registerTable,
        registerModal,
        registerGrantRoleModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handlePreviewAvatar,
        onFetchSuccess,
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
