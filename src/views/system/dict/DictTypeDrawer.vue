<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t(`system.dictType.form.${actionType}`)"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './dictType.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getDictTypeById, saveOrUpdateDictType } from '/@/api/sys/dict';

  export default defineComponent({
    name: 'DictTypeDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const isUpdate = ref(true);
      const actionType = ref<ActionEnum>(ActionEnum.ADD);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        schemas: formSchema,
        showActionButtonGroup: false,
        labelWidth: 100,
        baseColProps: { lg: 24, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ loading: true });
        actionType.value = data?.actionType;
        isUpdate.value = data?.actionType === ActionEnum.EDIT;

        if (unref(isUpdate)) {
          const { dictId } = data.record;
          const res = await getDictTypeById(dictId);
          await setFieldsValue(res);
        }
        setDrawerProps({ loading: false });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          await saveOrUpdateDictType(values, unref(isUpdate));
          setTimeout(closeDrawer);
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { t, actionType, registerDrawer, registerForm, handleSubmit };
    },
  });
</script>
