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
  createTrigger: typeof createTrigger;
  createPanel: typeof createPanel;
  createList: typeof createList;
  createItem: typeof createItem;
};

const MenuComponent: MenuComponentType = Object.assign(MenuProvider, {
  createTrigger,
  createPanel,
  createList,
  createItem,
});

export default MenuComponent;
