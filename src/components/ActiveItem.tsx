import { DeepReadonly, SetStoreFunction } from 'solid-js/store';

export type ActiveItemState = {
  activeItemId: string;
  items: string[];
  search: string;
};

export type ActiveItemSelectors = Readonly<{
  isActive: (itemId: string) => boolean;
}>;

export type ActiveItemActions = Readonly<{
  addItem(id: string): void;
  removeItem(id: string): void;
  initializeItemFocus(): void;
  focusNextItem(): void;
  focusPreviousItem(): void;
  focusFirstItem(): void;
  focusLastItem(): void;
  focusTypeaheadItem(key: string): void;
  focusItem(itemId: string): void;
  clearItemFocus(): void;
}>;

export type CreateActiveItemActionsConfig = {
  getInitialFocusedItem?: (itemId: string, items?: readonly string[]) => boolean;
  shouldWrap?: boolean;
};

export function createActiveItemActions(
  setState: SetStoreFunction<ActiveItemState>,
  config: CreateActiveItemActionsConfig = {}
): ActiveItemActions {
  const getActiveItemIndex = (state: DeepReadonly<ActiveItemState>) =>
    state.items.findIndex((id) => id === state.activeItemId);

  let resetSearch: NodeJS.Timeout;

  return {
    addItem(item) {
      setState('items', (items) => [...items, item]);
    },
    removeItem(itemId) {
      setState((prevState) => ({
        items: prevState.items.filter((id) => id !== itemId),
        activeItemId: itemId === prevState.activeItemId ? undefined : prevState.activeItemId,
      }));
    },
    initializeItemFocus() {
      setState((state) => {
        if (config.getInitialFocusedItem) {
          const id = state.items.find((item) => config.getInitialFocusedItem(item, state.items));
          if (id) {
            return { activeItemId: id };
          } else {
            return state;
          }
        }

        return state;
      });
    },
    focusNextItem() {
      setState((state) => {
        let activeItemIndex = getActiveItemIndex(state);
        if (config.shouldWrap && activeItemIndex === state.items.length - 1) {
          activeItemIndex = -1;
        }

        if (activeItemIndex < state.items.length - 1) {
          return { activeItemId: state.items[activeItemIndex + 1] };
        }
      });
    },
    focusPreviousItem() {
      setState((state) => {
        let activeItemIndex = getActiveItemIndex(state);
        if (config.shouldWrap && activeItemIndex === 0) {
          activeItemIndex = state.items.length;
        }

        if (activeItemIndex === -1) {
          return { activeItemId: state.items[state.items.length - 1] };
        } else if (activeItemIndex > 0) {
          return { activeItemId: state.items[activeItemIndex - 1] };
        }

        return state;
      });
    },
    focusFirstItem() {
      setState((state) => ({ activeItemId: state.items[0] }));
    },
    focusLastItem() {
      setState((state) => ({ activeItemId: state.items[state.items.length - 1] }));
    },
    focusTypeaheadItem(key: string) {
      clearTimeout(resetSearch);

      setState((state) => {
        const search = state.search + key;
        const activeItemIndex = getActiveItemIndex(state);
        const wrappedItems = state.items
          .slice(activeItemIndex + 1)
          .concat(state.items.slice(0, activeItemIndex));

        const searchTerm = search.toLocaleLowerCase();
        const matchingItemId = wrappedItems.find((id) =>
          document.getElementById(id).textContent.toLocaleLowerCase().startsWith(searchTerm)
        );

        if (matchingItemId) {
          return { activeItemId: matchingItemId, search };
        } else {
          return { search };
        }
      });

      resetSearch = setTimeout(() => {
        setState('search', '');
      }, 500);
    },
    focusItem(itemId) {
      setState('activeItemId', itemId);
    },
    clearItemFocus() {
      setState('activeItemId', null);
    },
  };
}
