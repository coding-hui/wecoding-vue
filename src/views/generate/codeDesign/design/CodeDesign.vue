<template>
  <PageWrapper class="page-container" v-show="visibleRef" title="在线设计">
    <Card
      :tab-list="tabList"
      :active-tab-key="key"
      @tabChange="(key) => onTabChange(key, 'key')"
      :bordered="false"
    >
      <template #GenInfo="item">
        <span>
          <AppstoreAddOutlined />
          {{ item.label }}
        </span>
      </template>
      <template #FieldInfo="item">
        <span>
          <DatabaseOutlined />
          {{ item.label }}
        </span>
      </template>
      <BasicForm v-show="key === 'GenInfo'" @register="register">
        <template #TreeCode="{ model, field }">
          <Select v-model:value="model[field]">
            <SelectOption
              v-for="(column, index) in tableInfo.columns"
              :key="index"
              :value="column.columnName"
            >
              {{ column.columnName + '：' + column.columnComment }}
            </SelectOption>
          </Select>
        </template>
        <template #TreeParentCode="{ model, field }">
          <Select v-model:value="model[field]">
            <SelectOption
              v-for="(column, index) in tableInfo.columns"
              :key="index"
              :value="column.columnName"
            >
              {{ column.columnName + '：' + column.columnComment }}
            </SelectOption>
          </Select>
        </template>
        <template #TreeName="{ model, field }">
          <Select v-model:value="model[field]">
            <SelectOption
              v-for="(column, index) in tableInfo.columns"
              :key="index"
              :value="column.columnName"
            >
              {{ column.columnName + '：' + column.columnComment }}
            </SelectOption>
          </Select>
        </template>
        <template #SubTableName="{ model, field }">
          <Select v-model:value="model[field]" @change="subSelectChange">
            <SelectOption v-for="(table, index) in tables" :key="index" :value="table.tableName">
              {{ table.tableName + '：' + table.tableComment }}
            </SelectOption>
          </Select>
        </template>
        <template #SubTableFkName="{ model, field }">
          <Select v-model:value="model[field]">
            <SelectOption
              v-for="(column, index) in subRows"
              :key="index"
              :value="column.columnName"
            >
              {{ column.columnName + '：' + column.columnComment }}
            </SelectOption>
          </Select>
        </template>
      </BasicForm>
      <Table
        v-show="key === 'FieldInfo'"
        rowKey="columnId"
        size="small"
        :data-source="tableInfo.columns"
        :columns="tableColumns"
        :pagination="false"
        :scroll="{ y: tableHeight }"
      >
        <template #columnComment="{ record }">
          <div>
            <a-input
              v-model:value="record.columnComment"
              :disabled="!record.whetherPk && checkColumnEditable(record)"
            />
          </div>
        </template>
        <template #javaType="{ record }">
          <div>
            <Select
              style="width: 100%"
              v-model:value="record.javaType"
              :disabled="!record.whetherPk && checkColumnEditable(record)"
            >
              <SelectOption value="Long">Long</SelectOption>
              <SelectOption value="String">String</SelectOption>
              <SelectOption value="Integer">Integer</SelectOption>
              <SelectOption value="Double">Double</SelectOption>
              <SelectOption value="BigDecimal">BigDecimal</SelectOption>
              <SelectOption value="Date">Date</SelectOption>
              <SelectOption value="Boolean">Boolean</SelectOption>
            </Select>
          </div>
        </template>
        <template #javaField="{ record }">
          <div>
            <a-input
              v-model:value="record.javaField"
              :disabled="!record.whetherPk && checkColumnEditable(record)"
            />
          </div>
        </template>
        <template #whetherInsert="{ record }">
          <div>
            <Checkbox
              v-model:checked="record.whetherInsert"
              :disabled="checkColumnEditable(record)"
            />
          </div>
        </template>
        <template #whetherEdit="{ record }">
          <div>
            <Checkbox
              v-model:checked="record.whetherEdit"
              :disabled="checkColumnEditable(record)"
            />
          </div>
        </template>
        <template #whetherList="{ record }">
          <div>
            <Checkbox v-model:checked="record.whetherList" />
          </div>
        </template>
        <template #whetherQuery="{ record }">
          <div>
            <Checkbox v-model:checked="record.whetherQuery" />
          </div>
        </template>
        <template #queryType="{ record }">
          <div>
            <Select style="width: 100%" allowClear v-model:value="record.queryType">
              <SelectOption value="=">EQ</SelectOption>
              <SelectOption value="!=">NE</SelectOption>
              <SelectOption value=">">GT</SelectOption>
              <SelectOption value=">=">GTE</SelectOption>
              <SelectOption value="<">LT</SelectOption>
              <SelectOption value="<=">LTE</SelectOption>
              <SelectOption value="LIKE">LIKE</SelectOption>
              <SelectOption value="BETWEEN">BETWEEN</SelectOption>
            </Select>
          </div>
        </template>
        <template #htmlType="{ record }">
          <div>
            <Select style="width: 100%" allowClear v-model:value="record.htmlType">
              <SelectOption value="input">文本框</SelectOption>
              <SelectOption value="textarea">文本域</SelectOption>
              <SelectOption value="select">下拉框</SelectOption>
              <SelectOption value="radio">单选框</SelectOption>
              <SelectOption value="checkbox">复选框</SelectOption>
              <SelectOption value="datetime">日期控件</SelectOption>
              <SelectOption value="imageUpload">图片上传</SelectOption>
              <SelectOption value="fileUpload">文件上传</SelectOption>
              <SelectOption value="editor">富文本控件</SelectOption>
            </Select>
          </div>
        </template>
        <template #requiredWhether="{ record }">
          <div>
            <Checkbox
              v-model:checked="record.requiredWhether"
              :disabled="checkColumnEditable(record)"
            />
          </div>
        </template>
        <template #dictType="{ record }">
          <div>
            <Select
              style="width: 100%"
              allowClear
              v-model:value="record.dictType"
              :options="dictTypeList"
            />
          </div>
        </template>
      </Table>
    </Card>
    <template #rightFooter>
      <a-button style="margin-right: 10px" color="danger" @click="goBack"> 返回 </a-button>
      <a-button style="margin-right: 10px" color="success" @click="handlePreviewCode">
        预览
      </a-button>
      <a-button style="margin-right: 10px" color="warning" @click="handleSyncDB">
        同步数据库
      </a-button>
      <a-button type="primary" @click="submitAll"> 提交 </a-button>
    </template>
    <PreviewCodeModal @register="registerPreviewModal" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { Card, Table, Checkbox, Select, SelectOption } from 'ant-design-vue';
  import { DatabaseOutlined, AppstoreAddOutlined } from '@ant-design/icons-vue';
  import { BasicForm, useForm } from '/@/components/Form';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { columns, schemas } from './data';
  import PreviewCodeModal from '../PreviewCodeModal.vue';

  import { getGenTableById, syncDb, updateGenTable } from '/@/api/gen/table';
  import { findDictTypeOptions } from '/@/api/sys/dict';
  import { useLoading } from '/@/components/Loading';
  import { useModal } from '/@/components/Modal';

  export default defineComponent({
    name: 'CodeDesign',
    components: {
      BasicForm,
      PageWrapper,
      Card,
      Table,
      Checkbox,
      Select,
      SelectOption,
      DatabaseOutlined,
      AppstoreAddOutlined,
      PreviewCodeModal,
    },
    emits: ['visible-change', 'cancel', 'ok', 'update:visible'],
    setup(_, { emit }) {
      const tabList = [
        {
          key: 'GenInfo',
          label: '生成配置',
          slots: { tab: 'GenInfo' },
        },
        {
          key: 'FieldInfo',
          label: '字段信息',
          slots: { tab: 'FieldInfo' },
        },
      ];
      const tableColumns = columns;
      const { createMessage } = useMessage();
      const key = ref('GenInfo');
      const visibleRef = ref(false);
      const genData = reactive({
        tableInfo: {},
        tableRows: [],
        subRows: [],
        tables: [],
      });
      const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: '加载中...',
      });

      const dictTypeList = ref();

      const [register, { validate, setFieldsValue }] = useForm({
        baseColProps: {
          span: 6,
        },
        schemas: schemas,
        showActionButtonGroup: false,
      });

      const onTabChange = (value: string, type: string) => {
        if (type === 'key') {
          key.value = value;
        }
      };

      function open(data) {
        openFullLoading();
        getGenTableById(data.tableId)
          .then((res) => {
            visibleRef.value = true;
            let { tableInfo, rows, tables } = res;
            let jsonOptions = {};
            if (tableInfo.options) {
              jsonOptions = JSON.parse(tableInfo.options);
            }
            genData.tableInfo = Object.assign({}, tableInfo, jsonOptions);
            genData.tableRows = rows;
            genData.tables = tables;
            setFieldsValue(genData.tableInfo);
            getDictTypes();
          })
          .finally(() => {
            closeFullLoading();
          });
      }

      function getDictTypes() {
        findDictTypeOptions().then((res) => {
          dictTypeList.value = res;
        });
      }

      function checkColumnEditable(data) {
        return (
          data.columnName.indexOf('create_user') > -1 ||
          data.columnName.indexOf('create_time') > -1 ||
          data.columnName.indexOf('update_user') > -1 ||
          data.columnName.indexOf('update_time') > -1 ||
          data.columnName.indexOf('is_deleted') > -1 ||
          data.whetherPk
        );
      }

      function goBack() {
        visibleRef.value = false;
        emit('cancel');
      }

      function subSelectChange(val) {
        setSubTableColumns(val);
      }

      function setSubTableColumns(value) {
        for (let item in genData.tables) {
          const name = genData.tables[item].tableName;
          if (value == name) {
            genData.subRows = genData.tables[item].columns;
            break;
          }
        }
      }

      function handlePreviewCode() {
        openPreviewModal(true, {
          tableId: genData.tableInfo?.tableId,
        });
      }

      function handleSyncDB() {
        openFullLoading();
        syncDb(genData.tableInfo?.tableName).finally(() => {
          open({ tableId: genData.tableInfo?.tableId });
        });
      }

      async function submitAll() {
        openFullLoading();
        try {
          Promise.all([validate()])
            .then((values) => {
              let params = values[0];
              params.columns = genData.tableInfo.columns;
              params = JSON.parse(JSON.stringify(params));
              let options = {
                treeCode: params.treeCode,
                treeName: params.treeName,
                treeParentCode: params.treeParentCode,
                parentMenuId: params.parentMenuId,
              };
              params.options = JSON.stringify(options);
              updateGenTable(params).finally(() => {
                visibleRef.value = false;
                closeFullLoading();
                emit('ok');
              });
            })
            .catch(() => {
              createMessage.warning('表单验证未通过，请先完善数据');
            });
        } catch (error) {}
      }

      return {
        register,
        submitAll,
        goBack,
        onTabChange,
        checkColumnEditable,
        subSelectChange,
        setSubTableColumns,
        handlePreviewCode,
        registerPreviewModal,
        handleSyncDB,
        open,
        ...toRefs(genData),
        dictTypeList,
        tabList,
        key,
        visibleRef,
        tableHeight: document.documentElement.scrollHeight - 380,
        tableColumns: tableColumns,
      };
    },
  });
</script>

<style scoped></style>
