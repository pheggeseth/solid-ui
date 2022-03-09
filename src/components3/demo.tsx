import { Component, createEffect, createSignal, For } from 'solid-js';
import {
  ComboboxButton,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxProvider,
} from './Combobox';
import {
  createDisclosureContext,
  DisclosureButton,
  DisclosurePanel,
  DisclosureProvider,
} from './Disclosure';
import {
  createListboxContext,
  ListboxButton,
  ListboxLabel,
  ListboxList,
  ListboxOption,
  ListboxProvider,
} from './Listbox';
import {
  createMenuContext,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  MenuProvider,
} from './Menu';
import { PopupButton, PopupContext, PopupOverlay, PopupPanel, PopupProvider } from './Popup';
import { RadioGroup, RadioOption } from './RadioGroup';

export function Demo() {
  return (
    <>
      <PopupDemo />
      <MenuDemo />
      <ListboxDemo />
      <DisclosureDemo />
      <ComboboxDemo />
      <RadioGroupDemo />
    </>
  );
}

function RadioGroupDemo() {
  const [value, setValue] = createSignal('');

  createEffect(() => {
    console.log(value());
  });

  return (
    <section>
      <h1>Radio Group</h1>
      <RadioGroup value={value()} onChange={setValue}>
        <RadioOption value={'Option 1'}>Option 1</RadioOption>
        <RadioOption value={'Option 2'}>Option 2</RadioOption>
        <RadioOption value={'Option 3'}>Option 3</RadioOption>
      </RadioGroup>
    </section>
  );
}

function ComboboxDemo() {
  return (
    <section>
      <h1>Combobox</h1>
      <ComboboxProvider>
        <ComboboxInput />
        <ComboboxButton>Open</ComboboxButton>
        <ComboboxList>
          <For each={fruits}>
            {(fruit) => <ComboboxOption value={fruit}>{fruit}</ComboboxOption>}
          </For>
        </ComboboxList>
      </ComboboxProvider>
    </section>
  );
}

function DisclosureDemo() {
  const context = createDisclosureContext();

  return (
    <section>
      <h1>Disclosure</h1>
      <DisclosureProvider context={context}>
        <DisclosureButton>Show Details</DisclosureButton>
        <DisclosurePanel style={{ display: context.isOpen() ? 'block' : 'none' }}>
          <p>Here are the details.</p>
        </DisclosurePanel>
      </DisclosureProvider>
    </section>
  );
}

const fruits = ['apple', 'apricot', 'orange', 'peach', 'pineapple', 'watermelon'];
function ListboxDemo() {
  const [value, setValue] = createSignal('apricot');

  return (
    <section>
      <h1>Listbox</h1>
      <ListboxProvider value={value()} onChange={setValue}>
        <ListboxLabel>Choose a fruit:</ListboxLabel>
        <ListboxButton>{value()}</ListboxButton>
        <ListboxList>
          <For each={fruits}>
            {(fruit) => {
              const context = createListboxContext<string>();

              return (
                <ListboxOption
                  value={fruit}
                  context={context}
                  style={context.isSelected() ? { background: 'pink' } : {}}
                >
                  {fruit}
                </ListboxOption>
              );
            }}
          </For>
        </ListboxList>
      </ListboxProvider>
    </section>
  );
}

function MenuDemo() {
  return (
    <section>
      <h1>Menu</h1>
      <MenuProvider>
        <MenuButton>Menu</MenuButton>
        {/* <MenuPanel>
          Panel */}
        <MenuList>
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
  const context = createMenuContext();

  return (
    <MenuItem
      {...props}
      context={context}
      style={{ background: context.isActive() ? 'orange' : 'inherit' }}
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
