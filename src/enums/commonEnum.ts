/**
 * @description: Data Action
 */
export enum ActionEnum {
  VIEW = 'view',
  ADD = 'add',
  ADD_CHILD = 'addChild',
  EDIT = 'edit',
  REMOVE = 'remove',
  COPY = 'copy',
  IMPORT = 'import',
  EXPORT = 'export',
}

/**
 * @description: Dict Type Enum
 */
export enum DictEnum {
  // 公共状态
  COMMON_STATUS = 'common_status',
  // 是或否
  YES_OR_NO = 'yes_or_no',
  // 菜单类型
  MENU_TYPE = 'menu_type',
  // 数据权限范围类型
  DATA_SCOPE_TYPE = 'data_scope_type',
  // 性别
  GENDER_TYPE = 'gender_type',
  // 存储类型
  SYS_FILE_STORAGE_TYPE = 'sys_file_storage_type',
  // 业务操作类型
  OP_TYPE = 'op_type',
  // 操作执行状态
  OP_RUN_STATUS = 'op_run_status',
  // 访问日志类型
  VIS_LOG_TYPE = 'vis_log_type',
}
