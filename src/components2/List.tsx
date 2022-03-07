import {
  Accessor,
  createContext,
  createEffect,
  createMemo,
  createSelector,
  JSX,
  mergeProps,
  onCleanup,
  onMount,
  PropsWithChildren,
  useContext,
} from 'solid-js';
import { createStore, DeepReadonly } from 'solid-js/store';
import { ListOrientation } from '~/types';
import { useId } from '~/utils/componentUtils';
import { useKeyEventHandlers } from '~/utils/eventUtils';
import { LabelProvider, useLabelState } from './Label';

type ListItem<ItemValue> = {
  id: string;
  value?: ItemValue;
};

type ListElementIds = {
  labelId: string;
};

type ListState<ItemValue> = ListElementIds & {
  activeItemId: string;
  items: ListItem<ItemValue>[];
  orientation: ListOrientation;
  shouldClickListItem: boolean;
};

type ListSelectors = {
  isItemActive: (itemId: string) => boolean;
};

type ListActions<ItemValue> = {
  setElementId(name: keyof ListElementIds, id: string): void;
  addItem(item: ListItem<ItemValue>): void;
  removeItem(itemId: string): void;
  initializeItemFocus(): void;
  focusNextItem(): void;
  focusPreviousItem(): void;
  focusFirstItem(): void;
  focusLastItem(): void;
  focusItemStartingWith(search: string): void;
  hoverItem(itemId: string): void;
  hoverItemClear(): void;
  chooseFocusedItem(): void;
  chooseItem(itemId: string): void;
};

const ListContext = createContext<{
  state: ListState<any>;
  selectors: ListSelectors;
  actions: ListActions<any>;
}>();

function useListState<ItemValue>() {
  return useContext(ListContext).state as ListState<ItemValue>;
}

function useListSelectors() {
  return useContext(ListContext).selectors;
}

function useListActions<ItemValue>() {
  return useContext(ListContext).actions as ListActions<ItemValue>;
}

export type ListProviderProps<ItemValue> = PropsWithChildren<{
  'aria-orientation'?: ListOrientation;
  onChange?: (newValue: ItemValue) => void;
  shouldClickListItem?: boolean;
  value?: ItemValue;
}>;

export function ListProvider<ItemValue>(props: ListProviderProps<ItemValue>) {
  props = mergeProps<typeof props[]>({ 'aria-orientation': 'vertical' }, props);

  const [state, setState] = createStore<ListState<ItemValue>>({
    labelId: null,
    activeItemId: null,
    items: [],
    get orientation(): ListOrientation {
      return props['aria-orientation'];
    },
    get shouldClickListItem(): boolean {
      return props.shouldClickListItem;
    },
  });

  const isActiveItem = (item: ListItem<ItemValue>) => item.id === state.activeItemId;
  const getActiveItemIndex = () => state.items.findIndex(isActiveItem);

  const selectors: ListSelectors = {
    isItemActive: createSelector(() => state.activeItemId),
  };

  const focusItem = (item: DeepReadonly<ListItem<ItemValue>>) => {
    setState({ activeItemId: item.id });
  };

  const hasId = (itemId: string) => (item: { id: string }) => item.id === itemId;

  const actions: ListActions<ItemValue> = {
    setElementId(name, id) {
      setState(name, id);
    },
    addItem(item) {
      setState('items', (items) => [...items, item]);
    },
    removeItem(itemId) {
      setState('items', (items) => items.filter((item) => !hasId(itemId)(item)));
    },
    initializeItemFocus() {
      if (state.activeItemId) {
        return;
      }

      const itemToFocus = state.items.find((item) => item.value === props.value) || state.items[0];

      if (itemToFocus) {
        focusItem(itemToFocus);
      }
    },
    focusNextItem() {
      const activeItemIndex = getActiveItemIndex();
      if (activeItemIndex < state.items.length - 1) {
        focusItem(state.items[activeItemIndex + 1]);
      }
    },
    focusPreviousItem() {
      const activeItemIndex = getActiveItemIndex();

      if (activeItemIndex === -1) {
        focusItem(state.items[state.items.length - 1]);
      } else if (activeItemIndex > 0) {
        focusItem(state.items[activeItemIndex - 1]);
      }
    },
    focusFirstItem() {
      focusItem(state.items[0]);
    },
    focusLastItem() {
      focusItem(state.items[state.items.length - 1]);
    },
    focusItemStartingWith(search: string) {
      const activeItemIndex = getActiveItemIndex();
      const wrappedItems = state.items
        .slice(Math.min(activeItemIndex + 1, state.items.length - 1))
        .concat(state.items.slice(0, activeItemIndex));

      const searchTerm = search.toLocaleLowerCase();
      const matchingItem = wrappedItems.find((item) =>
        document.getElementById(item.id).textContent.toLocaleLowerCase().startsWith(searchTerm)
      );

      if (matchingItem) {
        focusItem(matchingItem);
      }
    },
    hoverItem(itemId) {
      setState({
        activeItemId: state.items.find(hasId(itemId))?.id || null,
      });
    },
    hoverItemClear() {
      setState({ activeItemId: null });
    },
    chooseFocusedItem() {
      const activeItem = state.items.find(isActiveItem);
      if (activeItem) {
        if (state.shouldClickListItem) {
          // document.getElementById(activeItem.id)?.click();
        } else {
          props.onChange?.(activeItem.value as ItemValue);
        }

        // const activeElement = document.getElementById(activeItem.id);

        // if (['BUTTON', 'A'].includes(activeElement.tagName)) {
        //   activeElement.click();
        // } else {
        //   props.onChange?.(activeItem.value as ItemValue);
        // }
      }
    },
    chooseItem(itemId) {
      console.log('chooseItem', itemId);
      const item = state.items.find(hasId(itemId));
      if (item) {
        props.onChange?.(item.value as ItemValue);
      }
    },
  };

  return (
    <LabelProvider>
      <ListContext.Provider value={{ state: state as ListState<any>, selectors, actions }}>
        {props.children}
      </ListContext.Provider>
    </LabelProvider>
  );
}

