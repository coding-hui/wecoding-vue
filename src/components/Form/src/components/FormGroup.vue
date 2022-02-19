<template>
  <div class="wecoding-form-group">
    <div class="title">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'WeCodingFormGroup',
    inheritAttrs: false,
  });
</script>
<style lang="less">
  @prefix-cls: ~'wecoding-form-group';

  .@{prefix-cls} {
    .title {
      width: 100%;
      font-size: 15px;
      font-style: oblique;
      color: @primary-color;
      padding: 0 0 3px 5px;
      margin: 0 10px 20px;
      border-bottom: 1px solid @header-light-bottom-border-color;
    }
  }
</style>
