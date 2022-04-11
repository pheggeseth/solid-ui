import { createSignal } from 'solid-js';
import '../styles.css';
import { Background } from './Background';
import { CalendarDemo } from './components/Calendar';
import { ComboboxDemo } from './components/Combobox';
import { DisclosureDemo } from './components/Disclosure';
import { FormDemo } from './components/Form';
import { ListboxDemo } from './components/Listbox';
import { MenuDemo } from './components/Menu';
import { PopoverDemo } from './components/Popover';
import { RadioGroupDemo } from './components/RadioGroup';
import { SwitchDemo } from './components/Switch';
import './demo.css';
import { Extensions } from './Extensions';
import { Styling } from './Styling';

const MenuOpen = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#FFFFFF"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z" />
  </svg>
);

const MenuClose = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#FFFFFF"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

function Nav() {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <>
      <button
        id="open-menu"
        title="Open menu"
        classList={{ open: isOpen() }}
        onClick={() => setIsOpen(true)}
      >
        <MenuOpen />
      </button>
      <div id="nav-overlay" classList={{ open: isOpen() }} onClick={() => setIsOpen(false)} />
      <nav
        classList={{ open: isOpen() }}
        onClick={(event) => {
          if (event.target.matches('a')) {
            setIsOpen(false);
          }
        }}
      >
        <header>
          <h1>
            <a href="#Home">
              SOLID<strong>UI</strong>
            </a>
          </h1>
          <button
            id="close-menu"
            title="Close menu"
            classList={{ open: isOpen() }}
            onClick={() => setIsOpen(false)}
          >
            <MenuClose />
          </button>
        </header>
        <ul>
          <li>
            <Background.Link />
          </li>
          <li>
            <Styling.Link />
          </li>
          <li>
            <Extensions.Link />
          </li>
        </ul>
        <hr aria-hidden="true" />
        <ul>
          <li>
            <PopoverDemo.Link />
          </li>
          <li>
            <DisclosureDemo.Link />
          </li>
          <li>
            <MenuDemo.Link />
          </li>
          <li>
            <ListboxDemo.Link />
          </li>
          <li>
            <ComboboxDemo.Link />
          </li>
          <li>
            <RadioGroupDemo.Link />
          </li>
          <li>
            <FormDemo.Link />
          </li>
          <li>
            <SwitchDemo.Link />
          </li>
          <li>
            <CalendarDemo.Link />
          </li>
        </ul>
      </nav>
    </>
  );
}

export function Demo() {
  return (
    <>
      <Nav />
      <main>
        <header>
          <h1 id="Home">
            SOLID<strong>UI</strong>
          </h1>
          <p>Hooks for building declarative, accessible, composable UI components with SolidJS.</p>
        </header>
        <Background />
        <Styling />
        <Extensions />
        <PopoverDemo />
        <DisclosureDemo />
        <MenuDemo />
        <ListboxDemo />
        <ComboboxDemo />
        <RadioGroupDemo />
        <FormDemo />
        <SwitchDemo />
        <CalendarDemo />
      </main>
    </>
  );
}
