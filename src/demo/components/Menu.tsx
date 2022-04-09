import { Component, createEffect, createSignal, For, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import Popper from '~/components/Popper';
import { ComponentRef } from '~/types';
import Menu from '../../components/Menu';

const MenuTrigger: Component<{ ref?: ComponentRef<HTMLButtonElement> }> = (props) => {
  const { props: triggerProps, effects } = Menu.createTrigger();

  effects();

  return (
    <button ref={props.ref} {...triggerProps}>
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
};

const MenuItem: Component<{ item: string; action: () => void }> = (props) => {
  const { props: itemProps, effects } = Menu.createItem({ action: props.action });

  effects();

  return <li {...itemProps}>{props.item}</li>;
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
              {(item) => <MenuItem item={item} action={() => setItemClicked(item)} />}
            </For>
          </MenuList>
        </Menu>
      </Popper>
    </div>
  );
}

export function MenuDemo() {
  return (
    <section>
      <h2 id="Menu">Menu</h2>
      <p>Menus have a list of items that appear when a trigger is clicked.</p>
      <h3>Example</h3>
      <MyMenu />
    </section>
  );
}

MenuDemo.Link = () => <a href="#Menu">Menu</a>;
