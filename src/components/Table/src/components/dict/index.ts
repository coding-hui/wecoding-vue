import type { BasicColumn } from '/@/components/Table/src/types/table';

import { h } from 'vue';

import { DictLabel } from '/@/components/Dict';

export function renderDictLabelCell(column: BasicColumn) {
  const { dictType } = column;
  return ({ text: value }) => {
    return h(DictLabel, {
      dictType: dictType,
      dictValue: value,
    });
  };
}
