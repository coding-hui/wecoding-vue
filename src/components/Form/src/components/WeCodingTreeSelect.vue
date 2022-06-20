<template>
  <div :class="prefixCls">
    <a-tree-select
      v-bind="getAttrs"
      v-model:value="state"
      :treeData="treeDataRef"
      @click="handleFetch"
      @change="handleChange"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <template #notFoundContent v-if="loading">
        <span>
          <LoadingOutlined spin class="mr-1" />
          {{ t('component.form.apiSelectNotFound') }}
        </span>
      </template>
    </a-tree-select>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed, watch, onMounted, PropType } from 'vue';
  import { TreeSelect } from 'ant-design-vue';
  import { isArray, isEmpty, isFunction } from '/@/utils/is';
  import { propTypes } from '/@/utils/propTypes';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { get } from 'lodash-es';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDict } from '/@/components/Dict';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { TreeItem } from '/@/components/Tree';

  export default defineComponent({
    name: 'WeCodingTreeSelect',
    components: { ATreeSelect: TreeSelect, LoadingOutlined },
    props: {
      value: {
        type: [Array, Object, String, Number] as PropType<Array<any> | object | string | number>,
      },
      labelValue: {
        type: [Array, Object, String, Number] as PropType<Array<any> | object | string | number>,
      },
      labelInValue: propTypes.bool,
      treeData: {
        type: Array as PropType<Recordable[] | TreeItem[]>,
        default: () => [],
      },
      api: {
        type: Function as PropType<(arg?: Recordable) => Promise<Recordable[] | TreeItem[]>>,
        default: null,
      },
      params: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
      immediate: propTypes.bool.def(false),
      resultField: propTypes.string.def(''),
      dictType: propTypes.string,
    },
    emits: ['options-change', 'change', 'click'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const attrs = useAttrs();
      const { prefixCls } = useDesign('tree-select');
      const treeDataRef = ref<Recordable[]>(props.treeData);
      const isFirstLoaded = ref<Boolean>(false);
      const loading = ref<Boolean>(false);

      const getAttrs = computed(() => {
        return {
          showSearch: true,
          treeNodeFilterProp: 'title',
          fieldNames: {
            value: props.dictType ? 'value' : 'id',
            title: 'name',
          },
          dropdownStyle: { maxHeight: '300px' },
          getPopupContainer: () => document.body,
          ...unref(attrs),
          ...(props as Recordable),
        };
      });

      const [state] = useRuleFormItem(props);

      if (!isEmpty(props.dictType)) {
        const { initSelectTreeData } = useDict();
        initSelectTreeData(treeDataRef, props.dictType, false);
      }

      watch(
        () => props.treeData,
        () => {
          treeDataRef.value = props.treeData;
          emit('options-change', unref(treeDataRef));
        },
      );

      watch(
        () => props.params,
        () => {
          isFirstLoaded.value && fetch();
        },
        { deep: true },
      );

      watch(
        () => props.immediate,
        (v) => {
          v && !isFirstLoaded.value && fetch();
        },
      );

      onMounted(async () => {
        if (props.treeData && props.treeData.length > 0) {
          treeDataRef.value = props.treeData;
        }
        if (props.immediate) {
          await fetch();
          isFirstLoaded.value = true;
        }
      });

      async function fetch() {
        const { api } = props;
        if (!api || !isFunction(api)) return;
        loading.value = true;
        treeDataRef.value = [];
        let result;
        try {
          result = await api(props.params);
        } catch (e) {
          console.error(e);
        }
        loading.value = false;
        if (!result) return;
        if (!isArray(result)) {
          result = get(result, props.resultField);
        }
        treeDataRef.value = (result as Recordable[]) || [];
        isFirstLoaded.value = true;
        emit('options-change', treeDataRef.value);
      }

      async function handleFetch() {
        if (!props.immediate && !unref(isFirstLoaded)) {
          await fetch();
          isFirstLoaded.value = true;
        }
        emit('click');
      }

      function handleChange(...args) {
        emit('change', ...args);
      }

      return { t, prefixCls, getAttrs, state, treeDataRef, loading, handleFetch, handleChange };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-tree-select';

  .@{prefix-cls} {
    width: 100%;

    .ant-select-tree {
      padding: 4px;

      li {
        margin: 3px 0;

        .ant-select-tree-switcher {
          line-height: normal;
          vertical-align: baseline;
        }
      }
    }
  }
</style>
