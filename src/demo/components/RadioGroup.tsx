import { createSignal, For, PropsWithChildren } from 'solid-js';
import RadioGroupComponent, { RadioGroupProviderProps } from '../../components/RadioGroup';
import { Code, CodeBlock, Fruit, fruits } from '../utils';

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

function MyRadioGroup() {
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

export function RadioGroupDemo() {
  return (
    <section>
      <h2 id="Radio Group">Radio Group</h2>
      <p>
        Radio groups function just like a <Code language="html">{'<fieldset>'}</Code> with{' '}
        <Code language="html">{'<input type="radio" />'}</Code> elements in it, but without any of
        the styling.
      </p>
      <h3>Example</h3>
      <MyRadioGroup />
      <h3>Code</h3>
      <CodeBlock>{exampleCode}</CodeBlock>
    </section>
  );
}

RadioGroupDemo.Link = () => <a href="#Radio Group">Radio Group</a>;

const exampleCode = `import { createSignal, For, PropsWithChildren } from 'solid-js';
import RadioGroupComponent, { RadioGroupProviderProps } from '@solid-ui/radiogroup';

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

export type Fruit = { displayValue: string; value: string };

const createFruit = (value: string): Fruit => ({ displayValue: value, value });
export const fruits = [
  createFruit('apple'),
  createFruit('apricot'),
  createFruit('orange'),
  createFruit('peach'),
  createFruit('pineapple'),
  createFruit('watermelon'),
];

function MyRadioGroup() {
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
}`;
