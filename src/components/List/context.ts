import { createContext, useContext } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

export type ItemType = {
  value?: any;
  id: string;
  isActive: boolean;
  isDisabled: boolean;
};

export type ComboboxSelectionMode = 'manual' | 'automatic';

export type ListOrientation = 'vertical' | 'horizontal';

export type ListState = DeepReadonly<{
  labelId: string | null;
  labelComponent: string | null;
  orientation: ListOrientation;
  valueSelected?: any;
  onValueChangeCallback?: (value: any) => void;
  items: ItemType[];
  sortItems?: (itemA: ItemType, itemB: ItemType) => number;
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

export type ListActions = Readonly<{
  registerLabel(labelId: string, labelComponent: string): void;
  registerOrientation(orientation: ListOrientation): void;
  onItemMount(item: {
    id: ItemType['id'];
    isDisabled: ItemType['isDisabled'];
    value?: ItemType['value'];
  }): void;
  onItemDisabledChange(itemId: ItemType['id'], isDisabled: ItemType['isDisabled']): void;
  onItemCleanup(idToRemove: string): void;
  onItemFocus(
    props:
      | { position: Exclude<Position, Position.Specific> }
      | { position: Position.Specific; id: string }
  ): void;
  onListTabOut(): void;
  onInitialMountFocusChange(initialMountFocus: InitialMountFocus): void;
  onItemSelect(itemToSelect: ItemType): void;
  onItemPositionSelect(props: { position: Position.Next | Position.Previous });
  onValueChange(valueSelected: any): void;
  onSearchTextChange(searchText: string): void;
  selectActiveItem(): void;
  setOnValueChangeCallback(onValueChangeCallback: (value: any) => void): void;
  setShouldPreventMouseDownDefault(preventDefault: boolean): void;
  setSortItems(sortItems: (itemA: ItemType, itemB: ItemType) => number): void;
}>;

export const ListContext = createContext<[state: ListState, actions: ListActions]>();

export function useListContext() {
  return useContext(ListContext);
}

export function useListState() {
  return useListContext()[0];
}

export function useListActions() {
  return useListContext()[1];
}
