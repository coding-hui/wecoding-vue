<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!--        <a-button type="primary" @click="handleReadAll"> 本页全读 </a-button>-->
      </template>
      <template #Content="{ record }">
        <div v-text="record.content"></div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:zoom-in-outlined',
              tooltip: '阅读',
              onClick: handlePreview.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <MessagePreviewModal @register="registerModal" @success="handleRead" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';

  import { findUserMessageList, readMessage } from '/@/api/message/message';

  import MessagePreviewModal from './messagePreviewModal.vue';
  import { searchFormSchema, userMessageColumns } from './message.data';

  export default defineComponent({
    name: 'MyMessage',
    components: { BasicTable, TableAction, MessagePreviewModal },
    setup() {
      const { getUserInfo } = useUserStore();
      const { createMessage } = useMessage();
      const [registerModal, { openModal: openMessageModal }] = useModal();
      const [registerTable, { reload, setLoading, getDataSource }] = useTable({
        title: '我的消息',
        api: findUserMessageList,
        rowKey: 'messageId',
        columns: userMessageColumns,
        useSearchForm: true,
        showTableSetting: true,
        showIndexColumn: true,
        canResize: false,
        formConfig: {
          labelWidth: 90,
          baseColProps: { lg: 6, md: 8 },
          schemas: searchFormSchema,
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handlePreview(record: Recordable) {
        openMessageModal(true, {
          record,
        });
      }

      function handleReadAll() {
        const unReadMessageIds = getDataSource()
          .filter((m) => {
            return !m.readed;
          })
          .map((m) => {
            return m.messageId;
          });
        if (!unReadMessageIds || unReadMessageIds.length <= 0) {
          createMessage.info('没有未读消息啦');
          return;
        }
        setLoading(true);
        readMessage({ userId: getUserInfo.userId, messageIds: unReadMessageIds }).finally(() => {
          setLoading(false);
        });
      }

      function handleRead() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        handleReadAll,
        handlePreview,
        handleRead,
      };
    },
  });
</script>

<style scoped lang="less"></style>
