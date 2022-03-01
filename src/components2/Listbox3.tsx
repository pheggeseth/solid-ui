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
  splitProps,
  useContext,
} from 'solid-js';
import { createStore, DeepReadonly } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import { BaseComponentProps, DynamicComponent, ListboxOrientation } from '~/types';
import { useId } from '~/utils/componentUtils';
import { useKeyEventHandlers } from '~/utils/eventUtils';

type ListboxItemType<ItemValue> = {
  id: string;
  value?: ItemValue;
};

type ListboxState<ItemValue> = {
  labelId: string;
  activeItemId: string;
  items: ListboxItemType<ItemValue>[];
};

type ListboxSelectors<ItemValue> = {
  isItemActive: (itemId: string) => boolean;
  isItemSelected: (itemValue: ItemValue) => boolean;
  orientation: Accessor<ListboxOrientation>;
};

type ListboxActions<ItemValue> = {
  setElementId(type: 'labelId', id: string): void;
  addItem(item: ListboxItemType<ItemValue>): void;
  removeItem(itemId: string): void;
  initializeActiveItem(): void;
  focusNextItem(): void;
  focusPreviousItem(): void;
  focusFirstItem(): void;
  focusLastItem(): void;
  focusItemStartingWith(search: string): void;
  hoverItem(itemId: string): void;
  hoverItemClear(): void;
};

const ListboxContext = createContext<{
  state: ListboxState<any>;
  selectors: ListboxSelectors<any>;
  actions: ListboxActions<any>;
}>();

function useListboxState<ItemValue>() {
  return useContext(ListboxContext).state as ListboxState<ItemValue>;
}

function useListboxSelectors<ItemValue>() {
  return useContext(ListboxContext).selectors as ListboxSelectors<ItemValue>;
}

function useListboxActions<ItemValue>() {
  return useContext(ListboxContext).actions as ListboxActions<ItemValue>;
}

type ListboxProviderProps<ItemValue> = PropsWithChildren<{
  'aria-orientation'?: ListboxOrientation;
  onChange?: (newValue: ItemValue) => void;
  value?: ItemValue;
}>;

export function ListboxProvider<ItemValue = any>(props: ListboxProviderProps<ItemValue>) {
  props = mergeProps<typeof props[]>({ 'aria-orientation': 'vertical' }, props);

  const [listboxState, setListboxState] = createStore<ListboxState<ItemValue>>({
    labelId: null,
    activeItemId: null,
    items: [],
  });

  const getActiveItemIndex = () =>
    listboxState.items.findIndex((item) => item.id === listboxState.activeItemId);

  const listboxSelectors: ListboxSelectors<ItemValue> = {
    isItemActive: createSelector(() => listboxState.activeItemId),
    isItemSelected: createSelector(() => props.value),
    orientation: createMemo(() => props['aria-orientation']),
  };

  const focusItem = (item: DeepReadonly<ListboxItemType<ItemValue>>) => {
    setListboxState({ activeItemId: item.id });
  };

  const listboxActions: ListboxActions<ItemValue> = {
    setElementId(elementType, id) {
      setListboxState(elementType, id);
    },
    addItem(item) {
      setListboxState('items', (items) => [...items, item]);
    },
    removeItem(itemId) {
      setListboxState('items', (items) => items.filter((item) => item.id !== itemId));
    },
    initializeActiveItem() {
      if (listboxState.activeItemId) {
        return;
      }

      const itemToFocus =
        listboxState.items.find((item) => item.value === props.value) || listboxState.items[0];

      if (itemToFocus) {
        focusItem(itemToFocus);
      }
    },
    focusNextItem() {
      const activeItemIndex = getActiveItemIndex();
      if (activeItemIndex < listboxState.items.length - 1) {
        focusItem(listboxState.items[activeItemIndex + 1]);
      }
    },
    focusPreviousItem() {
      const activeItemIndex = getActiveItemIndex();

      if (activeItemIndex === -1) {
        focusItem(listboxState.items[listboxState.items.length - 1]);
      } else if (activeItemIndex > 0) {
        focusItem(listboxState.items[activeItemIndex - 1]);
      }
    },
    focusFirstItem() {
      focusItem(listboxState.items[0]);
    },
    focusLastItem() {
      focusItem(listboxState.items[listboxState.items.length - 1]);
    },
    focusItemStartingWith(search: string) {
      const activeItemIndex = getActiveItemIndex();
      const wrappedItems = listboxState.items
        .slice(Math.min(activeItemIndex + 1, listboxState.items.length - 1))
        .concat(listboxState.items.slice(0, activeItemIndex));

      const searchTerm = search.toLocaleLowerCase();
      const matchingItem = wrappedItems.find((item) =>
        document.getElementById(item.id).textContent.toLocaleLowerCase().startsWith(searchTerm)
      );

      if (matchingItem) {
        focusItem(matchingItem);
      }
    },
    hoverItem(itemId) {
      setListboxState({
        activeItemId: listboxState.items.find((item) => item.id === itemId)?.id || null,
      });
    },
    hoverItemClear() {
      setListboxState({ activeItemId: null });
    },
  };

  return (
    <ListboxContext.Provider
      value={{
        state: listboxState as ListboxState<any>,
        selectors: listboxSelectors,
        actions: listboxActions,
      }}
    >
      {props.children}
    </ListboxContext.Provider>
  );
}

