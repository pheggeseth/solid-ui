/*
item pseudo states
- selected - when an item has been selected by the user (part of value)
- focus - when item has been given focus by the keyboard
- active - when item is being interacted with
  - for keyboard interactions, active will usually follow focus
  - for mouse interactions, active is separate from focus
tabindex
- if nothing is selected or focused, first item gets tabindex
- if nothing is focused, selected item gets tabindex
- item with focus gets tabindex
*/

import {
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
import { createStore, DeepReadonly, produce, unwrap } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import { BaseComponent, BaseComponentProps, DynamicComponent, ListboxOrientation } from '~/types';
import { useId } from '~/utils/componentUtils';

type ListboxItem<ItemValue> = {
  id: string;
  active: boolean;
  disabled: boolean;
  focus: boolean;
  selected: boolean;
  value?: ItemValue;
};

type ListboxState<ItemValue> = {
  items: ListboxItem<ItemValue>[];
  ['aria-orientation']: ListboxOrientation;
  activeItemIndex: number;
  activeItem: ListboxItem<ItemValue>;
  focusedItemIndex: number;
  focusedItem: ListboxItem<ItemValue>;
  selectedItems: ListboxItem<ItemValue>[];
  selectedItemIds: string[];
};

type ListboxSelectors<ItemValue> = {
  isItemActive(itemId: ListboxItem<ItemValue>['id']): boolean;
  isItemFocused(itemId: ListboxItem<ItemValue>['id']): boolean;
  isItemSelected(itemId: ListboxItem<ItemValue>['id']): boolean;
  hasTabIndex(itemId: ListboxItem<ItemValue>['id']): boolean;
};

type ListboxActions<ItemValue> = {
  onItemMount(item: Pick<ListboxItem<ItemValue>, 'id' | 'disabled' | 'value'>): void;
  updateItem(
    itemId: ListboxItem<ItemValue>['id'],
    updates: Pick<ListboxItem<ItemValue>, 'disabled' | 'value'>
  ): void;
  onItemCleanup(itemId: ListboxItem<ItemValue>['id']): void;
  focusPreviousItem(): void;
  focusNextItem(): void;
  focusFirstItem(): void;
  focusLastItem(): void;
  focusItem(itemId: ListboxItem<ItemValue>['id']): void;
  clickFocusedItem(): void;
  clearFocusedItem(): void;
  onItemClick(itemId: ListboxItem<ItemValue>['id']): void;
  onItemMouseEnter(itemId: ListboxItem<ItemValue>['id']): void;
  onListboxMouseLeave(): void;
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
  value?: ItemValue | ItemValue[];
}>;

export function ListboxProvider<ItemValue = any>(props: ListboxProviderProps<ItemValue>) {
  props = mergeProps<typeof props[]>({ 'aria-orientation': 'vertical' }, props);

  const [state, setState] = createStore<ListboxState<ItemValue>>({
    items: [],
    get ['aria-orientation'](): ListboxOrientation {
      return props['aria-orientation'];
    },
    get activeItemIndex(): number {
      return activeItemIndex();
    },
    get activeItem(): DeepReadonly<ListboxItem<ItemValue>> {
      return activeItem();
    },
    get focusedItemIndex(): number {
      return focusedItemIndex();
    },
    get focusedItem(): DeepReadonly<ListboxItem<ItemValue>> {
      return focusedItem();
    },
    get selectedItems(): DeepReadonly<ListboxItem<ItemValue>>[] {
      return selectedItems();
    },
    get selectedItemIds(): string[] {
      return selectedItemIds();
    },
  });

  const activeItemIndex = createMemo(() => state.items.findIndex((item) => item.active));
  const activeItem = createMemo(() => state.items[activeItemIndex()]);
  const activeItemId = createMemo(() => activeItem()?.id);
  const focusedItemIndex = createMemo(() => state.items.findIndex((item) => item.focus));
  const focusedItem = createMemo(() => state.items[focusedItemIndex()]);
  const focusedItemId = createMemo(() => focusedItem()?.id);
  const selectedItems = createMemo(() => state.items.filter((item) => item.selected));
  const selectedItemIds = createMemo(() => selectedItems().map((item) => item.id));

  const selectors: ListboxSelectors<ItemValue> = {
    isItemActive: createSelector(activeItemId),
    isItemFocused: createSelector(focusedItemId),
    isItemSelected: createSelector(selectedItemIds, (itemId, ids) => ids.includes(itemId)),
    hasTabIndex: (itemId) => {
      return (
        (!focusedItem() && selectedItems().length === 0 && state.items[0]?.id === itemId) ||
        (!focusedItem() && selectors.isItemSelected(itemId)) ||
        selectors.isItemFocused(itemId)
      );
    },
  };

  const focusItemAtIndex = (index: number) =>
    produce((state: ListboxState<ItemValue>) => {
      state.items[focusedItemIndex()].active = false;
      state.items[focusedItemIndex()].focus = false;
      state.items[index].active = true;
      state.items[index].focus = true;
    });

  const clickItem = (itemId: ListboxItem<ItemValue>['id']) => {
    console.log('clickItem');
    const itemClickedIndex = state.items.findIndex((item) => item.id === itemId);

    if (itemClickedIndex >= 0) {
      setState(
        produce((state) => {
          state.items[itemClickedIndex].selected = !state.items[itemClickedIndex].selected;
        })
      );
    }
  };

  const actions: ListboxActions<ItemValue> = {
    onItemMount(item) {
      setState('items', (items) => [
        ...items,
        {
          ...item,
          active: false,
          focus: false,
          selected: Array.isArray(props.value)
            ? props.value.includes(item.value)
            : props.value === item.value,
        },
      ]);
    },
    updateItem(itemId, updates) {
      setState('items', (item) => item.id === itemId, updates);
    },
    onItemCleanup(itemId) {
      setState('items', (items) => items.filter((item) => item.id !== itemId));
    },
    focusPreviousItem() {
      const prevIndex = focusedItemIndex() - 1;
      if (prevIndex >= 0) {
        setState(focusItemAtIndex(prevIndex));
      }
    },
    focusNextItem() {
      const nextIndex = focusedItemIndex() + 1;
      if (nextIndex < state.items.length) {
        setState(focusItemAtIndex(nextIndex));
      }
    },
    focusFirstItem() {
      setState(focusItemAtIndex(0));
    },
    focusLastItem() {
      setState(focusItemAtIndex(state.items.length - 1));
    },
    clickFocusedItem() {
      clickItem(focusedItemId());
    },
    clearFocusedItem() {
      setState(
        produce((state) => {
          const focusedItem = state.items[focusedItemIndex()];
          focusedItem.active = false;
          focusedItem.focus = false;
          // TODO: only select focused item on Tab out if this is a combobox listbox
          // focusedItem.selected = true;
        })
      );
    },
    onItemClick(itemId) {
      clickItem(itemId);
    },
    focusItem(itemId) {
      setState(
        produce((state) => {
          if (focusedItem()) {
            state.items[focusedItemIndex()].active = false;
            state.items[focusedItemIndex()].focus = false;
          }

          const item = state.items.find((item) => item.id === itemId);
          if (item) {
            item.active = true;
            item.focus = true;
          }
        })
      );
    },
    onItemMouseEnter(itemId) {
      setState(
        produce((state) => {
          if (activeItemIndex() >= 0) {
            state.items[activeItemIndex()].active = false;
          }

          const item = state.items.find((item) => item.id === itemId);
          if (item) {
            item.active = true;
          }
        })
      );
    },
    onListboxMouseLeave() {
      if (activeItemIndex() >= 0) {
        setState('items', activeItemIndex(), 'active', false);
      }
    },
  };

  createEffect(() => {
    console.log({ active: activeItemId(), focus: focusedItemId() });
    document.getElementById(focusedItemId())?.focus();
  });

  return (
    <ListboxContext.Provider value={{ state: state as ListboxState<any>, selectors, actions }}>
      {props.children}
    </ListboxContext.Provider>
  );
}

export type ListboxProps<ListboxElement extends HTMLElement> = BaseComponentProps<{
  as?: DynamicComponent<{
    onKeyDown: JSX.EventHandler<ListboxElement, KeyboardEvent>;
    onMouseLeave: JSX.EventHandler<ListboxElement, MouseEvent>;
    ref: (element: ListboxElement) => void;
    role: 'listbox';
  }>;
  idPrefix?: string;
}>;

export function Listbox<ItemValue, ListboxElement extends HTMLElement = HTMLUListElement>(
  props: ListboxProps<ListboxElement>
) {
  props = mergeProps<typeof props[]>({ as: 'ul', idPrefix: 'solid-ui-listbox' }, props);

  const id = useId(props.idPrefix);

  const listboxState = useListboxState<ItemValue>();
  const listboxActions = useListboxActions<ItemValue>();

  const onKeyDown: JSX.EventHandler<ListboxElement, KeyboardEvent> = (event) => {
    switch (event.key) {
      case 'ArrowUp': {
        if (listboxState['aria-orientation'] === 'vertical') {
          event.preventDefault();
          listboxActions.focusPreviousItem();
        }
        break;
      }
      case 'ArrowDown': {
        if (listboxState['aria-orientation'] === 'vertical') {
          event.preventDefault();
          listboxActions.focusNextItem();
        }
        break;
      }
      case 'ArrowLeft': {
        if (listboxState['aria-orientation'] === 'horizontal') {
          event.preventDefault();
          listboxActions.focusPreviousItem();
        }
        break;
      }
      case 'ArrowRight': {
        if (listboxState['aria-orientation'] === 'horizontal') {
          event.preventDefault();
          listboxActions.focusNextItem();
        }
        break;
      }
      case 'Home': {
        event.preventDefault();
        listboxActions.focusFirstItem();
        break;
      }
      case 'End': {
        event.preventDefault();
        listboxActions.focusLastItem();
        break;
      }
      case 'Enter': {
        listboxActions.clickFocusedItem();
        break;
      }
      case ' ': {
        event.preventDefault();
        listboxActions.clickFocusedItem();
        break;
      }
      case 'Tab': {
        listboxActions.clearFocusedItem();
        break;
      }
    }
  };

  const onMouseLeave: JSX.EventHandler<ListboxElement, MouseEvent> = () => {
    listboxActions.onListboxMouseLeave();
  };

  const ref = (element: ListboxElement) => {
    element.id = id;
  };

  const [localProps, otherProps] = splitProps(props, ['as', 'idPrefix']);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      onKeyDown={onKeyDown}
      onMouseLeave={onMouseLeave}
      ref={ref}
      role="listbox"
    />
  );
}

