import { PropsWithChildren } from 'solid-js';
import {
  createRadioGroupStore,
  RadioGroupContextProp,
  RadioGroupStore,
  RadioGroupStoreContext,
  useRadioGroupContext,
} from './context';

export type RadioGroupProviderProps<Value> = PropsWithChildren<
  RadioGroupContextProp<Value> & {
    onChange?: (newValue: Value) => void;
    value?: Value;
  }
>;

export default function RadioGroupProvider<Value>(props: RadioGroupProviderProps<Value>) {
  const store = createRadioGroupStore({
    onChange: props.onChange,
    shouldWrap: true,
    value: () => props.value,
  });

  return (
    <RadioGroupStoreContext.Provider value={store as RadioGroupStore<Value>}>
      {(() => {
        props.context?.(useRadioGroupContext());
        return props.children;
      })()}
    </RadioGroupStoreContext.Provider>
  );
}
