import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '单词',
    dataIndex: 'word',
    align: 'left',
  },
  {
    title: '音标',
    dataIndex: 'phonetic',
    align: 'left',
  },
  {
    title: '释义（英）',
    dataIndex: 'definition',
    align: 'left',
  },
  {
    title: '释义（中）',
    dataIndex: 'translation',
    align: 'left',
  },
  {
    title: '标签',
    dataIndex: 'tag',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '单词',
    field: 'word',
    component: 'Input',
    colProps: { md: 6, sm: 24 },
  },
  {
    label: '标签',
    field: 'tag',
    component: 'Select',
    componentProps: {
      options: [
        { value: 'cet4', label: '四级英语' },
        { value: 'zk', label: '中考英语' },
        { value: 'gk', label: '高考英语' },
        { value: 'cet6', label: '六级英语' },
        { value: 'toefl', label: '托福' },
        { value: 'gre', label: '美国研究生入学考试' },
        { value: 'ielts', label: '雅思' },
        { value: 'ky', label: 'KY' },
      ],
    },
    colProps: { md: 6, sm: 24 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '单词',
    field: 'word',
    component: 'Input',
  },
  {
    label: '音标',
    field: 'phonetic',
    component: 'Input',
  },
  {
    label: ' 单词释义（英文），每行一个释义',
    field: 'definition',
    component: 'InputTextArea',
  },
  {
    label: '单词释义（中文），每行一个释义',
    field: 'translation',
    component: 'InputTextArea',
  },
  {
    label: '标签',
    field: 'tag',
    component: 'Select',
    componentProps: {
      options: [
        { label: '高考', value: 'gk' },
        { value: 'cet4', label: '四级英语' },
        { value: 'zk', label: '中考英语' },
        { value: 'gk', label: '高考英语' },
        { value: 'cet6', label: '六级英语' },
        { value: 'toefl', label: '托福' },
        { value: 'gre', label: '美国研究生入学考试' },
        { value: 'ielts', label: '雅思' },
        { value: 'ky', label: 'KY' },
      ],
      mode: 'multiple',
    },
  },
  {
    label: '变化类型，类型1:变换单词1/类型2:变换单词2',
    helpMessage:
      'p:过去式（did），d:过去分词（done），i：现在分词（doing），3：第三人称单数（does），r： 形容词比较级（-er），t：形容词最高级（-est），s：名词复数形式',
    field: 'exchange',
    component: 'InputTextArea',
  },
];
