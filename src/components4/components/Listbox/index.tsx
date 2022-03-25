import { JSXElement } from 'solid-js';
import { createLabel } from './label';
import { createList } from './list';
import { createOption } from './option';
import { createPanel } from './panel';
import ListboxProvider, { ListboxProviderProps } from './provider';
import { createTrigger } from './trigger';

export * from './context';
export * from './list';
export * from './option';
export * from './panel';
export * from './provider';
export * from './trigger';

export type ListboxComponentType = {
  <Value>(props: ListboxProviderProps<Value>): JSXElement;
  createLabel: typeof createLabel;
  createList: typeof createList;
  createOption: typeof createOption;
  createPanel: typeof createPanel;
  createTrigger: typeof createTrigger;
};

const ListboxComponent: ListboxComponentType = Object.assign(ListboxProvider, {
  createLabel,
  createList,
  createOption,
  createPanel,
  createTrigger,
});

export default ListboxComponent;