export type ListProps<ListElement extends HTMLElement> = {
  'aria-activedescendent': string;
  'aria-labelledby': string;
  id: string;
  onFocus: JSX.EventHandler<ListElement, FocusEvent>;
  onKeyDown: JSX.EventHandler<ListElement, KeyboardEvent>;
  tabIndex: string | number;
};

export type CreateListPropsConfig = {
  idPrefix: string;
};

export function createListProps<ItemValue, ListContainerElement extends HTMLElement>(
  config: CreateListPropsConfig
): ListProps<ListContainerElement> {
  const labelState = useLabelState();
  const listState = useListState<ItemValue>();
  const listActions = useListActions<ItemValue>();

  const id = useId(config.idPrefix);

  let search: string;
  let resetSearch: NodeJS.Timeout;

  return {
    get ['aria-activedescendent']() {
      return listState.activeItemId;
    },
    get ['aria-labelledby']() {
      return labelState.labelId;
    },
    id,
    onFocus() {
      listActions.initializeItemFocus();
    },
    onKeyDown: useKeyEventHandlers<ListContainerElement>({
      ArrowUp(event) {
        if (listState.orientation === 'vertical') {
          event.preventDefault();
          listActions.focusPreviousItem();
        }
      },
      ArrowDown(event) {
        if (listState.orientation === 'vertical') {
          event.preventDefault();
          listActions.focusNextItem();
        }
      },
      ArrowLeft(event) {
        if (listState.orientation === 'horizontal') {
          event.preventDefault();
          listActions.focusPreviousItem();
        }
      },
      ArrowRight(event) {
        if (listState.orientation === 'horizontal') {
          event.preventDefault();
          listActions.focusNextItem();
        }
      },
      Home(event) {
        event.preventDefault();
        listActions.focusFirstItem();
      },
      End(event) {
        event.preventDefault();
        listActions.focusLastItem();
      },
      Enter(event) {
        event.preventDefault();
        listActions.chooseFocusedItem();
      },
      [' '](event) {
        if (search) {
          this.default(event);
        } else {
          event.preventDefault();
          listActions.chooseFocusedItem();
        }
      },
      default(event) {
        if (event.key.length === 1) {
          event.preventDefault();
          clearTimeout(resetSearch);
          search += event.key;
          listActions.focusItemStartingWith(search);

          resetSearch = setTimeout(() => {
            search = '';
          }, 500);
        }
      },
    }),
    tabIndex: 0,
  };
}

export type ListItemProps<ListItemElement extends HTMLElement> = {
  'aria-selected': boolean;
  'data-active': string;
  id: string;
  onClick: JSX.EventHandler<ListItemElement, MouseEvent>;
  onMouseEnter: JSX.EventHandler<ListItemElement, MouseEvent>;
  onMouseLeave: JSX.EventHandler<ListItemElement, MouseEvent>;
  role: string;
  tabIndex: string | number;
};

export function createListItemProps<ItemValue, ListItemElement extends HTMLElement>(config: {
  idPrefix: string;
  onClick?: JSX.EventHandler<ListItemElement, MouseEvent>;
  role?: string;
  value?: ItemValue;
}): ListItemProps<ListItemElement> {
  const listState = useListState<ItemValue>();
  const listSelectors = useListSelectors();
  const listActions = useListActions<ItemValue>();

  const id = useId(config.idPrefix);

  onMount(() => listActions.addItem({ id, value: config.value }));
  onCleanup(() => listActions.removeItem(id));

  createEffect(() => {
    if (listState.activeItemId === id) {
      document.getElementById(id).scrollIntoView(false);
    }
  });

  return {
    get ['aria-selected']() {
      return listSelectors.isItemActive(id) || undefined;
    },
    get ['data-active']() {
      return listSelectors.isItemActive(id) ? '' : undefined;
    },
    id,
    get onClick() {
      return (event) => {
        listActions.chooseItem(id);
        config.onClick?.(event);
      };
    },
    onMouseEnter() {
      listActions.hoverItem(id);
    },
    onMouseLeave() {
      listActions.hoverItemClear();
    },
    role: config.role,
    tabIndex: -1,
  };
}