type ListboxLabelProps<ListboxLabelElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent<{
    id: string;
  }>;
  idPrefix?: string;
}>;

export function ListboxLabel<ListboxLabelElement extends HTMLElement = HTMLSpanElement>(
  props: ListboxLabelProps<ListboxLabelElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'span', idPrefix: 'solid-ui-listbox-label' },
    props
  );

  const listboxActions = useListboxActions();

  const id = useId(props.idPrefix);

  onMount(() => {
    listboxActions.setElementId('labelId', id);
  });

  const [localProps, otherProps] = splitProps(props, ['component']);

  return (
    <Dynamic {...otherProps} component={localProps.component} data-solid-ui-listbox-label id={id} />
  );
}

type ListboxProps<ListboxElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent<{
    'aria-activedescendent': string;
    'aria-labelledby': string;
    id: string;
    onKeyDown: JSX.EventHandler<ListboxElement, KeyboardEvent>;
    role: string;
    tabIndex: string | number;
  }>;
  idPrefix?: string;
  role?: string;
}>;

export function Listbox<ItemValue, ListboxElement extends HTMLElement = HTMLUListElement>(
  props: ListboxProps<ListboxElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'ul', idPrefix: 'solid-ui-listbox', role: 'listbox' },
    props
  );

  const id = useId(props.idPrefix);

  const listboxState = useListboxState<ItemValue>();
  const listboxSelectors = useListboxSelectors<ItemValue>();
  const listboxActions = useListboxActions<ItemValue>();

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix', 'role']);

  let search = '';
  let resetSearch: NodeJS.Timeout;

  return (
    <Dynamic
      {...otherProps}
      aria-activedescendent={listboxState.activeItemId}
      aria-labelledby={listboxState.labelId}
      data-solid-ui-listbox=""
      component={localProps.component}
      id={id}
      onKeyDown={useKeyEventHandlers<ListboxElement>({
        ArrowUp(event) {
          if (listboxSelectors.orientation() === 'vertical') {
            event.preventDefault();
            listboxActions.focusPreviousItem();
          }
        },
        ArrowDown(event) {
          if (listboxSelectors.orientation() === 'vertical') {
            event.preventDefault();
            listboxActions.focusNextItem();
          }
        },
        ArrowLeft(event) {
          if (listboxSelectors.orientation() === 'horizontal') {
            event.preventDefault();
            listboxActions.focusPreviousItem();
          }
        },
        ArrowRight(event) {
          if (listboxSelectors.orientation() === 'horizontal') {
            event.preventDefault();
            listboxActions.focusNextItem();
          }
        },
        Home(event) {
          event.preventDefault();
          listboxActions.focusFirstItem();
        },
        End(event) {
          event.preventDefault();
          listboxActions.focusLastItem();
        },
        default(event) {
          if (event.key.length === 1) {
            clearTimeout(resetSearch);
            search += event.key;
            listboxActions.focusItemStartingWith(search);

            resetSearch = setTimeout(() => {
              search = '';
            }, 500);
          }
        },
      })}
      role={localProps.role}
      tabIndex={0}
    />
  );
}

export type ListboxItemProps<
  ItemValue,
  ListboxItemElement extends HTMLElement
> = BaseComponentProps<{
  component?: DynamicComponent<{
    id: string;
    // onClick: JSX.EventHandler<ListboxItemElement, MouseEvent>;
    onMouseEnter: JSX.EventHandler<ListboxItemElement, MouseEvent>;
    onMouseLeave: JSX.EventHandler<ListboxItemElement, MouseEvent>;
    role: string;
  }>;
  idPrefix?: string;
  role?: string;
  value?: ItemValue;
}>;

export function ListboxItem<ItemValue, ListboxItemElement extends HTMLElement = HTMLLIElement>(
  props: ListboxItemProps<ItemValue, ListboxItemElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'li', idPrefix: 'solid-ui-listbox-item', role: 'option' },
    props
  );

  const listboxState = useListboxState<ItemValue>();
  const listboxSelectors = useListboxSelectors<ItemValue>();
  const listboxActions = useListboxActions<ItemValue>();

  const id = useId(props.idPrefix);

  onMount(() => listboxActions.addItem({ id, value: props.value }));
  onCleanup(() => listboxActions.removeItem(id));

  createEffect(() => {
    if (listboxState.activeItemId === id) {
      document.getElementById(id).scrollIntoView(false);
    }
  });

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix', 'role']);

  return (
    <Dynamic
      {...otherProps}
      aria-selected={listboxSelectors.isItemActive(id) || undefined}
      data-active={listboxSelectors.isItemActive(id) ? '' : undefined}
      data-solid-ui-listbox-item=""
      component={localProps.component}
      id={id}
      onMouseEnter={() => {
        listboxActions.hoverItem(id);
      }}
      onMouseLeave={() => {
        listboxActions.hoverItemClear();
      }}
      role={localProps.role}
    />
  );
}
