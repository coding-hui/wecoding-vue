<template>
  <template v-for="item in dictList" :key="item.id">
    <span v-if="(',' + props.dictValue + ',').includes(',' + item.value + ',')" :class="prefixCls">
      <template v-if="item.listClass?.startsWith('tag ')">
        <Tag :color="item.listClass?.substring(4)" :title="item.label">
          <Icon v-if="props.icon && item.icon && item.icon != ''" :icon="item.icon" class="pr-1" />
          {{ item.label }}
        </Tag>
      </template>
      <template v-else-if="item.listClass?.startsWith('badge ')">
        <Icon v-if="props.icon && item.icon && item.icon != ''" :icon="item.icon" class="pr-1" />
        <Badge
          :status="
            item.listClass === 'badge error'
              ? 'error'
              : item.listClass === 'badge success'
              ? 'success'
              : item.listClass === 'badge warning'
              ? 'warning'
              : item.listClass === 'badge processing'
              ? 'processing'
              : 'default'
          "
          :text="item.label"
          :title="item.label"
        />
      </template>
      <template v-else>
        <span :class="item.listClass" :style="item.cssClass" :title="item.label">
          <Icon v-if="props.icon && item.icon && item.icon != ''" :icon="item.icon" class="pr-1" />
          {{ item.label }}
        </span>
      </template>
    </span>
  </template>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Tag, Badge } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { propTypes } from '/@/utils/propTypes';
  import { useDict } from '../hooks/useDict';
  import { useDesign } from '/@/hooks/web/useDesign';

  const { getDictList } = useDict();

  export default defineComponent({
    components: { Tag, Badge, Icon },
    inheritAttrs: false,
    props: {
      dictType: propTypes.string,
      dictValue: propTypes.any,
      defaultValue: propTypes.string.def('未知'),
      icon: propTypes.bool.def(true),
    },
    setup(props) {
      const { prefixCls } = useDesign('dict-label');
      return {
        props,
        prefixCls,
        dictList: getDictList(props.dictType),
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-dict-label';

  .@{prefix-cls} {
    padding: 0 2px;
  }
</style>
