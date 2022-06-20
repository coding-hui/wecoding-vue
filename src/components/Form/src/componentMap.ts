import type { Component } from 'vue';
import type { ComponentType } from './types/index';

/**
 * Component list, register here to setting it in the form
 */
import {
  Input,
  // Select,
  // Radio,
  Checkbox,
  AutoComplete,
  // Cascader,
  DatePicker,
  InputNumber,
  Switch,
  TimePicker,
  // TreeSelect,
  Slider,
  Rate,
  Divider,
} from 'ant-design-vue';

import WeCodingSelect from './components/WeCodingSelect.vue';
import WeCodingTreeSelect from './components/WeCodingTreeSelect.vue';
import WeCodingRadioGroup from './components/WeCodingRadioGroup.vue';
import WeCodingCheckboxGroup from './components/WeCodingCheckboxGroup.vue';
import WeCodingRadioButtonGroup from './components/WeCodingRadioButtonGroup.vue';
import WeCodingCascader from './components/WeCodingCascader.vue';
import WeCodingTree from './components/WeCodingTree.vue';
import FormGroup from './components/FormGroup.vue';

import { BasicUpload } from '/@/components/Upload';
import { StrengthMeter } from '/@/components/StrengthMeter';
import { IconPicker } from '/@/components/Icon';
import { CountdownInput } from '/@/components/CountDown';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('Input', Input);
componentMap.set('InputGroup', Input.Group);
componentMap.set('InputPassword', Input.Password);
componentMap.set('InputSearch', Input.Search);
componentMap.set('InputTextArea', Input.TextArea);
componentMap.set('InputNumber', InputNumber);
componentMap.set('AutoComplete', AutoComplete);

componentMap.set('Select', WeCodingSelect); //Select);
componentMap.set('Tree', WeCodingTree); //TreeSelect);
componentMap.set('TreeSelect', WeCodingTreeSelect); //TreeSelect);
componentMap.set('Switch', Switch);
componentMap.set('RadioButtonGroup', WeCodingRadioButtonGroup);
componentMap.set('RadioGroup', WeCodingRadioGroup); //Radio.Group);
componentMap.set('Checkbox', Checkbox);
componentMap.set('CheckboxGroup', WeCodingCheckboxGroup); //Checkbox.Group);
componentMap.set('Cascader', WeCodingCascader);
componentMap.set('Slider', Slider);
componentMap.set('Rate', Rate);

componentMap.set('DatePicker', DatePicker);
componentMap.set('MonthPicker', DatePicker.MonthPicker);
componentMap.set('RangePicker', DatePicker.RangePicker);
componentMap.set('WeekPicker', DatePicker.WeekPicker);
componentMap.set('TimePicker', TimePicker);
componentMap.set('StrengthMeter', StrengthMeter);
componentMap.set('IconPicker', IconPicker);
componentMap.set('InputCountDown', CountdownInput);

componentMap.set('Upload', BasicUpload);
componentMap.set('Divider', Divider);
componentMap.set('FormGroup', FormGroup);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
