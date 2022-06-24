<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="danger" @click="handleClean"> {{ t('common.title.clean') }} </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                tooltip: t('common.title.view'),
                icon: 'ant-design:eye',
                onClick: handleEdit.bind(null, record),
              },
              {
                divider: true,
                icon: 'ant-design:delete-outlined',
                tooltip: t('common.title.remove'),
                color: 'error',
                ifShow: record.logoutTime !== null,
                popConfirm: {
                  placement: 'left',
                  title: `${t('common.tips.confirmRemove')}`,
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <Modal @register="registerLogModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { findLogList, removeLog, cleanLog } from '/@/api/system/loginLog';
  import Modal from './loginInfoModal.vue';
  import { columns, searchFormSchema } from './index.data';

  export default defineComponent({
    name: 'LoginLogList',
    components: { BasicTable, TableAction, Modal },
    setup() {
      const { t } = useI18n();
      const { createConfirm } = useMessage();
      const [registerLogModal, { openModal: openLogModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: t('system.loginLog.table.title'),
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
          title: t('common.column.action'),
          dataIndex: 'action',
          align: 'left',
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
        createConfirm({
          iconType: 'warning',
          title: t('common.tips.confirmClean'),
          onOk: async () => {
            try {
              await cleanLog();
              await reload();
            } catch (e) {}
          },
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        t,
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
