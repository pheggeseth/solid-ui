import { createContext, useContext } from 'solid-js';
import { Position } from '~/components/List/context';

export type MenuState = {
  initialItemFocus: Position;
};

export type MenuActions = {
  setInitialItemFocus(focus: Position): void;
};

export const MenuContext = createContext<[state: MenuState, actions: MenuActions]>();

export function useMenuContext() {
  return useContext(MenuContext);
}

export function useMenuState() {
  return useMenuContext()[0];
}

export function useMenuActions() {
  return useMenuContext()[1];
}
