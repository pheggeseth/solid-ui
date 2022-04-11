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
  CreateListboxValueConfig,
  ListboxValueActions,
  ListboxValueSelectors,
  ListboxValueState,
} from '../Listbox';
import { createPopoverPanelActions, PopoverPanelActions, PopoverPanelState } from '../Popover';

export type ComboboxElementIds = {
  inputId: string;
  labelId: string;
  listId: string;
  overlayId: string;
  panelId: string;
  triggerId: string;
};

export type ComboboxState<Value> = ComboboxElementIds &
  ActiveItemState &
  PopoverPanelState &
  ListboxValueState & {
    inputValue: string;
    getInputDisplayValue: (value: Value) => string;
  };

export type ComboboxActions<Value> = ActiveItemActions &
  PopoverPanelActions &
  ListboxValueActions<Value> &
  Readonly<{
    clearValue(): void;
    registerGetInputDisplayValue(callback: (value: Value) => string): void;
    setElementId(name: keyof ComboboxElementIds, id: string): void;
    setInputValue(value: string): void;
  }>;

export type ComboboxSelectors<Value> = ActiveItemSelectors & ListboxValueSelectors<Value>;

export type ComboboxStore<Value> = Readonly<
  [
    state: ComboboxState<Value>,
    actions: ComboboxActions<Value>,
    selectors: ComboboxSelectors<Value>
  ]
>;

export type CreateComboboxStoreConfig<Value> = CreateActiveItemActionsConfig &
  CreateListboxValueConfig<Value> &
  Readonly<{
    sortOptions?: (valueA: Value, valueB: Value) => number;
    orientation?: Accessor<ListOrientation>;
  }>;

export function createComboboxStore<Value = any>(
  config: CreateComboboxStoreConfig<Value> = {}
): ComboboxStore<Value> {
  const { orientation = () => 'vertical' } = config;

  const [state, setState] = createStore<ComboboxState<Value>>({
    inputId: null,
    labelId: null,
    listId: null,
    overlayId: null,
    panelId: null,
    triggerId: null,
    shouldShowPanel: false,
    get isPanelOpen(): boolean {
      return state.shouldShowPanel && (!state.overlayId || state.isOverlayMounted);
    },
    isOverlayMounted: false,
    get orientation(): ListOrientation {
      return orientation();
    },
    items: [],
    activeItemId: null,
    search: '',
    inputValue: '',
    getInputDisplayValue: (value) => String(value),
  });

  const values: { [id: string]: Value } = {};

  const actions: ComboboxActions<Value> = {
    ...createActiveItemActions(setState, {
      getInitialFocusedItem: (itemId) => values[itemId] === config.value?.(),
    }),
    ...createPopoverPanelActions(setState),
    setElementId(name, id) {
      setState({ [name]: id });
    },
    addItem(itemId) {
      setState('items', (items) => {
        const newItems = [...items, itemId];
        return config.sortOptions
          ? newItems.sort((idA, idB) => config.sortOptions(values[idA], values[idB]))
          : newItems;
      });
    },
    addValue(itemId, value) {
      values[itemId] = value;
    },
    removeValue(itemId) {
      delete values[itemId];
    },
    chooseValue(itemId) {
      const newValue = values[itemId] as Value;

      if (itemId) {
        setState('inputValue', state.getInputDisplayValue(newValue));
        if (newValue !== config.value?.()) {
          config.onChange?.(newValue);
        }
      }

      actions.closePopover();
    },
    clearValue() {
      if (config.value?.() !== null) {
        config.onChange?.(null);
      }
    },
    setInputValue(value) {
      setState('inputValue', value);

      if (!value) {
        actions.clearValue();
      }
    },
    registerGetInputDisplayValue(callback) {
      setState('getInputDisplayValue', () => callback);
    },
  };

  const selectors: ComboboxSelectors<Value> = {
    isActive: createSelector(() => state.activeItemId),
    isSelected: createSelector(config.value),
    get selectedValue() {
      return config.value?.();
    },
  };

  return [state as ComboboxState<Value>, actions, selectors] as const;
}

export const ComboboxStoreContext = createContext<ComboboxStore<any>>();
export function useComboboxStore() {
  return useContext(ComboboxStoreContext);
}
export function useComboboxState<Value>() {
  return useContext(ComboboxStoreContext)[0] as ComboboxState<Value>;
}
export function useComboboxActions<Value>() {
  return useContext(ComboboxStoreContext)[1] as ComboboxActions<Value>;
}
export function useComboboxSelectors<Value>() {
  return useContext(ComboboxStoreContext)[2] as ComboboxSelectors<Value>;
}

export type ComboboxContext<Value> = Readonly<{
  isActive: (itemId: string) => boolean;
  isSelected: (value: Value) => boolean;
  isOpen: Accessor<boolean>;
  open: () => void;
  close: () => void;
}>;

export function useComboboxContext<Value = any>(): ComboboxContext<Value> {
  const state = useComboboxState();
  const actions = useComboboxActions();
  const selectors = useComboboxSelectors();

  return {
    isActive: (itemId: string) => selectors.isActive(itemId),
    isSelected: (value: Value) => selectors.isSelected(value),
    isOpen: () => state.isPanelOpen,
    open: () => actions.openPopover(),
    close: () => actions.closePopover(),
  };
}

export type ComboboxContextProp<Value> = {
  context?: (ctx: ComboboxContext<Value>) => void;
};
