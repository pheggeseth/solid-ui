import { JSXElement } from 'solid-js';
import { createInput } from './input';
import { createLabel } from './label';
import { createList } from './list';
import { createOption } from './option';
import { createPanel } from './panel';
import ComboboxProvider, { ComboboxProviderProps } from './provider';
import { createTrigger } from './trigger';

export * from './context';
export * from './input';
export * from './label';
export * from './list';
export * from './option';
export * from './panel';
export * from './provider';
export * from './trigger';

export type ComboboxComponentType = {
  <Value>(props: ComboboxProviderProps<Value>): JSXElement;
  createInput: typeof createInput;
  createLabel: typeof createLabel;
  createList: typeof createList;
  createOption: typeof createOption;
  createPanel: typeof createPanel;
  createTrigger: typeof createTrigger;
};

const ComboboxComponent: ComboboxComponentType = Object.assign(ComboboxProvider, {
  createInput,
  createLabel,
  createList,
  createOption,
  createPanel,
  createTrigger,
});

export default ComboboxComponent;
