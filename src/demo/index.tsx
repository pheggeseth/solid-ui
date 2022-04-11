import '../styles.css';
import { Background } from './Background';
import { CalendarExample } from './components/Calendar';
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
            <FormDemo.Link />
          </li>
          <li>
            <SwitchDemo.Link />
          </li>
          <li>
            <a href="#Calendar">Calendar</a>
          </li>
        </ul>
      </nav>
      <main>
        <h1>Solid UI</h1>
        <p>Hooks for building declarative, accessible, composable UI components with Solid.</p>
        <p>
          Solid UI is still actively being built, and many of the component hooks below are not
          feature complete, are untested, and not ready for production use.
        </p>
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
        <section>
          <h1 id="Calendar">Calendar</h1>
          <CalendarExample />
        </section>
      </main>
    </>
  );
}
