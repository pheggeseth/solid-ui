import { createContext, createSelector, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  ActiveItemActions,
  ActiveItemSelectors,
  ActiveItemState,
  createActiveItemActions,
  CreateActiveItemActionsConfig,
} from '../ActiveItem';
import { CreateListboxValueConfig, ListboxValueActions, ListboxValueSelectors } from '../Listbox';

type RadioGroupElementIds = {
  labelId: string;
};

export type RadioGroupState = RadioGroupElementIds & ActiveItemState;

export type RadioGroupActions<Value> = ActiveItemActions &
  ListboxValueActions<Value> &
  Readonly<{
    setElementId(name: keyof RadioGroupElementIds, id: string): void;
  }>;

export type RadioGroupSelectors<Value> = ActiveItemSelectors & ListboxValueSelectors<Value>;

export type RadioGroupStore<Value> = Readonly<
  [state: RadioGroupState, actions: RadioGroupActions<Value>, selectors: RadioGroupSelectors<Value>]
>;

export type CreateRadioGroupStoreConfig<Value> = CreateActiveItemActionsConfig &
  CreateListboxValueConfig<Value>;

export function createRadioGroupStore<Value = any>(
  config: CreateRadioGroupStoreConfig<Value>
): RadioGroupStore<Value> {
  const [state, setState] = createStore<RadioGroupState>({
    labelId: null,
    activeItemId: null,
    items: [],
    search: '',
  });

  const values: { [id: string]: Value } = {};

  const actions: RadioGroupActions<Value> = {
    ...createActiveItemActions(setState, {
      getInitialFocusedItem: (itemId, items) => {
        if ([null, undefined].includes(config.value?.())) {
          return items.indexOf(itemId) === 0;
        }

        return values[itemId] === config.value?.();
      },
      shouldWrap: true,
    }),
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
    },
  };

  const selectors: RadioGroupSelectors<Value> = {
    isActive: createSelector(() => state.activeItemId),
    isSelected: createSelector(config.value),
    get selectedValue() {
      return config.value?.();
    },
  };

  return [state as RadioGroupState, actions, selectors] as const;
}

export const RadioGroupStoreContext = createContext<RadioGroupStore<any>>();
export function useRadioGroupStore() {
  return useContext(RadioGroupStoreContext);
}
export function useRadioGroupState() {
  return useContext(RadioGroupStoreContext)[0];
}
export function useRadioGroupActions<Value>() {
  return useContext(RadioGroupStoreContext)[1] as RadioGroupActions<Value>;
}
export function useRadioGroupSelectors<Value>() {
  return useContext(RadioGroupStoreContext)[2] as RadioGroupSelectors<Value>;
}

export type RadioGroupContext<Value> = Readonly<{
  isActive: (itemId: string) => boolean;
  isSelected: (value: Value) => boolean;
}>;

export function useRadioGroupContext<Value = any>(): RadioGroupContext<Value> {
  const selectors = useRadioGroupSelectors();

  return {
    isActive: (itemId: string) => selectors.isActive(itemId),
    isSelected: (value: Value) => selectors.isSelected(value),
  };
}

export type RadioGroupContextProp<Value> = {
  context?: (ctx: RadioGroupContext<Value>) => void;
};
