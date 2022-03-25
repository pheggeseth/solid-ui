import { JSXElement } from 'solid-js';
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
  createTrigger: typeof createTrigger;
  createPanel: typeof createPanel;
  createList: typeof createList;
  createOption: typeof createOption;
};

const ListboxComponent: ListboxComponentType = Object.assign(ListboxProvider, {
  createTrigger,
  createPanel,
  createList,
  createOption,
});

export default ListboxComponent;
