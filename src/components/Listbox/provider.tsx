import { mergeProps, PropsWithChildren } from 'solid-js';
import { ListOrientation } from '~/types';
import {
  createListboxStore,
  ListboxContextProp,
  ListboxStore,
  ListboxStoreContext,
  useListboxContext,
} from './context';

export type ListboxProviderProps<Value> = PropsWithChildren<
  ListboxContextProp<Value> & {
    onChange?: (newValue: Value) => void;
    orientation?: ListOrientation;
    value?: Value;
  }
>;

export default function ListboxProvider<Value>(props: ListboxProviderProps<Value>) {
  props = mergeProps<typeof props[]>({ orientation: 'vertical' }, props);
  const store = createListboxStore({
    onChange: props.onChange,
    orientation: () => props.orientation,
    value: () => props.value,
  });

  return (
    <ListboxStoreContext.Provider value={store as ListboxStore<Value>}>
      {(() => {
        props.context?.(useListboxContext());
        return props.children;
      })()}
    </ListboxStoreContext.Provider>
  );
}
