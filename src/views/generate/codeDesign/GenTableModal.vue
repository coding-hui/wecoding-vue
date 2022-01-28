<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="导入数据表"
    width="60%"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable">
      <template #form-dsSelect="{ model, field }">
        <ApiSelect
          v-model:value="model[field]"
          :api="findGenDatasourceOptions"
          @change="handleDsChange"
        />
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';

  import { useMessage } from '/@/hooks/web/useMessage';

  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { ApiSelect } from '/@/components/Form';

  import { tableColumns, tableSearchFormSchema } from './genTable.data';

  import { findDbTableList, importDbTable } from '/@/api/gen/table';
  import { findGenDatasourceOptions } from '/@/api/gen/datasource';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
  const dsId = ref('');

  const [registerModal, { setModalProps, closeModal }] = useModalInner(() => {
    setModalProps({ confirmLoading: false });
  });

  const [registerTable, { reload, getSelectRows, getForm }] = useTable({
    title: '',
    api: findDbTableList,
    columns: tableColumns,
    clickToRowSelect: true,
    autoCreateKey: true,
    rowSelection: {
      type: 'checkbox',
    },
    formConfig: {
      labelWidth: 90,
      schemas: tableSearchFormSchema,
      compact: true,
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
      autoAdvancedLine: 1,
      showActionButtonGroup: true,
      actionColOptions: {
        span: 6,
      },
    },
    size: 'small',
    inset: true,
    useSearchForm: true,
    showTableSetting: false,
    showIndexColumn: false,
    canResize: false,
  });

  findGenDatasourceOptions();

  function handleDsChange(name, option) {
    if (!name) {
      return;
    }
    dsId.value = option.id;
    reload();
  }

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      let selectRows = getSelectRows();
      if (selectRows.length === 0) {
        createMessage.warning('请至少选择一条数据');
        return;
      }

      const params = {
        tables: selectRows,
        dsName: getForm().getFieldsValue().dsName,
        dsId: unref(dsId),
      };
      importDbTable(params)
        .then(() => {
          emit('success');
        })
        .finally(() => {});
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
