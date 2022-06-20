<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('common.title.add') }} </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <a @click="handleToDictData(record)" :title="record.type">
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.dataIndex === 'type'">
          <span v-text="record.type"></span>
          <CopyTwoTone class="ml-1" @click="handleCopy(record.type)" />
        </template>
        <template v-else-if="column.dataIndex === 'action'">
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
      </template>
    </BasicTable>
    <DictTypeDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDrawer } from '/@/components/Drawer';
  import { PageEnum } from '/@/enums/pageEnum';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { CopyTwoTone } from '@ant-design/icons-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import DictTypeDrawer from './DictTypeDrawer.vue';
  import { findDictTypeList, removeDictType } from '/@/api/sys/dict';
  import { tableColumns, searchForm } from './dictType.data';

  export default defineComponent({
    name: 'DictTypeList',
    components: { BasicTable, DictTypeDrawer, TableAction, CopyTwoTone },
    setup: function () {
      const go = useGo();
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const { clipboardRef, copiedRef } = useCopyToClipboard();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('system.dictType.table.title'),
        rowKey: 'dictId',
        api: findDictTypeList,
        columns: tableColumns,
        formConfig: searchForm,
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: true,
        canResize: false,
        actionColumn: {
          width: 80,
          title: t('common.column.action'),
          dataIndex: 'action',
          fixed: 'right',
        },
      });

      function handleCopy(type) {
        clipboardRef.value = type;
        if (unref(copiedRef)) {
          createMessage.success(t('common.tips.copySuccess'));
        }
      }

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
        removeDictType(record?.dictId).then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      function handleToDictData(record: Recordable) {
        go(`${PageEnum.DICT_DATA}/${record.type}?name=${record.name}`);
      }

      return {
        t,
        go,
        PageEnum,
        registerTable,
        registerDrawer,
        handleCopy,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleToDictData,
      };
    },
  });
</script>
