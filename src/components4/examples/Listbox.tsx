import { createEffect, createSignal, For, PropsWithChildren, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import Popper from '~/components4/components/Popper';
import { ComponentRef } from '~/types';
import Listbox from '../components/Listbox';

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

const fruits = ['apple', 'apricot', 'orange', 'peach', 'pineapple', 'watermelon'];

export function ListboxExample() {
  const [value, setValue] = createSignal<string>();

  return (
    <Popper>
      <Listbox value={value()} onChange={setValue}>
        <ListboxTrigger ref={Popper.AnchorRef}>Listbox: {value()}</ListboxTrigger>
        <ListboxList ref={Popper.PopperRef}>
          <For each={fruits}>{(fruit) => <ListboxOption value={fruit}>{fruit}</ListboxOption>}</For>
        </ListboxList>
      </Listbox>
    </Popper>
  );
}
