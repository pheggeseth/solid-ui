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
import { Code } from './utils';

export function Demo() {
  return (
    <>
      <nav>
        <header>
          <h1>
            <a href="#Home">
              SOLID<strong>UI</strong>
            </a>
          </h1>
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
      <main>
        <h1 id="Home">
          SOLID<strong>UI</strong>
        </h1>
        <p>Hooks for building declarative, accessible, composable UI components with SolidJS.</p>
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
