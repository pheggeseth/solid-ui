import {
  createEffect,
  createMemo,
  createSignal,
  For,
  JSX,
  PropsWithChildren,
  Show,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { ComponentRef } from '~/types';
import Combobox from '../../components/Combobox';
import Popper from '../../components/Popper';
import { CodeBlock, Fruit, fruits } from '../utils';

function ComboboxLabel(props: PropsWithChildren) {
  const { props: labelProps, effects } = Combobox.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
}

function ComboboxInput<Value = any>(props: {
  getDisplayValue?: (value: Value) => string;
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>;
  ref?: ComponentRef<HTMLInputElement>;
}) {
  const { props: inputProps, effects } = Combobox.createInput({
    onInput: props.onInput,
    getDisplayValue: props.getDisplayValue ? () => props.getDisplayValue : undefined,
  });

  effects();

  return <input ref={props.ref} {...inputProps} />;
}

function ComboboxTrigger(props: PropsWithChildren) {
  const { props: triggerProps, effects } = Combobox.createTrigger();

  effects();

  return <button {...triggerProps}>{props.children}</button>;
}

function ComboboxPanel(props: PropsWithChildren<{ ref?: ComponentRef<HTMLDivElement> }>) {
  const { props: panelProps, effects, context } = Combobox.createPanel();

  createEffect(() => {
    if (context.isOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isOpen()}>
      <Portal>
        <div ref={props.ref} {...panelProps}>
          {props.children}
        </div>
      </Portal>
    </Show>
  );
}

function ComboboxList(props: PropsWithChildren<{ ref?: ComponentRef<HTMLUListElement> }>) {
  const { props: listProps, effects, context } = Combobox.createList();

  createEffect(() => {
    if (context.isOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isOpen()}>
      <Portal>
        <ul ref={props.ref} {...listProps}>
          {props.children}
        </ul>
      </Portal>
    </Show>
  );
}

function ComboboxOption<Value = any>(props: PropsWithChildren<{ value?: Value }>) {
  const {
    props: optionProps,
    effects,
    context,
  } = Combobox.createOption({ value: () => props.value });

  effects();

  return <li {...optionProps}>{props.children}</li>;
}

export function MyCombobox() {
  const [value, setValue] = createSignal<{ displayValue: string; value: string }>(null);
  const [inputValue, setInputValue] = createSignal('');
  const filteredFruits = createMemo(() =>
    fruits.filter((fruit) => fruit.displayValue.includes(inputValue()))
  );

  return (
    <Popper>
      <Combobox
        value={value()}
        onChange={(newValue) => setValue(newValue)}
        sortOptions={(a, b) => filteredFruits().indexOf(a) - filteredFruits().indexOf(b)}
      >
        <ComboboxLabel>Choose a fruit: </ComboboxLabel>
        <ComboboxInput
          getDisplayValue={(value: Fruit) => value?.displayValue ?? ''}
          onInput={(event) => setInputValue(event.currentTarget.value)}
          ref={Popper.AnchorRef}
        />
        <ComboboxTrigger>Open</ComboboxTrigger>
        <ComboboxList ref={Popper.PopperRef}>
          <For each={filteredFruits()}>
            {(fruit) => <ComboboxOption value={fruit}>{fruit.displayValue}</ComboboxOption>}
          </For>
        </ComboboxList>
      </Combobox>
    </Popper>
  );
}

export function ComboboxDemo() {
  return (
    <section>
      <h2 id="Combobox">Combobox</h2>
      <p>
        A combobox is a text field with suggestions that appear when the user types. Here, we are in
        charge of rendering all options, giving you complete control over how and when options
        should be filtered.
      </p>
      <h3>Example</h3>
      <MyCombobox />
      <h3>Code</h3>
      <CodeBlock>{exampleCode}</CodeBlock>
    </section>
  );
}

ComboboxDemo.Link = () => <a href="#Combobox">Combobox</a>;

const exampleCode = `import {
  createEffect,
  createMemo,
  createSignal,
  For,
  JSX,
  PropsWithChildren,
  Show,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { ComponentRef } from '@solid-ui/types';
import Combobox from '@solid-ui/combobox';
import Popper from '@solid-ui/popper';

function ComboboxLabel(props: PropsWithChildren) {
  const { props: labelProps, effects } = Combobox.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
}

function ComboboxInput(props: {
  getDisplayValue?: (value: any) => string;
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>;
  ref?: ComponentRef<HTMLInputElement>;
}) {
  const { props: inputProps, effects } = Combobox.createInput({
    onInput: props.onInput,
    getDisplayValue: props.getDisplayValue ? () => props.getDisplayValue : undefined,
  });

  effects();

  return <input ref={props.ref} {...inputProps} />;
}

function ComboboxTrigger(props: PropsWithChildren) {
  const { props: triggerProps, effects } = Combobox.createTrigger();

  effects();

  return <button {...triggerProps}>{props.children}</button>;
}

function ComboboxPanel(props: PropsWithChildren<{ ref?: ComponentRef<HTMLDivElement> }>) {
  const { props: panelProps, effects, context } = Combobox.createPanel();

  createEffect(() => {
    if (context.isOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isOpen()}>
      <Portal>
        <div ref={props.ref} {...panelProps}>
          {props.children}
        </div>
      </Portal>
    </Show>
  );
}

function ComboboxList(props: PropsWithChildren<{ ref?: ComponentRef<HTMLUListElement> }>) {
  const { props: listProps, effects, context } = Combobox.createList();

  createEffect(() => {
    if (context.isOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isOpen()}>
      <Portal>
        <ul ref={props.ref} {...listProps}>
          {props.children}
        </ul>
      </Portal>
    </Show>
  );
}

function ComboboxOption(props: PropsWithChildren<{ value?: any }>) {
  const {
    props: optionProps,
    effects,
    context,
  } = Combobox.createOption({ value: () => props.value });

  effects();

  return <li {...optionProps}>{props.children}</li>;
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

export function MyCombobox() {
  const [value, setValue] = createSignal<{ displayValue: string; value: string }>(null);
  const [inputValue, setInputValue] = createSignal('');
  const filteredFruits = createMemo(() =>
    fruits.filter((fruit) => fruit.displayValue.includes(inputValue()))
  );

  return (
    <Popper>
      <Combobox
        value={value()}
        onChange={(newValue) => setValue(newValue)}
        sortOptions={(a, b) => filteredFruits().indexOf(a) - filteredFruits().indexOf(b)}
      >
        <ComboboxLabel>Choose a fruit: </ComboboxLabel>
        <ComboboxInput
          getDisplayValue={(value: Fruit) => value?.displayValue ?? ''}
          onInput={(event) => setInputValue(event.currentTarget.value)}
          ref={Popper.AnchorRef}
        />
        <ComboboxTrigger>Open</ComboboxTrigger>
        <ComboboxList ref={Popper.PopperRef}>
          <For each={filteredFruits()}>
            {(fruit) => <ComboboxOption value={fruit}>{fruit.displayValue}</ComboboxOption>}
          </For>
        </ComboboxList>
      </Combobox>
    </Popper>
  );
}`;
