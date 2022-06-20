<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="danger" @click="handleClean"> {{ t('common.title.clean') }} </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              tooltip: t('common.title.view'),
              icon: 'ant-design:eye',
              onClick: handleDetail.bind(null, record),
            },
            {
              divider: true,
              tooltip: t('common.title.remove'),
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: `${t('common.tips.confirmRemove')}`,
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
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findLogList, removeLog, cleanLog } from '/@/api/sys/operlog';
  import { useModal } from '/@/components/Modal';
  import LogModal from './logModal.vue';
  import { columns, searchFormSchema } from './log.data';

  export default defineComponent({
    name: 'OpLogList',
    components: { BasicTable, LogModal, TableAction },
    setup() {
      const { t } = useI18n();
      const { createConfirm } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: t('system.opLog.table.title'),
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
          title: t('common.column.action'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

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

      return {
        t,
        registerTable,
        registerModal,
        handleClean,
        handleDetail,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
