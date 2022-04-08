import { createEffect, PropsWithChildren, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import Popper from '~/components/Popper';
import { ComponentRef } from '~/types';
import Menu from '../components/Menu';

function MenuTrigger(props: PropsWithChildren<{ ref?: ComponentRef<HTMLButtonElement> }>) {
  const { props: triggerProps, effects } = Menu.createTrigger();

  effects();

  return (
    <button ref={props.ref} {...triggerProps}>
      {props.children}
    </button>
  );
}

function MenuPanel(props: PropsWithChildren<{ ref?: ComponentRef<HTMLDivElement> }>) {
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
}

function MenuList(props: PropsWithChildren<{ ref?: ComponentRef<HTMLUListElement> }>) {
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
}

function MenuItem(props: PropsWithChildren) {
  const {
    props: itemProps,
    effects,
    context,
  } = Menu.createItem({ onClick: () => console.log(props.children) });

  effects();

  return <li {...itemProps}>{props.children}</li>;
}

export function MenuExample() {
  return (
    <Popper>
      <Menu>
        <MenuTrigger ref={Popper.AnchorRef}>Menu</MenuTrigger>
        <MenuList ref={Popper.PopperRef}>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </MenuList>
      </Menu>
    </Popper>
  );
}
