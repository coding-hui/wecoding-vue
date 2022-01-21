<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="dashed" @click="goBack"> 返回 </a-button>
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
  import { findDictDataList, removeDictData } from '/@/api/sys/dict';

  import { useRoute } from 'vue-router';
  import { useGo } from '/@/hooks/web/usePage';
  import { useModal } from '/@/components/Modal';
  import DictDataModal from './DictDataModal.vue';

  import { columns, searchFormSchema } from './dictData.data';

  export default defineComponent({
    name: 'DictData',
    components: { BasicTable, DictTypeModal: DictDataModal, TableAction },
    setup() {
      const route = useRoute();
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '字典数据',
        api: findDictDataList,
        columns,
        rowKey: 'dictCode',
        beforeFetch: (params) => {
          params.type = route.params.type;
        },
        formConfig: {
          labelWidth: 40,
          labelAlign: 'left',
          rowProps: {
            gutter: 20,
          },
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
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
          dictType: route.params.type,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
          dictType: route.params.type,
        });
      }

      function handleDelete(record: Recordable) {
        removeDictData(record?.dictCode).then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
      }

      function goBack() {
        go('/system/dict');
      }

      return {
        goBack,
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
