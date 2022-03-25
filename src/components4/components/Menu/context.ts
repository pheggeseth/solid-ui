import { Accessor, createContext, createSelector, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { ListOrientation } from '~/types';
import {
  ActiveItemActions,
  ActiveItemSelectors,
  ActiveItemState,
  createActiveItemActions,
  CreateActiveItemActionsConfig,
} from '../ActiveItem';
import {
  createPopoverPanelActions,
  PopoverPanelActions,
  PopoverPanelActionsSetStoreFunction,
  PopoverPanelState,
} from '../Popover';

type MenuElementIds = {
  triggerId: string;
  listId: string;
  overlayId: string;
  panelId: string;
};

export type MenuState = MenuElementIds &
  ActiveItemState &
  PopoverPanelState & {
    menuActions: { [itemId: string]: () => void };
    orientation: ListOrientation;
  };

export type MenuActions = ActiveItemActions &
  PopoverPanelActions &
  Readonly<{
    setElementId(name: keyof MenuElementIds, id: string): void;
    addMenuAction(itemId: string, action: () => void): void;
    removeMenuAction(itemId: string): void;
    performMenuAction(itemId: string, eventType: 'mouse' | 'keyboard'): void;
  }>;

export type MenuSelectors = ActiveItemSelectors;

export type MenuStore = Readonly<
  [state: MenuState, actions: MenuActions, selectors: MenuSelectors]
>;

export function createMenuStore(
  config: {
    orientation: Accessor<ListOrientation>;
    getInitialFocusedItem?: CreateActiveItemActionsConfig['getInitialFocusedItem'];
  } = {
    orientation: () => 'vertical',
    getInitialFocusedItem: (itemId, items) => items.indexOf(itemId) === 0,
  }
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
    items: [],
    activeItemId: null,
    search: '',
    get orientation(): ListOrientation {
      return config.orientation();
    },
    menuActions: {},
  });

  const actions: MenuActions = {
    ...createActiveItemActions(setState, config),
    ...createPopoverPanelActions(setState),
    addMenuAction(itemId, action) {
      setState('menuActions', (menuActions) => ({ ...menuActions, [itemId]: action }));
    },
    removeMenuAction(itemId) {
      setState('menuActions', (menuActions) => ({ ...menuActions, [itemId]: undefined }));
    },
    performMenuAction(itemId: string, eventType) {
      if (itemId) {
        if (state.menuActions[itemId]) {
          state.menuActions[itemId]();
        } else {
          if (eventType !== 'mouse') {
            const element = document.getElementById(itemId);
            if (
              element &&
              (element['$$click'] || element.onclick || ['BUTTON', 'A'].includes(element.tagName))
            ) {
              element.click();
            }
          }
        }
      }

      actions.closePopover();
    },
    setElementId(name, id) {
      setState({ [name]: id });
    },
  };

  const selectors: MenuSelectors = {
    isActive: createSelector(() => state.activeItemId),
  };

  return [state as MenuState, actions, selectors] as const;
}

export const MenuStoreContext = createContext<MenuStore>();
export function useMenuStore() {
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

export type MenuContext = Readonly<{
  isActive: (itemId: string) => boolean;
  isOpen: Accessor<boolean>;
  open: () => void;
  close: () => void;
}>;

export function useMenuContext(): MenuContext {
  const state = useMenuState();
  const actions = useMenuActions();
  const selectors = useMenuSelectors();

  return {
    isActive: (itemId: string) => selectors.isActive(itemId),
    isOpen: () => state.isPanelOpen,
    open: () => actions.openPopover(),
    close: () => actions.closePopover(),
  } as const;
}

export type MenuContextProp = {
  context?: (ctx: MenuContext) => void;
};
