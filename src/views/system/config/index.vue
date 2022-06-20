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
              divider: true,
              icon: 'ant-design:delete-outlined',
              tooltip: t('common.title.remove'),
              color: 'error',
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
    <ConfigDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findConfigList, removeConfig } from '/@/api/sys/config';
  import { useDrawer } from '/@/components/Drawer';
  import ConfigDrawer from './ConfigDrawer.vue';
  import { columns, searchFormSchema } from './config.data';

  export default defineComponent({
    name: 'ConfigList',
    components: { BasicTable, ConfigDrawer, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('system.config.table.title'),
        api: findConfigList,
        columns,
        rowKey: 'configId',
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: true,
        canResize: false,
        formConfig: {
          compact: true,
          labelWidth: 90,
          schemas: searchFormSchema,
          baseColProps: { lg: 6, md: 8 },
        },
        actionColumn: {
          width: 80,
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
        removeConfig(record?.configId).then(() => {
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
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
