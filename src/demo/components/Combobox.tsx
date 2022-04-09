import { createEffect, createSignal, For, JSX, PropsWithChildren, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ComponentRef } from '~/types';
import Combobox from '../../components/Combobox';
import Popper from '../../components/Popper';
import { Fruit, fruits } from '../utils';

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

export function ComboboxExample() {
  const [value, setValue] = createSignal<{ displayValue: string; value: string }>(null);

  return (
    <Popper>
      <Combobox
        value={value()}
        onChange={(newValue) => {
          console.log('combobox change:', newValue);
          setValue(newValue);
        }}
      >
        <ComboboxLabel>Choose a fruit: </ComboboxLabel>
        <ComboboxInput
          getDisplayValue={(value: Fruit) => value?.displayValue ?? ''}
          ref={Popper.AnchorRef}
        />
        <ComboboxTrigger>Open</ComboboxTrigger>
        <ComboboxList ref={Popper.PopperRef}>
          <For each={fruits}>
            {(fruit) => <ComboboxOption value={fruit}>{fruit.displayValue}</ComboboxOption>}
          </For>
        </ComboboxList>
      </Combobox>
    </Popper>
  );
}
