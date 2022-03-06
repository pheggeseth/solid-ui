import { MenuButton, MenuItem, MenuList, MenuProvider } from './Menu';
import { PopupButton, PopupPanel, PopupProvider } from './Popup';

export function Demo() {
  return (
    <>
      <PopupDemo />
      <MenuDemo />
    </>
  );
}

function PopupDemo() {
  return (
    <section>
      <h1>Popup</h1>
      <PopupProvider>
        <PopupButton>Open</PopupButton>
        <PopupPanel>
          <h2>Links</h2>
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
