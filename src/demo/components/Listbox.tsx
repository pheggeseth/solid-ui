import { createEffect, createSignal, For, Match, PropsWithChildren, Show, Switch } from 'solid-js';
import { Portal } from 'solid-js/web';
import Popper from '~/components/Popper';
import { ComponentRef } from '~/types';
import Listbox from '../../components/Listbox';
import { Code, CodeBlock, Fruit, fruits } from '../utils';

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
    <Switch>
      <Match when={context.hasPanel()}>
        <ul ref={props.ref} {...listProps}>
          {props.children}
        </ul>
      </Match>
      <Match when={!context.hasPanel()}>
        <Show when={context.isOpen()}>
          <Portal>
            <ul ref={props.ref} {...listProps}>
              {props.children}
            </ul>
          </Portal>
        </Show>
      </Match>
    </Switch>
  );
}

function ListboxOption<Value = any>(props: PropsWithChildren<{ value?: Value }>) {
  const { props: optionProps, effects } = Listbox.createOption({ value: () => props.value });

  effects();

  return <li {...optionProps}>{props.children}</li>;
}

function MyListbox() {
  const [value, setValue] = createSignal<Fruit>();

  return (
    <div>
      <div style={{ 'margin-bottom': '1rem' }}>
        <Popper>
          <Listbox value={value()} onChange={setValue}>
            <ListboxLabel>Choose a fruit: </ListboxLabel>
            <ListboxTrigger ref={Popper.AnchorRef}>Listbox: {value()?.displayValue}</ListboxTrigger>
            <ListboxList ref={Popper.PopperRef}>
              <For each={fruits}>
                {(fruit) => <ListboxOption value={fruit}>{fruit.displayValue}</ListboxOption>}
              </For>
            </ListboxList>
          </Listbox>
        </Popper>
      </div>
      <div>
        <Popper>
          <Listbox value={value()} onChange={setValue}>
            <ListboxLabel>Choose a fruit: </ListboxLabel>
            <ListboxTrigger ref={Popper.AnchorRef}>Listbox: {value()?.displayValue}</ListboxTrigger>
            <ListboxPanel ref={Popper.PopperRef}>
              Fruit Options:
              <ListboxList>
                <For each={fruits}>
                  {(fruit) => <ListboxOption value={fruit}>{fruit.displayValue}</ListboxOption>}
                </For>
              </ListboxList>
            </ListboxPanel>
          </Listbox>
        </Popper>
      </div>
    </div>
  );
}

export function ListboxDemo() {
  return (
    <section>
      <h2 id="Listbox">Listbox</h2>
      <p>Listbox lets you build custom single-select dropdowns.</p>
      <p>
        Menu can either directly render a list with <Code>createList()</Code>, or can first render a
        parent panel with <Code>createPanel()</Code>.
      </p>
      <h3>Example</h3>
      <MyListbox />
      <h3>Code</h3>
      <CodeBlock>{exampleCode}</CodeBlock>
    </section>
  );
}

ListboxDemo.Link = () => <a href="#Listbox">Listbox</a>;

const exampleCode = `import { createEffect, createSignal, For, Match, PropsWithChildren, Show, Switch } from 'solid-js';
import { Portal } from 'solid-js/web';
import Popper from '@solid-ui/popper';
import { ComponentRef } from '~/types';
import Listbox from '@solid-ui/listbox';

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
    <Switch>
      <Match when={context.hasPanel()}>
        <ul ref={props.ref} {...listProps}>
          {props.children}
        </ul>
      </Match>
      <Match when={!context.hasPanel()}>
        <Show when={context.isOpen()}>
          <Portal>
            <ul ref={props.ref} {...listProps}>
              {props.children}
            </ul>
          </Portal>
        </Show>
      </Match>
    </Switch>
  );
}

function ListboxOption<Value = any>(props: PropsWithChildren<{ value?: Value }>) {
  const { props: optionProps, effects } = Listbox.createOption({ value: () => props.value });

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

function MyListbox() {
  const [value, setValue] = createSignal<Fruit>();

  return (
    <>
      <Popper>
        <Listbox value={value()} onChange={setValue}>
          <ListboxLabel>Choose a fruit: </ListboxLabel>
          <ListboxTrigger ref={Popper.AnchorRef}>Listbox: {value()?.displayValue}</ListboxTrigger>
          <ListboxList ref={Popper.PopperRef}>
            <For each={fruits}>
              {(fruit) => <ListboxOption value={fruit}>{fruit.displayValue}</ListboxOption>}
            </For>
          </ListboxList>
        </Listbox>
      </Popper>
      <Popper>
        <Listbox value={value()} onChange={setValue}>
          <ListboxLabel>Choose a fruit: </ListboxLabel>
          <ListboxTrigger ref={Popper.AnchorRef}>Listbox: {value()?.displayValue}</ListboxTrigger>
          <ListboxPanel ref={Popper.PopperRef}>
            Fruit Options:
            <ListboxList>
              <For each={fruits}>
                {(fruit) => <ListboxOption value={fruit}>{fruit.displayValue}</ListboxOption>}
              </For>
            </ListboxList>
          </ListboxPanel>
        </Listbox>
      </Popper>
    </>
  );
}`;
