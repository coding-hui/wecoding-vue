<template>
  <div>
    <BasicTable v-show="!codeDesignVisible" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 导入 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:zoom-in-outlined',
              tooltip: '生成预览',
              onClick: handlePreviewCode.bind(null, record),
            },
            {
              icon: 'ant-design:code-outlined',
              tooltip: '生成代码',
              onClick: handleGenCode.bind(null, record),
            },
            {
              icon: 'ant-design:sync-outlined',
              tooltip: '同步数据库',
              onClick: handleSyncDB.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              onClick: handleCodeDesign.bind(null, record),
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
    <CodeDesign ref="codeDesign" @cancel="handleResetCodeDesign" @ok="handleResetCodeDesign" />
    <GenTableModal @register="registerModal" @success="handleSuccess" />
    <PreviewCodeModal @register="registerPreviewModal" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findGenTableList, removeGenTable, download, genCode, syncDb } from '/@/api/gen/table';

  import { useModal } from '/@/components/Modal';
  import { useLoading } from '/@/components/Loading';
  import GenTableModal from './GenTableModal.vue';
  import PreviewCodeModal from './PreviewCodeModal.vue';
  import CodeDesign from './design/CodeDesign.vue';
  import { CodeDesignMethods } from './design/typing';

  import { columns, searchFormSchema } from './genTable.data';
  import { downloadByData } from '/@/utils/file/download';

  const codeDesignVisible = ref(false);
  const codeDesign = ref<Nullable<CodeDesignMethods>>(null);

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '系统运行中，请稍后...',
  });
  const [registerModal, { openModal }] = useModal();
  const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '代码生成',
    api: findGenTableList,
    columns,
    rowKey: 'tableId',
    formConfig: {
      labelWidth: 90,
      baseColProps: { lg: 6, md: 8 },
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    showIndexColumn: true,
    canResize: false,
    actionColumn: {
      width: 180,
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

  function getCodeDesign() {
    const code = unref(codeDesign);
    if (!code) {
      throw new Error('code design is null!');
    }
    return code;
  }

  function handleGenCode(record: Recordable) {
    openFullLoading();
    if (record.generateType === '2') {
      genCode(record?.tableName).finally(() => {
        closeFullLoading();
      });
    } else {
      download(record?.tableName)
        .then((res) => {
          let contentDisposition = res.headers['content-disposition'];
          let patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*');
          let result = patt.exec(contentDisposition);
          let filename = 'WeCoding.zip';
          if (result && result.length > 1) {
            filename = result[1];
          }
          downloadByData(res.data, filename);
        })
        .finally(() => {
          closeFullLoading();
        });
    }
  }

  function handleSyncDB(record: Recordable) {
    openFullLoading();
    syncDb(record?.tableName).finally(() => {
      closeFullLoading();
    });
  }

  async function handleCodeDesign(record: Recordable) {
    codeDesignVisible.value = true;
    await getCodeDesign().open(record);
  }

  function handleResetCodeDesign() {
    codeDesignVisible.value = false;
    reload();
  }

  function handlePreviewCode(record: Recordable) {
    openPreviewModal(true, {
      tableId: record?.tableId,
    });
  }

  function handleDelete(record: Recordable) {
    removeGenTable(record?.tableId).then(() => {
      reload();
    });
  }

  function handleSuccess() {
    reload();
  }
</script>
