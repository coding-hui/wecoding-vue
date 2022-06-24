<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('common.title.add') }} </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                tooltip: t('common.title.edit'),
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                tooltip: t('common.title.addChild'),
                icon: 'ant-design:plus-outlined',
                onClick: handleCreateChild.bind(null, record),
                ifShow: !isButton(record.type),
              },
              {
                tooltip: t('common.title.remove'),
                icon: 'ant-design:delete-outlined',
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
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { listToTree } from '/@/utils/helper/treeHelper';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findMenuList, removeMenu } from '/@/api/system/menu';
  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';
  import { columns, searchFormSchema, isButton } from './menu.data';

  export default defineComponent({
    name: 'MenuList',
    components: { BasicTable, MenuDrawer, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('system.menu.table.title'),
        api: findMenuList,
        afterFetch: (result) => {
          return listToTree(result, { id: 'menuId', pid: 'parentId' });
        },
        columns,
        rowKey: 'menuId',
        formConfig: {
          baseColProps: { lg: 6, md: 8 },
          labelWidth: 90,
          compact: true,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: false,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 120,
          title: t('common.column.action'),
          dataIndex: 'action',
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          actionType: ActionEnum.ADD,
        });
      }

      function handleCreateChild(record: Recordable) {
        openDrawer(true, {
          parentId: record?.menuId,
          actionType: ActionEnum.ADD_CHILD,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          actionType: ActionEnum.EDIT,
        });
      }

      function handleDelete(record: Recordable) {
        removeMenu(record?.menuId).then(() => {
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
        handleCreateChild,
        handleEdit,
        handleDelete,
        handleSuccess,
        isButton,
      };
    },
  });
</script>
