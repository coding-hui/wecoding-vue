<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t(`system.dictData.form.${actionType}`)"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #ListClass="{ model, field }">
        <Select :placeholder="t('system.dictData.listClass')" v-model:value="model[field]">
          <SelectOption value="tag pink">
            <Tag color="pink">green</Tag>
          </SelectOption>
          <SelectOption value="tag red">
            <Tag color="red">red</Tag>
          </SelectOption>
          <SelectOption value="tag orange">
            <Tag color="orange">orange</Tag>
          </SelectOption>
          <SelectOption value="tag green">
            <Tag color="green">green</Tag>
          </SelectOption>
          <SelectOption value="tag cyan">
            <Tag color="cyan">cyan</Tag>
          </SelectOption>
          <SelectOption value="tag blue">
            <Tag color="blue">blue</Tag>
          </SelectOption>
          <SelectOption value="tag purple">
            <Tag color="purple">purple</Tag>
          </SelectOption>
          <SelectOption value="tag error">
            <Tag color="error">error</Tag>
          </SelectOption>
          <SelectOption value="tag success">
            <Tag color="success">success</Tag>
          </SelectOption>
          <SelectOption value="tag warning">
            <Tag color="warning">warning</Tag>
          </SelectOption>
          <SelectOption value="tag processing">
            <Tag color="processing">processing</Tag>
          </SelectOption>
          <SelectOption value="tag default">
            <Tag color="default">default</Tag>
          </SelectOption>
          <SelectOption value="badge error">
            <Badge status="error" text="error" />
          </SelectOption>
          <SelectOption value="badge success">
            <Badge status="success" text="success" />
          </SelectOption>
          <SelectOption value="badge warning">
            <Badge status="warning" text="warning" />
          </SelectOption>
          <SelectOption value="badge processing">
            <Badge status="processing" text="processing" />
          </SelectOption>
        </Select>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ActionEnum } from '/@/enums/commonEnum';
  import { Select, SelectOption, Tag, Badge } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './dictData.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getDictDataById, saveOrUpdateDictData } from '/@/api/sys/dict';

  export default defineComponent({
    name: 'DictDataDrawer',
    components: { Select, SelectOption, Tag, Badge, BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const dictType = ref('');
      const isUpdate = ref(true);
      const actionType = ref<ActionEnum>(ActionEnum.ADD);
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        schemas: formSchema,
        showActionButtonGroup: false,
        labelWidth: 100,
        baseColProps: { lg: 24, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ loading: true });
        dictType.value = data?.dictType;
        actionType.value = data?.actionType;
        isUpdate.value = data?.actionType === ActionEnum.EDIT;

        if (unref(isUpdate)) {
          const { dictCode } = data.record;
          const res = await getDictDataById(dictCode);
          await setFieldsValue(res);
        }
        setDrawerProps({ loading: false });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          values.type = unref(dictType);
          setDrawerProps({ confirmLoading: true });
          await saveOrUpdateDictData(values, unref(isUpdate));
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
