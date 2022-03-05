import { PopupButton, PopupPanel, PopupProvider } from './Popup';

export function Demo() {
  return (
    <>
      <PopupDemo />
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
