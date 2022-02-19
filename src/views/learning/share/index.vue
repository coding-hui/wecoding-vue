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
    <ShareDrawer @register="registerShareDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';

  import { findShareList, removeShare } from '/@/api/learning/share';

  import ShareDrawer from './ShareDrawer.vue';
  import { columns, searchFormSchema } from './share.data';

  export default defineComponent({
    name: 'Share',
    components: { BasicTable, TableAction, ShareDrawer },
    setup() {
      const [registerShareDrawer, { openDrawer: openShareDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '圈子',
        api: findShareList,
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
        openShareDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openShareDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        removeShare(record?.id).then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerShareDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
