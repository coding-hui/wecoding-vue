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

  import { getDictById, saveOrUpdateDict } from '/@/api/learning/dict';

  import { formSchema } from './dict.data';

  export default defineComponent({
    name: 'DictDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        schemas: formSchema,
        layout: 'vertical',
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const { id } = data.record;
          getDictById(id).then((res) => {
            setFieldsValue({ ...res });
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增词库' : '编辑词库'));

      async function handleSubmit() {
        try {
          const values = await validate();
          values.tagList = values.tag;
          values.tag = values.tag.join(' ');
          setDrawerProps({ confirmLoading: true });
          saveOrUpdateDict(values, unref(isUpdate))
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
