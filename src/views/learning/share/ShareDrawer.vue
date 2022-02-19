<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';

  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { getShareById, saveOrUpdateShare } from '/@/api/learning/share';

  import { formSchema } from './share.data';

  export default defineComponent({
    name: 'ShareDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        schemas: formSchema,
        showActionButtonGroup: false,
        labelCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 5, offset: 0 },
        },
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 15, offset: 0 },
        },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const { id } = data.record;
          getShareById(id).then((res) => {
            setFieldsValue({ ...res });
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增圈子' : '编辑圈子'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          saveOrUpdateShare(values, unref(isUpdate))
            .then(() => {
              emit('success');
            })
            .finally(() => {
              closeDrawer();
            });
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, handleSubmit, getTitle };
    },
  });
</script>
