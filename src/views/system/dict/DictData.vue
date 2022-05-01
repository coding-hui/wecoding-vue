<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="dashed" @click="goBack"> 返回 </a-button>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #Label="{ record }">
        <a @click="handleEdit(record)" :title="record.dictCode">
          {{ record.label }}
        </a>
      </template>
      <template #ListClass="{ record }">
        <template v-if="record.listClass?.startsWith('tag ')">
          <Tag :color="record.listClass?.substring(4)" :title="record.label">
            <Icon v-if="record.icon && record.icon != ''" :icon="record.icon" class="pr-1" />
            {{ record.label }}
          </Tag>
        </template>
        <template v-else-if="record.listClass?.startsWith('badge ')">
          <Icon v-if="record.icon && record.icon != ''" :icon="record.icon" class="pr-1" />
          <Badge
            :status="
              record.listClass === 'badge error'
                ? 'error'
                : record.listClass === 'badge success'
                ? 'success'
                : record.listClass === 'badge warning'
                ? 'warning'
                : record.listClass === 'badge processing'
                ? 'processing'
                : 'default'
            "
            :text="record.label"
            :title="record.label"
          />
        </template>
        <template v-else>
          <span :class="record.listClass" :style="record.cssClass" :title="record.label">
            <Icon v-if="record.icon && record.icon != ''" :icon="record.icon" class="pr-1" />
            {{ record.label }}
          </span>
        </template>
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
  import { Tag, Badge } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findDictDataList, removeDictData } from '/@/api/sys/dict';

  import { useRoute } from 'vue-router';
  import { useGo } from '/@/hooks/web/usePage';
  import { useModal } from '/@/components/Modal';
  import DictDataModal from './DictDataModal.vue';

  import { columns, searchForm } from './dictData.data';

  export default defineComponent({
    name: 'DictData',
    components: { BasicTable, DictTypeModal: DictDataModal, TableAction, Icon, Tag, Badge },
    setup() {
      const route = useRoute();
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '字典数据',
        rowKey: 'dictCode',
        columns,
        api: findDictDataList,
        beforeFetch: (params) => {
          params.type = route.params.type;
        },
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
