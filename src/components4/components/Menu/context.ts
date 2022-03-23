import { Accessor, createContext, createSelector, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { ListOrientation } from '~/types';
import {
  ActiveItemActions,
  ActiveItemSelectors,
  ActiveItemState,
  createActiveItemActions,
} from '../ActiveItem';
import { createPopoverPanelActions, PopoverPanelActions } from '../Popover';

type MenuElementIds = {
  triggerId: string;
  listId: string;
  overlayId: string;
  panelId: string;
};

export type MenuState = MenuElementIds &
  ActiveItemState & {
    orientation: ListOrientation;
    shouldShowPanel: boolean;
    isPanelOpen: boolean;
    isOverlayMounted: boolean;
  };

export type MenuActions = ActiveItemActions &
  PopoverPanelActions &
  Readonly<{
    setElementId(name: keyof MenuElementIds, id: string): void;
  }>;

export type MenuSelectors = ActiveItemSelectors;

export type MenuStore = Readonly<
  [state: MenuState, actions: MenuActions, selectors: MenuSelectors]
>;

export function createMenuStore(
  config: {
    orientation: Accessor<ListOrientation>;
    getInitialFocusedItem?: (itemId: string) => boolean;
  } = { orientation: () => 'vertical' }
): MenuStore {
  const [state, setState] = createStore<MenuState>({
    triggerId: null,
    listId: null,
    overlayId: null,
    panelId: null,
    shouldShowPanel: false,
    get isPanelOpen(): boolean {
      return state.shouldShowPanel && (!state.overlayId || state.isOverlayMounted);
    },
    isOverlayMounted: false,
    activeItemId: null,
    items: [],
    search: '',
    get orientation(): ListOrientation {
      return config.orientation();
    },
  });

  const actions: MenuActions = {
    ...createActiveItemActions(setState, config),
    ...createPopoverPanelActions(setState),
    setElementId(name, id) {
      setState({ [name]: id });
    },
  };

  const selectors: MenuSelectors = {
    isItemActive: createSelector(() => state.activeItemId),
  };

  return [state as MenuState, actions, selectors];
}

export const MenuStoreContext = createContext<MenuStore>();
export function useMenuContext() {
  return useContext(MenuStoreContext);
}
export function useMenuState() {
  return useContext(MenuStoreContext)[0];
}
export function useMenuActions() {
  return useContext(MenuStoreContext)[1];
}
export function useMenuSelectors() {
  return useContext(MenuStoreContext)[2];
}
