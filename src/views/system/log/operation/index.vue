<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
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
              onClick: handleDetail.bind(null, record),
            },
            {
              divider: true,
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '确认删除？',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <LogModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findLogList, removeLog, cleanLog } from '/@/api/sys/operlog';

  import { useModal } from '/@/components/Modal';
  import LogModal from './LogModal.vue';

  import { columns, searchFormSchema } from './log.data';

  export default defineComponent({
    name: 'OpLog',
    components: { BasicTable, LogModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '操作日志',
        api: findLogList,
        columns,
        rowKey: 'id',
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: true,
        canResize: false,
        formConfig: {
          baseColProps: { lg: 6, md: 8 },
          labelWidth: 90,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
          showAdvancedButton: true,
        },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

      function handleClean() {
        cleanLog().then(() => {
          reload();
        });
      }

      function handleDetail(record: Recordable) {
        openModal(true, {
          record,
        });
      }

      function handleDelete(record: Recordable) {
        removeLog(record?.id).then(() => {
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
        handleClean,
        handleDetail,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
