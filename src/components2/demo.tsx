import {
  createEffect,
  createSignal,
  For,
  mergeProps,
  PropsWithChildren,
  splitProps,
} from 'solid-js';
import { useId } from '~/utils/componentUtils';
import {
  ActiveDescendentProvider,
  createActiveDescendentContainerProps,
  createActiveDescendentProps,
} from './ActiveDescendent';
import {
  DisclosureButton,
  DisclosureContext,
  DisclosurePanel,
  DisclosureProvider,
} from './Disclosure';
import { Listbox, ListboxItem, ListboxLabel, ListboxProvider } from './Listbox';
import { MenuButton, MenuOption, MenuOptions, MenuProvider } from './Menu';
import { PopupButton, PopupContext, PopupPanel, PopupProvider } from './Popup';

export function NewDemo() {
  return (
    <>
      <ListboxDemo />
      <DisclosureDemo />
      <PopupDemo />
      {/* <MenuDemo /> */}
      <ActiveDescendentProvider>
        <Container>
          <Thing>1</Thing>
          <Thing>1</Thing>
          <Thing>1</Thing>
        </Container>
      </ActiveDescendentProvider>
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

function Container(props: PropsWithChildren) {
  const id = useId('container');
  const p = createActiveDescendentContainerProps({ id });
  return (
    <div {...p} id={id}>
      {props.children}
    </div>
  );
}

function Thing(props: PropsWithChildren) {
  const id = useId('descendent');
  const p = createActiveDescendentProps({ id });
  return (
    <div {...p} id={id}>
      {props.children}
    </div>
  );
}

// function MenuDemo() {
//   return (
//     <section>
//       <h1>Menu</h1>
//       <MenuProvider>
//         <MenuButton>Menu</MenuButton>
//         <MenuOptions>
//           <For each={fruits}>
//             {/* {(fruit) => (
//               <MenuOption
//                 component="button"
//                 // component="a"
//                 // href={`/${fruit}`}
//                 onClick={() => {
//                   console.log('chose:', fruit);
//                 }}
//               >
//                 {fruit}
//               </MenuOption>
//             )} */}
//             {(fruit) => {
//               return (
//                 <MenuOption>
//                   {(props) => {
//                     console.log('MenuOption');
//                     // props = mergeProps(props, {
//                     //   onClick: () => {
//                     //     props.onClick();
//                     //     console.log('button onClick');
//                     //   },
//                     // });

//                     return (
//                       <button
//                         onClick={() => {
//                           console.log('button onClick');
//                         }}
//                         {...props()}
//                       >
//                         {fruit}
//                       </button>
//                     );
//                   }}
//                 </MenuOption>
//               );
//             }}
//           </For>
//         </MenuOptions>
//       </MenuProvider>
//     </section>
//   );
// }
