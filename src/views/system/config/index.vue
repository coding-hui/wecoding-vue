<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增配置 </a-button>
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
              tooltip: '删除部门',
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
    <ConfigModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findConfigList, removeConfig } from '/@/api/sys/config';

  import { useModal } from '/@/components/Modal';
  import ConfigModal from './ConfigModal.vue';

  import { columns, searchFormSchema } from './config.data';

  export default defineComponent({
    name: 'ConfigManagement',
    components: { BasicTable, ConfigModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '配置列表',
        api: findConfigList,
        columns,
        rowKey: 'configId',
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
        removeConfig(record?.configId).then(() => {
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
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
