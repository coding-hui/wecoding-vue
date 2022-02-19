<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增字典 </a-button>
      </template>
      <template #Type="{ record }">
        <a @click="go(`${PageEnum.DICT_DATA}/${record.type}`)" :title="record.type">
          {{ record.type }}
        </a>
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
              tooltip: '删除字典',
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
    <DictTypeModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findDictTypeList, removeDictType } from '/@/api/sys/dict';

  import { useGo } from '/@/hooks/web/usePage';
  import { useModal } from '/@/components/Modal';
  import DictTypeModal from './DictTypeModal.vue';
  import { PageEnum } from '/@/enums/pageEnum';

  import { tableColumns, searchForm } from './dictType.data';

  export default defineComponent({
    name: 'DictManagement',
    components: { BasicTable, DictTypeModal, TableAction },
    setup() {
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '字典列表',
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
        removeDictType(record?.dictId).then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        go,
        PageEnum,
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
