import { Component, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { usePopoverActions } from '~/components/Popover/context';
import {
  InitialMountFocus,
  ItemType,
  ListActions,
  ListContext,
  ListState,
  Position,
} from './context';

type ListProviderProps = {
  value?: any;
  onChange?: (value: any) => void;
  onItemSelect?: () => void;
  onListTabOut?: () => void;
  useRovingTabIndex?: boolean;
  isRadioList?: boolean;
};

const ListProvider: Component<ListProviderProps> = (props) => {
  const [state, setState] = createStore<ListState>({
    labelId: null,
    labelComponent: null,
    orientation: 'vertical',
    valueSelected: props.value,
    onValueChangeCallback: props.onChange,
    items: [],
    sortItems: null,
    searchText: '',
    initialMountFocus: null,
    preventMouseDownDefault: false,
    useRovingTabIndex: props.useRovingTabIndex,
    isRadioList: props.isRadioList,
  });

  function clearItemFocus() {
    setState('items', {}, { isActive: false });
  }

  function getItemsWithOriginalIndex(items) {
    return items.map((item, index) => ({ item, index }));
  }

  function getWrappingItemsArray(itemsWithIndices: { item: ItemType; index: number }[]) {
    const start = itemsWithIndices.findIndex((e) => e.item.isActive) + 1;
    const end = start + itemsWithIndices.length;

    return itemsWithIndices.concat(itemsWithIndices).slice(start, end);
  }

  function getItemPositionIndex(
    positionProps:
      | { position: Exclude<Position, Position.Specific> }
      | { position: Position.Specific; id: string }
  ): number {
    let index: number;

    switch (positionProps.position) {
      case Position.First: {
        index = state.items.findIndex((item) => !item.isDisabled);
        break;
      }
      case Position.Last: {
        index = getItemsWithOriginalIndex(state.items)
          .reverse()
          .find(({ item }) => !item.isDisabled)?.index;
        break;
      }
      case Position.Next: {
        const nextItems = getWrappingItemsArray(getItemsWithOriginalIndex(state.items));
        index = nextItems.find((e) => !e.item.isDisabled)?.index;
        break;
      }
      case Position.Previous: {
        const previousItems = getWrappingItemsArray(
          getItemsWithOriginalIndex(state.items).reverse()
        );
        index = previousItems.find((e) => !e.item.isDisabled)?.index;
        break;
      }
      case Position.Specific: {
        index = state.items.findIndex((item) => item.id === positionProps.id);
        break;
      }
    }

    return index === undefined ? -1 : index;
  }

  const actions: ListActions = {
    registerLabel(labelId, labelComponent) {
      if (
        labelComponent === 'Label' ||
        !state.labelComponent ||
        labelComponent === state.labelComponent
      ) {
        setState({ labelId, labelComponent });
      }
    },
    registerOrientation(orientation) {
      setState({ orientation });
    },
    onItemMount(item) {
      if (state.initialMountFocus === InitialMountFocus.Selected) {
        setState('items', (items) => {
          const newItems = [...items, { ...item, isActive: item.value === state.valueSelected }];
          return state.sortItems ? newItems.sort(state.sortItems) : newItems;
        });
        return;
      }

      if (state.initialMountFocus === InitialMountFocus.Last) {
        setState('items', {}, { isActive: false });
      }

      setState('items', (items) => {
        const newItems = [
          ...items,
          {
            ...item,
            isActive:
              (state.initialMountFocus === InitialMountFocus.First && items.length === 0) ||
              state.initialMountFocus === InitialMountFocus.Last,
          },
        ];
        return state.sortItems ? newItems.sort(state.sortItems) : newItems;
      });
    },
    onItemDisabledChange(itemId, isDisabled) {
      setState('items', (item) => item.id === itemId, { isDisabled });
    },
    onItemCleanup(idToRemove) {
      setState('items', (items) => {
        const newItems = items.filter((item) => item.id !== idToRemove);
        return state.sortItems ? newItems.sort(state.sortItems) : newItems;
      });
    },
    onItemFocus(focusProps) {
      if (state.items.length === 0) return;

      if (focusProps.position === Position.None) {
        clearItemFocus();
      } else {
        const itemIndexToFocus = getItemPositionIndex(focusProps);
        clearItemFocus();
        setState('items', itemIndexToFocus, 'isActive', true);
      }
    },
    onListTabOut() {
      props.onListTabOut?.();
    },
    onInitialMountFocusChange(initialMountFocus) {
      if (state.initialMountFocus === InitialMountFocus.Selected) return;
      setState({ initialMountFocus });
    },
    onItemSelect(value) {
      state.onValueChangeCallback?.(value);
      props.onItemSelect?.();
    },
    onItemPositionSelect(positionProps) {
      const itemIndex = getItemPositionIndex(positionProps);
      if (state.items.findIndex((item) => item.isActive) !== itemIndex) {
        clearItemFocus();
        setState('items', itemIndex, 'isActive', true);
        actions.onItemSelect(state.items[itemIndex].value);

        if (props.useRovingTabIndex) {
          document.getElementById(state.items[itemIndex].id)?.focus();
        }
      }
    },
    onValueChange(valueSelected) {
      setState({ valueSelected });
    },
    onSearchTextChange(searchText) {
      setState({ searchText });
    },
    selectActiveItem() {
      const activeItem = state.items.find((item) => item.isActive)?.value;
      if (!activeItem) return;

      state.onValueChangeCallback?.(activeItem);
      props.onItemSelect?.();
    },
    setOnValueChangeCallback(onValueChangeCallback) {
      setState({ onValueChangeCallback });
    },
    setShouldPreventMouseDownDefault(preventMouseDownDefault) {
      setState({ preventMouseDownDefault });
    },
    setSortItems(sortItems) {
      setState({ sortItems });
    },
  };

  createEffect(() => {
    actions.onValueChange(props.value);
  });

  return <ListContext.Provider value={[state, actions]}>{props.children}</ListContext.Provider>;
};

export default ListProvider;

export const ListInPopoverProvider: Component<ListProviderProps> = (props) => {
  const PopoverActions = usePopoverActions();

  return (
    <ListProvider
      {...props}
      onListTabOut={PopoverActions.closePopover}
      onItemSelect={PopoverActions.closePopover}
    >
      {props.children}
    </ListProvider>
  );
};
