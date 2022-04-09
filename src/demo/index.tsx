import '../styles.css';
import { Background } from './Background';
import { CalendarExample } from './components/Calendar';
import { ComboboxExample } from './components/Combobox';
import { DisclosureExample } from './components/Disclosure';
import { FormExample } from './components/Form';
import { ListboxExample } from './components/Listbox';
import { MenuExample } from './components/Menu';
import { PopoverExample } from './components/Popover';
import { RadioGroupExample } from './components/RadioGroup';
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
          <Background.Link />
          <Styling.Link />
          <Extensions.Link />
        </ul>
        <ul>
          <li>
            <a href="#Popover">Popover</a>
          </li>
          <li>
            <a href="#Disclosure">Disclosure</a>
          </li>

          <li>
            <a href="#Menu">Menu</a>
          </li>
          <li>
            <a href="#Listbox">Listbox</a>
          </li>
          <li>
            <a href="#Combobox">Combobox</a>
          </li>
          <li>
            <a href="#Radio Group">Radio Group</a>
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
        <Background />
        <Styling />
        <Extensions />
        <section>
          <h2 id="Popover">Popover</h2>
          <PopoverExample />
        </section>
        <section>
          <h2 id="Disclosure">Disclosure</h2>
          <DisclosureExample />
        </section>
        <section>
          <h2 id="Menu">Menu</h2>
          <MenuExample />
        </section>
        <section>
          <h2 id="Listbox">Listbox</h2>
          <ListboxExample />
        </section>
        <section>
          <h2 id="Combobox">Combobox</h2>
          <ComboboxExample />
        </section>
        <section>
          <h2 id="Radio Group">Radio Group</h2>
          <RadioGroupExample />
        </section>
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
