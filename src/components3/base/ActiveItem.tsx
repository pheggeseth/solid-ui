import {
  createContext,
  createEffect,
  createSelector,
  mergeProps,
  onCleanup,
  onMount,
  PropsWithChildren,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { ListOrientation } from '~/types';
import { useKeyEventHandlers } from '~/utils/eventUtils';

type State = {
  activeItemId: string;
  items: string[];
  orientation: ListOrientation;
  search: string;
};

type Selectors = {
  isItemActive: (itemId: string) => boolean;
};

type Actions = {
  addItem(id: string): void;
  removeItem(id: string): void;
  initializeItemFocus(): void;
  focusNextItem(): void;
  focusPreviousItem(): void;
  focusFirstDescendent(): void;
  focusLastItem(): void;
  focusTypeaheadItem(key: string): void;
  focusItem(itemId: string): void;
  clearItemFocus(): void;
};

const ActiveItemContext =
  createContext<{ state: State; selectors: Selectors; actions: Actions }>();
export function useActiveItemState() {
  return useContext(ActiveItemContext)?.state;
}
export function useActiveItemSelectors() {
  return useContext(ActiveItemContext)?.selectors;
}
export function useActiveItemActions() {
  return useContext(ActiveItemContext)?.actions;
}

export type ActiveItemProviderProps = PropsWithChildren<{
  orientation?: ListOrientation;
  shouldHaveInitialFocus?: (itemId: string) => boolean;
}>;

export function ActiveItemProvider(props: ActiveItemProviderProps) {
  props = mergeProps<typeof props[]>({ orientation: 'vertical' }, props);

  const [state, setState] = createStore<State>({
    activeItemId: null,
    items: [],
    get orientation(): ListOrientation {
      return props.orientation;
    },
    search: '',
  });

  const selectors: Selectors = {
    isItemActive: createSelector(() => state.activeItemId),
  };

  const getActiveItemIndex = () =>
    state.items.findIndex((id) => id === state.activeItemId);

  let resetSearch: NodeJS.Timeout;

  const actions: Actions = {
    addItem(item) {
      setState('items', (items) => [...items, item]);
    },
    removeItem(itemId) {
      setState('items', (items) => items.filter((id) => id !== itemId));
    },
    initializeItemFocus() {
      if (props.shouldHaveInitialFocus) {
        const id = state.items.find(props.shouldHaveInitialFocus);

        if (id) {
          setState('activeItemId', id);
        }
      }
    },
    focusNextItem() {
      const activeItemIndex = getActiveItemIndex();
      if (activeItemIndex < state.items.length - 1) {
        setState('activeItemId', state.items[activeItemIndex + 1]);
      }
    },
    focusPreviousItem() {
      const activeItemIndex = getActiveItemIndex();

      if (activeItemIndex === -1) {
        setState('activeItemId', state.items[state.items.length - 1]);
      } else if (activeItemIndex > 0) {
        setState('activeItemId', state.items[activeItemIndex - 1]);
      }
    },
    focusFirstDescendent() {
      setState('activeItemId', state.items[0]);
    },
    focusLastItem() {
      setState('activeItemId', state.items[state.items.length - 1]);
    },
    focusTypeaheadItem(key: string) {
      clearTimeout(resetSearch);
      setState('search', (search) => search + key);

      const activeItemIndex = getActiveItemIndex();
      const wrappedItems = state.items
        .slice(activeItemIndex + 1)
        .concat(state.items.slice(0, activeItemIndex));

      const searchTerm = state.search.toLocaleLowerCase();
      const matchingItemId = wrappedItems.find((id) =>
        document.getElementById(id).textContent.toLocaleLowerCase().startsWith(searchTerm)
      );

      if (matchingItemId) {
        setState('activeItemId', matchingItemId);
      }

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

  return (
    <ActiveItemContext.Provider value={{ state: state as State, selectors, actions }}>
      {props.children}
    </ActiveItemContext.Provider>
  );
}

export type CreateActiveItemContainerPropsConfig = {
  disableTypeahead?: boolean;
  excludeAriaProps?: boolean;
  tabIndex?: string | number;
};

export function createActiveItemContainerOnKeyDown<
  ContainerElement extends HTMLElement
>(config: { disableTypeahead?: boolean }) {
  const state = useActiveItemState();
  const actions = useActiveItemActions();

  return useKeyEventHandlers<ContainerElement>({
    ArrowUp(event) {
      if (state.orientation === 'vertical') {
        event.preventDefault();
        actions.focusPreviousItem();
      }
    },
    ArrowDown(event) {
      if (state.orientation === 'vertical') {
        event.preventDefault();
        actions.focusNextItem();
      }
    },
    ArrowLeft(event) {
      if (state.orientation === 'horizontal') {
        event.preventDefault();
        actions.focusPreviousItem();
      }
    },
    ArrowRight(event) {
      if (state.orientation === 'horizontal') {
        event.preventDefault();
        actions.focusNextItem();
      }
    },
    Home(event) {
      event.preventDefault();
      actions.focusFirstDescendent();
    },
    End(event) {
      event.preventDefault();
      actions.focusLastItem();
    },
    default(event) {
      if (event.key.length === 1 && !config.disableTypeahead) {
        if (!state.search && event.key === ' ') {
          return;
        } else {
          actions.focusTypeaheadItem(event.key);
        }
      }
    },
  });
}

export function createActiveDescendentContainerProps<ContainerElement extends HTMLElement>(
  config: CreateActiveItemContainerPropsConfig = {}
) {
  const state = useActiveItemState();
  const actions = useActiveItemActions();

  const onKeyDown = createActiveItemContainerOnKeyDown({
    disableTypeahead: config.disableTypeahead,
  });

  return {
    get ['aria-activedescendent']() {
      return state.activeItemId;
    },
    onFocus() {
      actions.initializeItemFocus();
    },
    onKeyDown,
    tabIndex: config.tabIndex ?? 0,
  };
}

export type CreatActiveDescendentPropsConfig = {
  id: string;
};

export function createActiveDescendentProps(config: CreatActiveDescendentPropsConfig) {
  const state = useActiveItemState();
  const selectors = useActiveItemSelectors();
  const actions = useActiveItemActions();

  onMount(() => actions.addItem(config.id));
  onCleanup(() => actions.removeItem(config.id));

  createEffect(() => {
    if (state.activeItemId === config.id) {
      document.getElementById(config.id).scrollIntoView(false);
    }
  });

  return {
    get ['aria-selected']() {
      return selectors.isItemActive(config.id) || undefined;
    },
    get ['data-active']() {
      return selectors.isItemActive(config.id) ? '' : undefined;
    },
    onMouseEnter() {
      actions.focusItem(config.id);
    },
    onMouseLeave() {
      actions.clearItemFocus();
    },
    tabIndex: -1,
  };
}
