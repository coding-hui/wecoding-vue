<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="dashed" @click="goBack"> {{ t('common.back') }} </a-button>
        <a-button type="primary" @click="handleCreate"> {{ t('common.title.add') }} </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'dictCode'">
          <a @click="handleEdit(record)" :title="record.dictCode">
            {{ record.label }}
          </a>
        </template>
        <template v-else-if="column.dataIndex === 'listClass'">
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
    <DictDataDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Tag, Badge } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { findDictDataList, removeDictData } from '/@/api/system/dict';
  import { useGo } from '/@/hooks/web/usePage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDrawer } from '/@/components/Drawer';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { propTypes } from '/@/utils/propTypes';
  import DictDataDrawer from './DictDataDrawer.vue';
  import { columns, searchForm } from './dictData.data';

  export default defineComponent({
    name: 'DictData',
    components: { BasicTable, DictDataDrawer, TableAction, Icon, Tag, Badge },
    props: {
      type: propTypes.string.def(''),
      name: propTypes.string.def(''),
    },
    setup(props) {
      const go = useGo();
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: `【${props.name}】字典项`,
        rowKey: 'dictCode',
        columns,
        api: findDictDataList,
        beforeFetch: (params) => {
          params.type = props.type;
        },
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

      function handleCreate() {
        openDrawer(true, {
          actionType: ActionEnum.ADD,
          dictType: props.type,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          actionType: ActionEnum.EDIT,
          dictType: props.type,
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

      function goBack() {
        go('/system/dict');
      }

      return {
        t,
        goBack,
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
