import { createSignal, For, PropsWithChildren } from 'solid-js';
import RadioGroupComponent, { RadioGroupProviderProps } from '../components/RadioGroup';
import { Fruit, fruits } from './utils';

function RadioGroupLabel(props: PropsWithChildren) {
  const { props: labelProps, effects } = RadioGroupComponent.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
}

function RadioGroup<Value>(props: PropsWithChildren<RadioGroupProviderProps<Value>>) {
  return (
    <RadioGroupComponent {...props}>
      {(() => {
        const { props: radioGroupProps, effects } = RadioGroupComponent.createRadioGroup();
        effects();
        return <ul {...radioGroupProps}>{props.children}</ul>;
      })()}
    </RadioGroupComponent>
  );
}

function Radio<Value = any>(props: PropsWithChildren<{ value?: Value }>) {
  const { props: radioProps, effects } = RadioGroupComponent.createRadio<Value>({
    value: () => props.value,
  });

  effects();

  return <li {...radioProps}>{props.children}</li>;
}

export function RadioGroupExample() {
  const [value, setValue] = createSignal<Fruit>();

  return (
    <RadioGroup
      value={value()}
      onChange={(newValue) => {
        console.log(newValue);
        setValue(newValue);
      }}
    >
      <RadioGroupLabel>Choose a fruit: </RadioGroupLabel>
      <For each={fruits}>{(fruit) => <Radio value={fruit}>{fruit.displayValue}</Radio>}</For>
    </RadioGroup>
  );
}
