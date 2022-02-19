<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="60%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #ListClass="{ model, field }">
        <Select placeholder="请选择回显样式" v-model:value="model[field]">
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
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { Select, SelectOption, Tag, Badge } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './dictData.data';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { getDictDataById, saveOrUpdateDictData } from '/@/api/sys/dict';

  export default defineComponent({
    name: 'DictDataModal',
    components: { Select, SelectOption, Tag, Badge, BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const dictType = ref('');

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        schemas: formSchema,
        showActionButtonGroup: false,
        labelWidth: 120,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setModalProps, closeModal }] = useModalInner(async (data) => {
        await resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        dictType.value = data?.dictType;

        if (unref(isUpdate)) {
          const { dictCode } = data.record;
          getDictDataById(dictCode).then((res) => {
            setFieldsValue({ ...res });
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增字典数据' : '编辑字典数据'));

      async function handleSubmit() {
        try {
          const values = await validate();
          values.type = unref(dictType);
          setModalProps({ confirmLoading: true });
          saveOrUpdateDictData(values, unref(isUpdate))
            .then(() => {
              emit('success');
            })
            .finally(() => {
              closeModal();
            });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
