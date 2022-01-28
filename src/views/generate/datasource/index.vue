<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
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
              divider: true,
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              color: 'error',
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
    <GenDatasourceModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findGenDatasourceList, removeGenDatasource } from '/@/api/gen/datasource';

  import { useModal } from '/@/components/Modal';
  import GenDatasourceModal from './GenDatasourceModal.vue';

  import { columns, searchFormSchema } from './genDatasource.data';

  export default defineComponent({
    name: 'GenDatasourceManagement',
    components: { BasicTable, GenDatasourceModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '数据源配置',
        api: findGenDatasourceList,
        columns,
        rowKey: 'id',
        formConfig: {
          labelWidth: 90,
          schemas: searchFormSchema,
          compact: true,
          autoSubmitOnEnter: true,
          showAdvancedButton: true,
          autoAdvancedLine: 1,
          showActionButtonGroup: true,
          actionColOptions: {
            span: 6,
          },
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

      function handleDelete(record: Recordable) {
        removeGenDatasource(record?.id).then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