export type ListboxItemProps<
  ItemValue,
  ListboxItemElement extends HTMLElement
> = BaseComponentProps<{
  as?: DynamicComponent<{
    onClick: JSX.EventHandler<ListboxItemElement, MouseEvent>;
    onFocus: JSX.EventHandler<ListboxItemElement, FocusEvent>;
    onMouseEnter: JSX.EventHandler<ListboxItemElement, MouseEvent>;
    ref: (element: ListboxItemElement) => void;
    role: 'option';
    tabIndex: string | number;
  }>;
  disabled?: boolean;
  idPrefix?: string;
  value?: ItemValue;
}>;

export function ListboxItem<ItemValue, ListboxItemElement extends HTMLElement = HTMLLIElement>(
  props: ListboxItemProps<ItemValue, ListboxItemElement>
) {
  props = mergeProps<typeof props[]>({ as: 'li', idPrefix: 'solid-ui-listbox-item' }, props);

  const id = useId(props.idPrefix);

  const selectors = useListboxSelectors<ItemValue>();
  const actions = useListboxActions<ItemValue>();

  const [localProps, otherProps] = splitProps(props, ['as', 'idPrefix']);

  const onClick = () => actions.onItemClick(id);
  const onFocus = () => actions.focusItem(id);
  const onMouseEnter = () => actions.onItemMouseEnter(id);

  const ref = (element: ListboxItemElement) => {
    element.id = id;
  };

  onMount(() => actions.onItemMount({ id, disabled: props.disabled, value: props.value }));
  onCleanup(() => actions.onItemCleanup(id));

  return (
    <Dynamic
      {...otherProps}
      aria-selected={selectors.isItemSelected(id)}
      component={localProps.as}
      data-active={selectors.isItemActive(id) ? '' : undefined}
      data-selected={selectors.isItemSelected(id) ? '' : undefined}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      ref={ref}
      role="option"
      tabIndex={selectors.hasTabIndex(id) ? 0 : -1}
    />
  );
}
