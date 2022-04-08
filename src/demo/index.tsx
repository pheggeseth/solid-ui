import './demo.css';
import '../solid-ui.css';
import { CalendarExample } from './Calendar';
import { ComboboxExample } from './Combobox';
import { DisclosureExample } from './Disclosure';
import { FormExample } from './Form';
import { ListboxExample } from './Listbox';
import { MenuExample } from './Menu';
import { PopoverExample } from './Popover';
import { RadioGroupExample } from './RadioGroup';
import { SwitchExample } from './Switch';

export function Demo() {
  return (
    <>
      <section>
        <h1>Popover</h1>
        <PopoverExample />
      </section>
      <section>
        <h1>Disclosure</h1>
        <DisclosureExample />
      </section>
      <section>
        <h1>Menu</h1>
        <MenuExample />
      </section>
      <section>
        <h1>Listbox</h1>
        <ListboxExample />
      </section>
      <section>
        <h1>Combobox</h1>
        <ComboboxExample />
      </section>
      <section>
        <h1>Radio Group</h1>
        <RadioGroupExample />
      </section>
      <section>
        <h1>Form</h1>
        <FormExample />
      </section>
      <section>
        <h1>Switch</h1>
        <SwitchExample />
      </section>
      <section>
        <h1>Calendar</h1>
        <CalendarExample />
      </section>
    </>
  );
}
