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
import { createPopoverPanelActions, PopoverPanelActions, PopoverPanelState } from '../Popover';

type ListboxElementIds = {
  labelId: string;
  listId: string;
  overlayId: string;
  panelId: string;
  triggerId: string;
};

export type ListboxValueState = {
  orientation: ListOrientation;
};

export type ListboxState = ListboxElementIds &
  ActiveItemState &
  PopoverPanelState &
  ListboxValueState;

export type ListboxValueActions<Value> = {
  addValue(itemId: string, value: Value): void;
  removeValue(itemId: string): void;
  chooseValue(itemId: string): void;
};

export type ListboxActions<Value> = ActiveItemActions &
  PopoverPanelActions &
  ListboxValueActions<Value> &
  Readonly<{
    setElementId(name: keyof ListboxElementIds, id: string): void;
  }>;

export type ListboxValueSelectors<Value> = Readonly<{
  isSelected(value: Value): boolean;
  selectedValue: Value;
}>;

export type ListboxSelectors<Value> = ActiveItemSelectors & ListboxValueSelectors<Value>;

export type ListboxStore<Value> = Readonly<
  [state: ListboxState, actions: ListboxActions<Value>, selectors: ListboxSelectors<Value>]
>;

export type CreateListboxValueConfig<Value> = {
  onChange?: (newValue: Value) => void;
  value?: Accessor<Value>;
};

export type CreateListboxStoreConfig<Value> = CreateActiveItemActionsConfig &
  CreateListboxValueConfig<Value> &
  Readonly<{
    orientation?: Accessor<ListOrientation>;
  }>;

export function createListboxStore<Value = any>(
  config: CreateListboxStoreConfig<Value> = { orientation: () => 'vertical' }
): ListboxStore<Value> {
  const [state, setState] = createStore<ListboxState>({
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
      return config.orientation();
    },
    items: [],
    activeItemId: null,
    search: '',
  });

  const values: { [id: string]: Value } = {};

  const actions: ListboxActions<Value> = {
    ...createActiveItemActions(setState, {
      getInitialFocusedItem: (itemId) => values[itemId] === config.value?.(),
    }),
    ...createPopoverPanelActions(setState),
    setElementId(name, id) {
      setState({ [name]: id });
    },
    addValue(itemId, value) {
      values[itemId] = value;
    },
    removeValue(itemId) {
      delete values[itemId];
    },
    chooseValue(itemId) {
      const newValue = values[itemId];

      if (itemId && newValue !== config.value()) {
        config.onChange?.(newValue);
      }

      actions.closePopover();
    },
  };

  const selectors: ListboxSelectors<Value> = {
    isActive: createSelector(() => state.activeItemId),
    isSelected: createSelector(config.value),
    get selectedValue() {
      return config.value?.();
    },
  };

  return [state as ListboxState, actions, selectors] as const;
}

export const ListboxStoreContext = createContext<ListboxStore<any>>();
export function useListboxStore() {
  return useContext(ListboxStoreContext);
}
export function useListboxState() {
  return useContext(ListboxStoreContext)[0];
}
export function useListboxActions<Value>() {
  return useContext(ListboxStoreContext)[1] as ListboxActions<Value>;
}
export function useListboxSelectors<Value>() {
  return useContext(ListboxStoreContext)[2] as ListboxSelectors<Value>;
}

export type ListboxContext<Value> = Readonly<{
  isActive: (itemId: string) => boolean;
  isSelected: (value: Value) => boolean;
  isOpen: Accessor<boolean>;
  open: () => void;
  close: () => void;
}>;

export function useListboxContext<Value = any>(): ListboxContext<Value> {
  const state = useListboxState();
  const actions = useListboxActions();
  const selectors = useListboxSelectors();

  return {
    isActive: (itemId: string) => selectors.isActive(itemId),
    isSelected: (value: Value) => selectors.isSelected(value),
    isOpen: () => state.isPanelOpen,
    open: () => actions.openPopover(),
    close: () => actions.closePopover(),
  };
}

export type ListboxContextProp<Value> = {
  context?: (ctx: ListboxContext<Value>) => void;
};
