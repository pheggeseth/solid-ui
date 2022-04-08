import { JSXElement } from 'solid-js';
import { createItem } from './item';
import { createList } from './list';
import { createPanel } from './panel';
import MenuProvider, { MenuProviderProps } from './provider';
import { createTrigger } from './trigger';

export * from './context';
export * from './item';
export * from './list';
export * from './panel';
export * from './provider';
export * from './trigger';

export type MenuComponentType = {
  (props: MenuProviderProps): JSXElement;
  createItem: typeof createItem;
  createList: typeof createList;
  createPanel: typeof createPanel;
  createTrigger: typeof createTrigger;
};

const MenuComponent: MenuComponentType = Object.assign(MenuProvider, {
  createItem,
  createList,
  createPanel,
  createTrigger,
});

export default MenuComponent;
