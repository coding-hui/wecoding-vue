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
    <DictDrawer @register="registerDictDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';

  import { findDictList, removeDict } from '/@/api/learning/dict';

  import DictDrawer from './DictDrawer.vue';
  import { columns, searchFormSchema } from './dict.data';

  export default defineComponent({
    name: 'Dict',
    components: { BasicTable, TableAction, DictDrawer },
    setup() {
      const [registerDictDrawer, { openDrawer: openDictDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '词库',
        api: findDictList,
        rowKey: 'id',
        columns,
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: true,
        canResize: false,
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
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openDictDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDictDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        removeDict(record?.id).then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDictDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
