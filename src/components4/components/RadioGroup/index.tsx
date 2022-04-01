import { JSXElement } from 'solid-js';
import { createLabel } from './label';
import RadioGroupProvider, { RadioGroupProviderProps } from './provider';
import { createRadio } from './radio';
import { createRadioGroup } from './radiogroup';

export * from './context';
export * from './label';
export * from './provider';
export * from './radio';
export * from './radiogroup';

export type RadioGroupComponentType = {
  <Value>(props: RadioGroupProviderProps<Value>): JSXElement;
  createLabel: typeof createLabel;
  createRadio: typeof createRadio;
  createRadioGroup: typeof createRadioGroup;
};

const RadioGroupComponent: RadioGroupComponentType = Object.assign(RadioGroupProvider, {
  createLabel,
  createRadio,
  createRadioGroup,
});

export default RadioGroupComponent;
