<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :footer="null" title="预览代码" width="90%">
    <Tabs>
      <TabPane
        v-for="(value, key) in codeRef"
        :key="key"
        :tab="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
      >
        <a-button type="link" shape="round" @click="handleSync" style="float: right">
          <SyncOutlined spin />刷新
        </a-button>
        <a-button type="link" shape="round" @click="handleCopy(value)" style="float: right">
          <CopyOutlined />复制
        </a-button>
        <CodeEditor :value="value" />
      </TabPane>
    </Tabs>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { CodeEditor } from '/@/components/CodeEditor';
  import { CopyOutlined, SyncOutlined } from '@ant-design/icons-vue';
  import { Tabs, TabPane } from 'ant-design-vue';

  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { preview } from '/@/api/gen/table';

  export default defineComponent({
    name: 'PreviewCodeModal',
    components: {
      BasicModal,
      Tabs,
      TabPane,
      CodeEditor,
      CopyOutlined,
      SyncOutlined,
    },
    emits: ['success', 'register'],
    setup() {
      const codeRef = ref();
      const tableIdRef = ref();
      const { clipboardRef, copiedRef } = useCopyToClipboard();
      const { createMessage } = useMessage();
      const [registerModal, { setModalProps, changeLoading }] = useModalInner((data) => {
        setModalProps({ confirmLoading: true });
        tableIdRef.value = data?.tableId;
        preview(data?.tableId)
          .then((res) => {
            codeRef.value = res;
          })
          .finally(() => {
            setModalProps({ confirmLoading: false, maskClosable: true });
          });
      });

      function handleCopy(value) {
        clipboardRef.value = value;
        if (unref(copiedRef)) {
          createMessage.success('复制成功');
        }
      }

      function handleSync() {
        changeLoading(true);
        preview(unref(tableIdRef))
          .then((res) => {
            codeRef.value = res;
          })
          .finally(() => {
            changeLoading(false);
          });
      }

      return {
        registerModal,
        handleCopy,
        handleSync,
        codeRef,
        tableIdRef,
      };
    },
  });
</script>
