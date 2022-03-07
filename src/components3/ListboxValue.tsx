import {
  Accessor,
  createContext,
  createSelector,
  onCleanup,
  onMount,
  PropsWithChildren,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { useKeyEventHandlers } from '~/utils/eventUtils';

type State<Value> = {
  values: { [id: string]: Value };
  selectedValue: Value;
};

type Selectors<Value> = {
  isSelected(value: Value): boolean;
};

type Actions<Value> = {
  addValue(id: string, value: Value): void;
  removeValue(id: string): void;
  chooseValue(id: string): void;
};

const ListboxValueContext =
  createContext<{ state: State<any>; selectors: Selectors<any>; actions: Actions<any> }>();
function useListboxValueState<Value>() {
  return useContext(ListboxValueContext).state as State<Value>;
}
export function useListboxValueSelectors<Value>() {
  return useContext(ListboxValueContext).selectors as Selectors<Value>;
}
function useActions<Value>() {
  return useContext(ListboxValueContext).actions as Actions<Value>;
}

export type ListboxValueProviderProps<Value> = PropsWithChildren<{
  value?: Value;
  onChange?: (newValue: Value) => void;
}>;

export function ListboxValueProvider<Value>(props: ListboxValueProviderProps<Value>) {
  const [state, setState] = createStore<State<Value>>({
    values: {},
    get selectedValue(): Value {
      return props.value;
    },
  });

  const selectors: Selectors<Value> = {
    isSelected: createSelector(() => state.selectedValue),
  };

  const actions: Actions<Value> = {
    addValue(id, value) {
      setState('values', { [id]: value });
    },
    removeValue(id) {
      setState('values', { [id]: undefined });
    },
    chooseValue(id) {
      if (id in state.values) {
        props.onChange?.(state.values[id] as Value);
      }
    },
  };

  return (
    <ListboxValueContext.Provider value={{ state, selectors, actions }}>
      {props.children}
    </ListboxValueContext.Provider>
  );
}

export function createListboxValueContainerProps<
  Value,
  ListboxValueContainerElement extends HTMLElement
>(config: { activeId: Accessor<string>; search: Accessor<string> }) {
  const actions = useActions<Value>();

  return {
    onKeyDown: useKeyEventHandlers<ListboxValueContainerElement>({
      Enter(event) {
        if (config.activeId()) {
          event.preventDefault();
          actions.chooseValue(config.activeId());
        }
      },
      [' '](event) {
        if (config.activeId() && !config.search()) {
          event.preventDefault();
          actions.chooseValue(config.activeId());
        }
      },
    }),
  };
}

export function createListboxValueItemProps<Value>(config: { id: string; value: Value }) {
  const selectors = useListboxValueSelectors<Value>();
  const actions = useActions<Value>();

  onMount(() => actions.addValue(config.id, config.value));
  onCleanup(() => actions.removeValue(config.id));

  return {
    get ['data-selected']() {
      return selectors.isSelected(config.value) ? '' : undefined;
    },
    onClick() {
      actions.chooseValue(config.id);
    },
  };
}
