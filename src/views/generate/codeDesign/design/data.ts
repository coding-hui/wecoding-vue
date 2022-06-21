import { FormSchema } from '/@/components/Form';

import { findMenuSelect } from '/@/api/system/menu';

export const columns = [
  {
    title: '列名',
    dataIndex: 'columnName',
    align: 'left',
    width: '10%',
    key: 'columnName',
    ellipsis: true,
  },
  {
    title: '列描述',
    dataIndex: 'columnComment',
    align: 'left',
    width: '10%',
    key: 'columnComment',
    slots: { customRender: 'columnComment' },
    ellipsis: true,
  },
  {
    title: '物理类型',
    dataIndex: 'columnType',
    align: 'left',
    width: '8%',
    key: 'columnType',
  },
  {
    title: 'Java类型',
    dataIndex: 'javaType',
    align: 'left',
    width: '10%',
    key: 'javaType',
    slots: { customRender: 'javaType' },
  },
  {
    title: 'Java属性',
    dataIndex: 'javaField',
    align: 'left',
    width: '10%',
    key: 'javaField',
    slots: { customRender: 'javaField' },
  },
  {
    title: '插入',
    dataIndex: 'whetherInsert',
    align: 'center',
    key: 'whetherInsert',
    width: '3%',
    slots: { customRender: 'whetherInsert' },
  },
  {
    title: '编辑',
    dataIndex: 'whetherEdit',
    align: 'center',
    key: 'whetherEdit',
    width: '3%',
    slots: { customRender: 'whetherEdit' },
  },
  {
    title: '列表',
    dataIndex: 'whetherList',
    align: 'center',
    key: 'whetherList',
    width: '3%',
    slots: { customRender: 'whetherList' },
  },
  {
    title: '查询',
    dataIndex: 'whetherQuery',
    align: 'center',
    key: 'whetherQuery',
    width: '3%',
    slots: { customRender: 'whetherQuery' },
  },
  {
    title: '查询方式',
    dataIndex: 'queryType',
    align: 'left',
    key: 'queryType',
    width: '10%',
    slots: { customRender: 'queryType' },
  },
  {
    title: '必填',
    dataIndex: 'requiredWhether',
    align: 'center',
    width: '3%',
    key: 'requiredWhether',
    slots: { customRender: 'requiredWhether' },
  },
  {
    title: '显示类型',
    dataIndex: 'htmlType',
    align: 'left',
    key: 'htmlType',
    width: '10%',
    slots: { customRender: 'htmlType' },
  },
  {
    title: '字典类型',
    dataIndex: 'dictType',
    align: 'left',
    key: 'dictType',
    width: '10%',
    slots: { customRender: 'dictType' },
  },
];

const isZip = (type: string) => type === '1';
// const isCustom = (type: string) => type === '2';
// const isCrud = (type: string) => type === 'crud';
const isTree = (type: string) => type === 'tree';
const isSub = (type: string) => type === 'sub';

export const schemas: FormSchema[] = [
  {
    label: '',
    field: 'tableId',
    component: 'Input',
    show: false,
  },
  {
    field: 'tableName',
    component: 'Input',
    label: '表名称',
    required: true,
  },
  {
    field: 'tableComment',
    component: 'Input',
    label: '表描述',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'authorName',
    component: 'Input',
    label: '作者',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'className',
    component: 'Input',
    label: '实体类名称',
    required: true,
  },
  {
    field: 'generatePlan',
    component: 'Select',
    componentProps: {
      dictType: 'gen_template_plan',
    },
    label: '生成方案',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'packageName',
    component: 'Input',
    label: '生成包路径',
    helpMessage: '生成在哪个java包下，例如 top.wecoding.system',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'moduleName',
    component: 'Input',
    label: '生成模块名',
    helpMessage: '子系统名，例如 system',
    required: true,
  },
  {
    field: 'businessName',
    component: 'Input',
    label: '生成业务名',
    helpMessage: '功能英文名，例如 user',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'functionName',
    component: 'Input',
    label: '生成功能名',
    helpMessage: '用作类描述，例如 用户',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'parentMenuId',
    component: 'TreeSelect',
    label: '上级菜单',
    helpMessage: '分配到指定菜单下，例如 系统管理',
    componentProps: {
      api: findMenuSelect,
      replaceFields: {
        title: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'formStyle',
    component: 'RadioButtonGroup',
    label: '表单风格',
    componentProps: {
      dictType: 'gen_form_style',
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'generateType',
    component: 'RadioButtonGroup',
    label: '生成代码方式',
    helpMessage: '默认为zip压缩包下载，也可以自定义生成路径',
    componentProps: {
      dictType: 'gen_download_type',
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'generatePath',
    component: 'Input',
    label: '生成路径',
    helpMessage: '填写磁盘绝对路径，若不填写，则生成到当前Web项目下',
    colProps: {
      span: 24,
    },
    ifShow: ({ values }) => !isZip(values.generateType),
  },
  {
    field: '',
    component: 'Divider',
    label: '其他信息',
    ifShow: ({ values }) => isTree(values.generatePlan),
    colProps: {
      span: 24,
    },
  },
  {
    field: 'treeCode',
    component: 'Input',
    slot: 'TreeCode',
    helpMessage: '树显示的编码字段名， 如：dept_id',
    label: '树编码字段',
    ifShow: ({ values }) => isTree(values.generatePlan),
  },
  {
    field: 'treeParentCode',
    component: 'Input',
    slot: 'TreeParentCode',
    helpMessage: '树显示的父编码字段名， 如：parent_Id',
    label: '树父编码字段',
    ifShow: ({ values }) => isTree(values.generatePlan),
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'treeName',
    component: 'Input',
    slot: 'TreeName',
    helpMessage: '树节点的显示名称字段名， 如：dept_name',
    label: '树名称字段',
    ifShow: ({ values }) => isTree(values.generatePlan),
    colProps: {
      offset: 2,
    },
  },
  {
    field: '',
    component: 'Divider',
    label: '关联信息',
    ifShow: ({ values }) => isSub(values.generatePlan),
    colProps: {
      span: 24,
    },
  },
  {
    field: 'subTableName',
    component: 'Input',
    slot: 'SubTableName',
    helpMessage: '关联子表的表名， 如：sys_user',
    label: '关联子表的表名',
    ifShow: ({ values }) => isSub(values.generatePlan),
  },
  {
    field: 'subTableFkName',
    component: 'Input',
    slot: 'SubTableFkName',
    helpMessage: '关联子表的表名， 如：sys_user',
    label: '子表关联的外键名',
    ifShow: ({ values }) => isSub(values.generatePlan),
    colProps: {
      offset: 2,
    },
  },
];
