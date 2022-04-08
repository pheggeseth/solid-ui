import { mergeProps, PropsWithChildren } from 'solid-js';
import { ListOrientation } from '~/types';
import {
  ComboboxContextProp,
  ComboboxStore,
  ComboboxStoreContext,
  createComboboxStore,
  useComboboxContext,
} from './context';

export type ComboboxProviderProps<Value> = PropsWithChildren<
  ComboboxContextProp<Value> & {
    onChange?: (newValue: Value) => void;
    orientation?: ListOrientation;
    value?: Value;
  }
>;

export default function ComboboxProvider<Value>(props: ComboboxProviderProps<Value>) {
  props = mergeProps<typeof props[]>({ orientation: 'vertical' }, props);
  const store = createComboboxStore({
    onChange: props.onChange,
    orientation: () => props.orientation,
    value: () => props.value,
  });

  return (
    <ComboboxStoreContext.Provider value={store as ComboboxStore<Value>}>
      {(() => {
        props.context?.(useComboboxContext());
        return props.children;
      })()}
    </ComboboxStoreContext.Provider>
  );
}
