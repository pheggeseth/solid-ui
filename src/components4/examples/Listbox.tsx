import { createEffect, createSignal, For, PropsWithChildren, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import Popper from '~/components4/components/Popper';
import { ComponentRef } from '~/types';
import Listbox from '../components/Listbox';
import { Fruit, fruits } from './utils';

function ListboxLabel(props: PropsWithChildren) {
  const { props: labelProps, effects } = Listbox.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
}

function ListboxTrigger(props: PropsWithChildren<{ ref?: ComponentRef<HTMLButtonElement> }>) {
  const { props: triggerProps, effects } = Listbox.createTrigger();

  effects();

  return (
    <button ref={props.ref} {...triggerProps}>
      {props.children}
    </button>
  );
}

function ListboxPanel(props: PropsWithChildren<{ ref?: ComponentRef<HTMLDivElement> }>) {
  const { props: panelProps, effects, context } = Listbox.createPanel();

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

function ListboxList(props: PropsWithChildren<{ ref?: ComponentRef<HTMLUListElement> }>) {
  const { props: listProps, effects, context } = Listbox.createList();

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

function ListboxOption<Value = any>(props: PropsWithChildren<{ value?: Value }>) {
  const {
    props: optionProps,
    effects,
    context,
  } = Listbox.createOption({ value: () => props.value });

  effects();

  return <li {...optionProps}>{props.children}</li>;
}

export function ListboxExample() {
  const [value, setValue] = createSignal<Fruit>();

  return (
    <Popper>
      <Listbox
        value={value()}
        onChange={(newValue) => {
          console.log('listbox change:', newValue);
          setValue(newValue);
        }}
      >
        <ListboxLabel>Choose a fruit: </ListboxLabel>
        <ListboxTrigger ref={Popper.AnchorRef}>Listbox: {value()?.displayValue}</ListboxTrigger>
        <ListboxList ref={Popper.PopperRef}>
          <For each={fruits}>
            {(fruit) => <ListboxOption value={fruit}>{fruit.displayValue}</ListboxOption>}
          </For>
        </ListboxList>
      </Listbox>
    </Popper>
  );
}
