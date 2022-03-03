import { createSignal, For } from 'solid-js';
import {
  DisclosureButton,
  DisclosureContext,
  DisclosurePanel,
  DisclosureProvider,
} from './Disclosure';
import { Listbox, ListboxItem, ListboxLabel, ListboxProvider } from './Listbox';
import { PopoverButton, PopoverPanel, PopoverProvider } from './Popover';

export function NewDemo() {
  return (
    <>
      <ListboxDemo />
      <DisclosureDemo />
      <PopoverDemo />
    </>
  );
}

const fruits = ['apple', 'apricot', 'orange', 'peach', 'pineapple', 'watermelon'];

function ListboxDemo() {
  const [value, setValue] = createSignal('apricot');

  return (
    <section>
      <h1>Listbox</h1>
      <ListboxProvider
        value={value()}
        onChange={(newValue) => {
          setValue(newValue);
          console.log(newValue);
        }}
      >
        <ListboxLabel>Favorite fruit:</ListboxLabel>
        <Listbox>
          <For each={fruits}>{(fruit) => <ListboxItem value={fruit}>{fruit}</ListboxItem>}</For>
        </Listbox>
      </ListboxProvider>
    </section>
  );
}

function DisclosureDemo() {
  let context: DisclosureContext;

  return (
    <section>
      <h1>Disclosure</h1>
      <DisclosureProvider context={(ctx) => (context = ctx)}>
        <div>
          <DisclosureButton>{context.isOpen() ? 'Close' : 'Open'}</DisclosureButton>
          <DisclosurePanel style={{ display: context.isOpen() ? 'block' : 'none' }}>
            YO!!!
          </DisclosurePanel>
        </div>
      </DisclosureProvider>
    </section>
  );
}

function PopoverDemo() {
  let context;

  return (
    <section>
      <h1>Popover</h1>
      <PopoverProvider>
        <PopoverButton>Open</PopoverButton>
        <PopoverPanel>
          <a href="">Link 1</a>
          <a href="">Link 2</a>
          <a href="">Link 3</a>
        </PopoverPanel>
      </PopoverProvider>
    </section>
  );
}
