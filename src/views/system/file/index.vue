<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('common.title.upload') }} </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:zoom-in-outlined',
                tooltip: t('common.title.preview'),
                onClick: handlePreviewFile.bind(null, record),
                ifShow: isPic.bind(null, record),
              },
              {
                icon: 'ant-design:download-outlined',
                tooltip: t('common.title.download'),
                onClick: handleDownloadFile.bind(null, record),
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
    <FileDrawer @register="registerFileDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { createImgPreview } from '/@/components/Preview/index';
  import { findFileList, removeFile, downloadFile } from '/@/api/oss/file';
  import FileDrawer from './fileDrawer.vue';
  import { columns, searchFormSchema } from './file.data';
  import { downloadByData } from '/@/utils/file/download';

  export default defineComponent({
    name: 'FileList',
    components: { BasicTable, TableAction, FileDrawer },
    setup: function () {
      const { t } = useI18n();
      const [registerFileDrawer, { openDrawer: openFileDrawer }] = useDrawer();
      const { createMessage } = useMessage();
      const [registerTable, { reload, setLoading }] = useTable({
        title: t('system.file.table.title'),
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
          title: t('common.column.action'),
          fixed: 'right',
          dataIndex: 'action',
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
          .catch(() => {
            createMessage.error(t('system.file.downloadError'));
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
        t,
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
