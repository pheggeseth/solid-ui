import '../demo.css';
import '../solid-ui.css';
import { ComboboxExample } from './examples/Combobox';
import { DisclosureExample } from './examples/Disclosure';
import { ListboxExample } from './examples/Listbox';
import { MenuExample } from './examples/Menu';
import { PopoverExample } from './examples/Popover';
import { RadioGroupExample } from './examples/RadioGroup';

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
    </>
  );
}
