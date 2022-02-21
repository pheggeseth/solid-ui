import { Accessor, createContext, useContext } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

export type ItemType<T = any> = {
  value?: T;
  id: string;
  isActive: boolean;
  isDisabled: boolean;
};

export type ComboboxSelectionMode = 'manual' | 'automatic';

export type ListOrientation = 'vertical' | 'horizontal';

export type ListState<T = any> = DeepReadonly<{
  labelId: string | null;
  labelComponent: string | null;
  orientation: ListOrientation;
  valueSelected?: T;
  onValueChangeCallback?: (value: T) => void;
  items: ItemType<T>[];
  sortItems?: (itemA: ItemType<T>, itemB: ItemType<T>) => number;
  searchText: string;
  initialMountFocus: InitialMountFocus;
  preventMouseDownDefault: boolean;
  useRovingTabIndex?: boolean;
  isRadioList?: boolean;
}>;

export enum Position {
  First = 'First',
  Last = 'Last',
  Next = 'Next',
  Previous = 'Previous',
  Specific = 'Specific',
  None = 'None',
}

export enum InitialMountFocus {
  First = 'First',
  Last = 'Last',
  Selected = 'Selected',
}

export type ListActions<T = any> = Readonly<{
  registerLabel(labelId: string, labelComponent: string): void;
  registerOrientation(orientation: ListOrientation): void;
  onItemMount(item: {
    id: ItemType<T>['id'];
    isDisabled: ItemType<T>['isDisabled'];
    value?: ItemType<T>['value'];
  }): void;
  onItemDisabledChange(itemId: ItemType<T>['id'], isDisabled: ItemType<T>['isDisabled']): void;
  onItemCleanup(idToRemove: string): void;
  onItemFocus(
    props:
      | { position: Exclude<Position, Position.Specific> }
      | { position: Position.Specific; id: string }
  ): void;
  onListTabOut(): void;
  onInitialMountFocusChange(initialMountFocus: InitialMountFocus): void;
  onItemSelect(itemToSelect: ItemType<T>['value']): void;
  onItemPositionSelect(props: { position: Position.Next | Position.Previous });
  onValueChange(valueSelected: ItemType<T>['value']): void;
  onSearchTextChange(searchText: string): void;
  selectActiveItem(): void;
  setOnValueChangeCallback(onValueChangeCallback: (value: ItemType<T>['value']) => void): void;
  setShouldPreventMouseDownDefault(preventDefault: boolean): void;
  setSortItems(sortItems: (itemA: ItemType<T>, itemB: ItemType<T>) => number): void;
}>;

export const ListContext = createContext<[state: ListState, actions: ListActions]>();

export function useListContext<T>() {
  return useContext(ListContext) as [state: ListState<T>, actions: ListActions<T>];
}

export function useListState<T>() {
  return useListContext<T>()[0];
}

export function useListActions<T>() {
  return useListContext<T>()[1];
}

export type ListItemExternalContext<T = any> = {
  isActive: Accessor<boolean>;
  isSelected: Accessor<boolean>;
  value: Accessor<T>;
};
