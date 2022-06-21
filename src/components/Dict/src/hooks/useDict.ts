import { Ref } from 'vue';
import { isEmpty } from '/@/utils/is';
import { useUserStore } from '/@/store/modules/user';
import { getDictDataByType } from '/@/api/system/dict';
const userStore = useUserStore();

export function useDict() {
  const dictCache = userStore.getDictCacheByKey('dictCache', {});

  /**
   * 根据给定的字典类型，初始化字典数据
   *
   * @param dictTypes
   */
  async function initDict(dictTypes: string[] | Set<string> = []) {
    if (!dictTypes) return;
    for (const dictType of dictTypes) {
      if (!dictCache[dictType]) {
        dictCache[dictType] = await getDictDataByType(dictType);
      }
    }
  }

  /**
   * 从缓存中获取指定字典数据，没有返回空
   *
   * @param dictType
   */
  function getDictList(dictType: string): Recordable[] {
    return dictCache[dictType] || [];
  }

  /**
   * 获取字典回显名称，没有返回 '未知'
   *
   * @param dictType
   * @param value
   * @param defaultValue
   */
  function getDictLabel(dictType: string, value?: string, defaultValue = '未知'): string {
    const result: string[] = [];

    for (const item of getDictList(dictType)) {
      if (item && (',' + value + ',').includes(',' + item.value + ',')) {
        result.push(item.label);
      }
    }
    return result.length > 0 ? result.join(',') : defaultValue;
  }

  /**
   * 初始化下拉框，字典数据属性
   *
   * @param optionsRef
   * @param dictType
   */
  async function initSelectOptions(optionsRef: Ref, dictType?: string) {
    if (isEmpty(dictType)) return;
    await initDict([dictType]);
    const dictList = getDictList(dictType);
    optionsRef.value = dictList.map((item) => ({
      label: item.label,
      value: item.value,
      key: item.dictCode,
    }));
  }

  /**
   * 初始化树下拉框，字典数据属性
   *
   * @param treeData
   * @param dictType
   * @param buildToTree
   */
  async function initSelectTreeData(treeData: Ref, dictType: string, buildToTree: boolean) {
    if (isEmpty(dictType)) return;
    await initDict([dictType]);
    const dictList = getDictList(dictType);
    if (buildToTree) {
      // treeData.value = listToTree(dictList);
    } else {
      treeData.value = dictList;
    }
  }

  return { initDict, getDictList, getDictLabel, initSelectOptions, initSelectTreeData };
}
