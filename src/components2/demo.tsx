import { createSignal, For } from 'solid-js';
import {
  DisclosureButton,
  DisclosureContext,
  DisclosurePanel,
  DisclosureProvider,
} from './Disclosure';
import { Listbox, ListboxItem, ListboxLabel, ListboxProvider } from './Listbox';
import { PopupButton, PopupContext, PopupPanel, PopupProvider } from './Popup';

export function NewDemo() {
  return (
    <>
      <ListboxDemo />
      <DisclosureDemo />
      <PopupDemo />
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
          <DisclosureButton>Say Hello</DisclosureButton>
          <DisclosurePanel style={{ display: context.isOpen() ? 'block' : 'none' }}>
            YO!!!
          </DisclosurePanel>
        </div>
      </DisclosureProvider>
    </section>
  );
}

function PopupDemo() {
  let context: PopupContext;

  return (
    <section>
      <h1>Popup</h1>
      <PopupProvider context={(ctx) => (context = ctx)}>
        <PopupButton>Links</PopupButton>
        {/* <PopupOverlay style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)' }} /> */}
        <PopupPanel portal={false}>
          <a href="">Link 1</a>
          <a href="">Link 2</a>
          <a href="">Link 3</a>
        </PopupPanel>
      </PopupProvider>
    </section>
  );
}
