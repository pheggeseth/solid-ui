import { Component, createSignal, For } from 'solid-js';
import {
  ListboxButton,
  ListboxContext,
  ListboxOption,
  ListboxOptions,
  ListboxProvider,
} from './Listbox';
import {
  MenuButton,
  MenuContext,
  MenuItem,
  MenuItemProps,
  MenuList,
  MenuPanel,
  MenuProvider,
} from './Menu';
import { PopupButton, PopupContext, PopupOverlay, PopupPanel, PopupProvider } from './Popup';

export function Demo() {
  return (
    <>
      <PopupDemo />
      <MenuDemo />
      <ListboxDemo />
    </>
  );
}

const fruits = ['apple', 'apricot', 'orange', 'peach', 'pineapple', 'watermelon'];
function ListboxDemo() {
  const [value, setValue] = createSignal('apricot');
  let context: ListboxContext;

  return (
    <section>
      <h1>Listbox</h1>
      <ListboxProvider value={value()} onChange={setValue}>
        <ListboxButton>{value()}</ListboxButton>
        <ListboxOptions>
          <For each={fruits}>{(fruit) => <ListboxOption value={fruit}>{fruit}</ListboxOption>}</For>
        </ListboxOptions>
      </ListboxProvider>
    </section>
  );
}

function MenuDemo() {
  let context: MenuContext;

  return (
    <section>
      <h1>Menu</h1>
      <MenuProvider context={(ctx) => (context = ctx)}>
        <MenuButton context={(ctx) => (context = ctx)}>Menu</MenuButton>
        {/* <MenuPanel>
          Panel */}
        <MenuList context={(ctx) => (context = ctx)}>
          <Item action={() => console.log('Item 1')}>Item 1</Item>
          <Item action={() => console.log('Item 2')}>Item 2</Item>
          <Item action={() => console.log('Item 3')}>Item 3</Item>
        </MenuList>
        {/* </MenuPanel> */}
      </MenuProvider>
    </section>
  );
}

const Item: Component<MenuItemProps> = (props) => {
  let context: MenuContext;

  return (
    <MenuItem
      {...props}
      context={(ctx) => (context = ctx)}
      style={{ background: context.isActive() ? 'red' : 'inherit' }}
    >
      {props.children}
    </MenuItem>
  );
};

function PopupDemo() {
  let context: PopupContext;

  return (
    <section>
      <h1>Popup</h1>
      <PopupProvider>
        <PopupButton>Open</PopupButton>
        <PopupOverlay />
        <PopupPanel context={(ctx) => (context = ctx)}>
          <h2>Links</h2>
          <button onClick={context.close}>Close</button>
          <ul>
            <li>
              <a href="/">Link 1</a>
            </li>
            <li>
              <a href="/">Link 2</a>
            </li>
            <li>
              <a href="/">Link 3</a>
            </li>
          </ul>
        </PopupPanel>
      </PopupProvider>
    </section>
  );
}
