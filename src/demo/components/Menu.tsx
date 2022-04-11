import { Component, createEffect, createSignal, For, Match, Show, Switch } from 'solid-js';
import { Portal } from 'solid-js/web';
import Popper from '~/components/Popper';
import { ComponentRef } from '~/types';
import Menu from '../../components/Menu';
import { Code, CodeBlock } from '../utils';

const MenuTrigger: Component<{ ref?: ComponentRef<HTMLButtonElement> }> = (props) => {
  const { props: triggerProps, effects } = Menu.createTrigger();

  effects();

  return (
    <button ref={props.ref} {...triggerProps} style={{ 'margin-right': '1rem' }}>
      {props.children}
    </button>
  );
};

const MenuPanel: Component<{ ref?: ComponentRef<HTMLDivElement> }> = (props) => {
  const { props: panelProps, effects, context } = Menu.createPanel();

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
};

const MenuList: Component<{ ref?: ComponentRef<HTMLUListElement> }> = (props) => {
  const { props: listProps, effects, context } = Menu.createList();

  createEffect(() => {
    if (context.hasPanel() || context.isOpen()) {
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
};

const MenuItem: Component<{ action: () => void }> = (props) => {
  const { props: itemProps, effects } = Menu.createItem({ action: props.action });

  effects();

  return <li {...itemProps}>{props.children}</li>;
};

const MenuItemLink: Component<{ href: string }> = (props) => {
  const { props: itemProps, effects } = Menu.createItem();

  effects();

  return (
    <a {...itemProps} href={props.href}>
      {props.children}
    </a>
  );
};

function MyMenu() {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  const [itemClicked, setItemClicked] = createSignal('');

  return (
    <div>
      <div>Last menu item clicked: {itemClicked()}</div>
      <Popper>
        <Menu>
          <MenuTrigger ref={Popper.AnchorRef}>Menu</MenuTrigger>
          <MenuList ref={Popper.PopperRef}>
            <For each={items}>
              {(item) => <MenuItem action={() => setItemClicked(item)}>{item}</MenuItem>}
            </For>
            <MenuItemLink href="/">Go to Homepage</MenuItemLink>
          </MenuList>
        </Menu>
      </Popper>
      <Popper>
        <Menu>
          <MenuTrigger ref={Popper.AnchorRef}>Menu</MenuTrigger>
          <MenuPanel ref={Popper.PopperRef}>
            Choose an item:
            <MenuList>
              <For each={items}>
                {(item) => <MenuItem action={() => setItemClicked(item)}>{item}</MenuItem>}
              </For>
              <MenuItemLink href="/">Go to Homepage</MenuItemLink>
            </MenuList>
          </MenuPanel>
        </Menu>
      </Popper>
    </div>
  );
}

export function MenuDemo() {
  return (
    <section>
      <h2 id="Menu">Menu</h2>
      <p>
        Menu lets you build dropdowns with items that can perform an <Code>action()</Code> when
        selected, or rely on their native click behavior when selected (like navigating to a new
        page with a link).
      </p>
      <p>
        Menu can either directly render a list with <Code>createList()</Code>, or can first render a
        parent panel with <Code>createPanel()</Code>.
      </p>
      <h3>Example</h3>
      <MyMenu />
      <h3>Code</h3>
      <CodeBlock>{exampleCode}</CodeBlock>
    </section>
  );
}

MenuDemo.Link = () => <a href="#Menu">Menu</a>;

const exampleCode = `import { Component, createEffect, createSignal, For, Match, Show, Switch } from 'solid-js';
import { Portal } from 'solid-js/web';
import Popper from '@solid-ui/popper';
import { ComponentRef } from '@solid-ui/types';
import Menu from '@solid-ui/menu';

const MenuTrigger: Component<{ ref?: ComponentRef<HTMLButtonElement> }> = (props) => {
  const { props: triggerProps, effects } = Menu.createTrigger();

  effects();

  return (
    <button ref={props.ref} {...triggerProps} style={{ 'margin-right': '1rem' }}>
      {props.children}
    </button>
  );
};

const MenuPanel: Component<{ ref?: ComponentRef<HTMLDivElement> }> = (props) => {
  const { props: panelProps, effects, context } = Menu.createPanel();

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
};

const MenuList: Component<{ ref?: ComponentRef<HTMLUListElement> }> = (props) => {
  const { props: listProps, effects, context } = Menu.createList();

  createEffect(() => {
    if (context.hasPanel() || context.isOpen()) {
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
};

const MenuItem: Component<{ action: () => void }> = (props) => {
  const { props: itemProps, effects } = Menu.createItem({ action: props.action });

  effects();

  return <li {...itemProps}>{props.children}</li>;
};

const MenuItemLink: Component<{ href: string }> = (props) => {
  const { props: itemProps, effects } = Menu.createItem();

  effects();

  return (
    <a {...itemProps} href={props.href}>
      {props.children}
    </a>
  );
};

function MyMenu() {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  const [itemClicked, setItemClicked] = createSignal('');

  return (
    <div>
      <div>Last menu item clicked: {itemClicked()}</div>
      <Popper>
        <Menu>
          <MenuTrigger ref={Popper.AnchorRef}>Menu</MenuTrigger>
          <MenuList ref={Popper.PopperRef}>
            <For each={items}>
              {(item) => <MenuItem action={() => setItemClicked(item)}>{item}</MenuItem>}
            </For>
            <MenuItemLink href="/">Go to Homepage</MenuItemLink>
          </MenuList>
        </Menu>
      </Popper>
      <Popper>
        <Menu>
          <MenuTrigger ref={Popper.AnchorRef}>Menu</MenuTrigger>
          <MenuPanel ref={Popper.PopperRef}>
            Choose an item:
            <MenuList>
              <For each={items}>
                {(item) => <MenuItem action={() => setItemClicked(item)}>{item}</MenuItem>}
              </For>
              <MenuItemLink href="/">Go to Homepage</MenuItemLink>
            </MenuList>
          </MenuPanel>
        </Menu>
      </Popper>
    </div>
  );
}`;
