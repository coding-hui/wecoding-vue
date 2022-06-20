<template>
  <div :class="prefixCls">
    <Select
      v-bind="getAttrs"
      v-model:value="state"
      :options="optionsRef"
      @change="handleChange"
      @click="handleFetch"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <template #suffixIcon v-if="loading">
        <LoadingOutlined spin />
      </template>
      <template #notFoundContent v-if="loading">
        <span>
          <LoadingOutlined spin class="mr-1" />
          {{ t('component.form.apiSelectNotFound') }}
        </span>
      </template>
    </Select>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, watch, onMounted, computed } from 'vue';
  import { Select } from 'ant-design-vue';
  import { isEmpty, isFunction } from '/@/utils/is';
  import { propTypes } from '/@/utils/propTypes';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { get, omit } from 'lodash-es';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDict } from '/@/components/Dict';
  import { useDesign } from '/@/hooks/web/useDesign';

  type OptionsItem = { label: string; value: string; disabled?: boolean };

  export default defineComponent({
    name: 'WeCodingSelect',
    components: { Select, LoadingOutlined },
    inheritAttrs: false,
    props: {
      value: {
        type: [Array, Object, String, Number] as PropType<Array<any> | object | string | number>,
      },
      labelValue: {
        type: [Array, Object, String, Number] as PropType<Array<any> | object | string | number>,
      },
      labelInValue: propTypes.bool,
      options: {
        type: Array as PropType<OptionsItem[]>,
        default: () => [],
      },
      api: {
        type: Function as PropType<(arg?: Recordable) => Promise<Recordable[] | OptionsItem[]>>,
        default: null,
      },
      params: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
      resultField: propTypes.string.def(''),
      labelField: propTypes.string.def('label'),
      valueField: propTypes.string.def('value'),
      immediate: propTypes.bool.def(true),
      alwaysLoad: propTypes.bool.def(false),
      numberToString: propTypes.bool,
      dictType: propTypes.string,
      mode: propTypes.string,
    },
    emits: ['options-change', 'change', 'click'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const attrs = useAttrs();
      const { prefixCls } = useDesign('select');
      const optionsRef = ref<Recordable[]>(props.options);
      const isFirstLoad = ref<Boolean>(false);
      const emitData = ref<any[]>([]);
      const loading = ref<Boolean>(false);

      const getAttrs = computed(() => {
        return {
          ...unref(attrs),
          ...(props as Recordable),
        };
      });

      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);

      if (!isEmpty(props.dictType)) {
        const { initSelectOptions } = useDict();
        initSelectOptions(optionsRef, props.dictType);
      }

      const getOptions = computed(() => {
        const { labelField, valueField, numberToString } = props;

        return unref(optionsRef).reduce((prev, next: Recordable) => {
          if (next) {
            const value = next[valueField];
            prev.push({
              ...omit(next, [labelField, valueField]),
              label: next[labelField],
              value: numberToString ? `${value}` : value,
            });
          }
          return prev;
        }, [] as OptionsItem[]);
      });

      watch(
        () => props.options,
        () => {
          optionsRef.value = props.options;
          emitChange();
        },
      );

      watch(
        () => props.params,
        () => {
          isFirstLoad.value && fetch();
        },
        { deep: true },
      );

      watch(
        () => props.immediate,
        (v) => {
          v && !isFirstLoad.value && fetch();
        },
      );

      onMounted(async () => {
        if (props.options && props.options.length > 0) {
          optionsRef.value = props.options;
        }
        if (props.immediate) {
          await fetch();
          isFirstLoad.value = true;
        }
      });

      async function fetch() {
        const { api } = props;
        if (!api || !isFunction(api)) return;
        optionsRef.value = [];
        try {
          loading.value = true;
          let res = await api(props.params);
          if (props.resultField) {
            res = get(res, props.resultField) || [];
          }
          if (Array.isArray(res)) {
            optionsRef.value = res;
          }
          emitChange();
        } catch (error) {
          console.warn(error);
        } finally {
          loading.value = false;
        }
      }

      async function handleFetch() {
        if (!props.immediate && !unref(isFirstLoad)) {
          await fetch();
          isFirstLoad.value = true;
        }
        emit('click');
      }

      function handleChange(_, ...args) {
        emitData.value = args;
      }

      function emitChange() {
        emit('options-change', unref(getOptions));
      }

      return { t, prefixCls, getAttrs, state, optionsRef, loading, handleFetch, handleChange };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-select';

  .@{prefix-cls} {
    width: 100%;
  }
</style>
