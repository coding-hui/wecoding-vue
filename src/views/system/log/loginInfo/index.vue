<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-popconfirm
          title="是否要清空日志?"
          ok-text="确定"
          cancel-text="我再想想"
          @confirm="handleClean"
        >
          <a-button type="danger"> 清空日志 </a-button>
        </a-popconfirm>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:eye',
              tooltip: '查看',
              onClick: handleEdit.bind(null, record),
            },
            {
              divider: true,
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              color: 'error',
              ifShow: record.logoutTime !== null,
              popConfirm: {
                placement: 'left',
                title: '是否删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <Modal @register="registerLogModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';

  import { findLogList, removeLog, cleanLog } from '/@/api/sys/loginLog';

  import Modal from './modal.vue';
  import { columns, searchFormSchema } from './index.data';

  export default defineComponent({
    name: 'Log',
    components: { BasicTable, TableAction, Modal },
    setup() {
      const [registerLogModal, { openModal: openLogModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '系统登录日志',
        api: findLogList,
        rowKey: 'id',
        columns,
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: true,
        canResize: false,
        formConfig: {
          baseColProps: { lg: 6, md: 8 },
          labelWidth: 90,
          schemas: searchFormSchema,
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openLogModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openLogModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        removeLog(record?.id).then(() => {
          reload();
        });
      }

      function handleClean() {
        cleanLog().then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerLogModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleClean,
        handleSuccess,
      };
    },
  });
</script>
