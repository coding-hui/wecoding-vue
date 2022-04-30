<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 上传文件 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:zoom-in-outlined',
              tooltip: '预览',
              onClick: handlePreviewFile.bind(null, record),
              ifShow: isPic.bind(null, record),
            },
            {
              icon: 'ant-design:download-outlined',
              tooltip: '下载',
              onClick: handleDownloadFile.bind(null, record),
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
    <FileDrawer @register="registerFileDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { createImgPreview } from '/@/components/Preview/index';

  import { findFileList, removeFile, downloadFile } from '/@/api/storage/file';

  import FileDrawer from './fileDrawer.vue';
  import { columns, searchFormSchema } from './file.data';
  import { downloadByData } from '/@/utils/file/download';

  export default defineComponent({
    name: 'File',
    components: { BasicTable, TableAction, FileDrawer },
    setup: function () {
      const [registerFileDrawer, { openDrawer: openFileDrawer }] = useDrawer();
      const [registerTable, { reload, setLoading }] = useTable({
        title: '文件信息',
        api: findFileList,
        rowKey: 'id',
        columns,
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: true,
        canResize: false,
        formConfig: {
          labelWidth: 90,
          baseColProps: { lg: 6, md: 8 },
          schemas: searchFormSchema,
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function isPic(record: Recordable) {
        const { suffix } = record;
        return (
          suffix === 'png' ||
          suffix === 'jpeg' ||
          suffix === 'jpg' ||
          suffix === 'gif' ||
          suffix === 'tif' ||
          suffix === 'bmp'
        );
      }

      function handleCreate() {
        openFileDrawer(true, {
          isUpdate: false,
        });
      }

      function handlePreviewFile(record: Recordable) {
        createImgPreview({ imageList: [record.url] });
      }

      function handleDownloadFile(record: Recordable) {
        setLoading(true);
        downloadFile({ id: record.id })
          .then((res) => {
            downloadByData(res.data, record.originalName);
          })
          .finally(() => {
            setLoading(false);
          });
      }

      function handleDelete(record: Recordable) {
        removeFile(record?.id).then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        isPic,
        registerFileDrawer,
        handleCreate,
        handleDelete,
        handleDownloadFile,
        handlePreviewFile,
        handleSuccess,
      };
    },
  });
</script>
