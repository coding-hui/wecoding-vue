<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :showCancelBtn="false"
    showFooter
    title="消息详情"
    @ok="handleClose"
    width="70%"
  >
    <div v-if="loading">
      <Skeleton active :paragraph="{ rows: 10 }" />
    </div>
    <div v-else>
      <div style="text-align: center; font-size: 24px">{{ message.title }}</div>
      <br />
      <div style="text-align: right; font-size: 14px">
        <span>（发布人：{{ message.sendRealName }}）</span>
        <span>发布时间：{{ message.createTime }} </span>
      </div>
      <Divider style="margin-top: 5px" />
      <div>
        <label v-html="message.content"></label>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';

  import { useUserStore } from '/@/store/modules/user';
  import { Skeleton, Divider } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { readMessage } from '/@/api/message/message';

  export default defineComponent({
    name: 'MessagePreviewModal',
    components: { BasicModal, Skeleton, Divider },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const messageRef = reactive({
        message: {},
        loading: false,
      });
      const { getUserInfo } = useUserStore();
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        messageRef.loading = true;
        const { messageId } = data.record;
        readMessage({ userId: getUserInfo.userId, messageId })
          .then((res) => {
            messageRef.message = res;
          })
          .finally(() => {
            setModalProps({ confirmLoading: false });
            messageRef.loading = false;
          });
      });

      function handleClose() {
        closeModal();
        emit('success');
      }

      return { registerModal, closeModal, handleClose, ...toRefs(messageRef) };
    },
  });
</script>
