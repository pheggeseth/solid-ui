import '../styles.css';
import { Background } from './Background';
import { CalendarExample } from './components/Calendar';
import { ComboboxDemo } from './components/Combobox';
import { DisclosureDemo } from './components/Disclosure';
import { FormExample } from './components/Form';
import { ListboxDemo } from './components/Listbox';
import { MenuDemo } from './components/Menu';
import { PopoverDemo } from './components/Popover';
import { RadioGroupDemo } from './components/RadioGroup';
import { SwitchExample } from './components/Switch';
import './demo.css';
import { Extensions } from './Extensions';
import { Styling } from './Styling';

export function Demo() {
  return (
    <>
      <nav>
        <header>
          <h1>Solid UI</h1>
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
            <a href="#Form">Form</a>
          </li>
          <li>
            <a href="#Switch">Switch</a>
          </li>
          <li>
            <a href="#Calendar">Calendar</a>
          </li>
        </ul>
      </nav>
      <main>
        <h1>Solid UI</h1>
        <p>Hooks for building declarative, accessible, composable UI components with Solid.</p>
        <Background />
        <Styling />
        <Extensions />
        <PopoverDemo />
        <DisclosureDemo />
        <MenuDemo />
        <ListboxDemo />
        <ComboboxDemo />
        <RadioGroupDemo />
        <section>
          <h2 id="Form">Form</h2>
          <FormExample />
        </section>
        <section>
          <h1 id="Switch">Switch</h1>
          <SwitchExample />
        </section>
        <section>
          <h1 id="Calendar">Calendar</h1>
          <CalendarExample />
        </section>
      </main>
    </>
  );
}
