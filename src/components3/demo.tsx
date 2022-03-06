import { MenuButton, MenuItem, MenuList, MenuProvider } from './Menu';
import { PopupButton, PopupContext, PopupOverlay, PopupPanel, PopupProvider } from './Popup';

export function Demo() {
  return (
    <>
      <PopupDemo />
      <MenuDemo />
    </>
  );
}

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

function MenuDemo() {
  return (
    <section>
      <h1>Menu</h1>
      <MenuProvider>
        <MenuButton>Menu</MenuButton>
        {/* <MenuPanel>
          Panel */}
        <MenuList>
          <MenuItem action={() => console.log('Item 1')}>Item 1</MenuItem>
          <MenuItem action={() => console.log('Item 2')}>Item 2</MenuItem>
          <MenuItem action={() => console.log('Item 3')}>Item 3</MenuItem>
        </MenuList>
        {/* </MenuPanel> */}
      </MenuProvider>
    </section>
  );
}
