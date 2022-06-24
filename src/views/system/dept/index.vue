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
                icon: 'clarity:note-edit-line',
                tooltip: t('common.title.edit'),
                onClick: handleEdit.bind(null, record),
              },
              {
                divider: true,
                icon: 'ant-design:plus-outlined',
                tooltip: t('common.title.addChild'),
                onClick: handleCreateChild.bind(null, record),
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
      </template>
    </BasicTable>
    <DeptDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { listToTree } from '/@/utils/helper/treeHelper';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findDeptList, removeDept } from '/@/api/system/dept';
  import { useDrawer } from '/@/components/Drawer';
  import DeptDrawer from './DeptDrawer.vue';
  import { columns, searchFormSchema } from './dept.data';

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTable, DeptDrawer, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('system.dept.table.title'),
        api: findDeptList,
        afterFetch: (result) => {
          return listToTree(result, { id: 'deptId', pid: 'parentId' });
        },
        columns,
        rowKey: 'deptId',
        isTreeTable: true,
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: false,
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

      function handleCreateChild(record: Recordable) {
        openDrawer(true, {
          parentId: record?.deptId,
          actionType: ActionEnum.ADD_CHILD,
        });
      }

      function handleDelete(record: Recordable) {
        removeDept(record?.deptId).then(() => {
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
        handleCreateChild,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
