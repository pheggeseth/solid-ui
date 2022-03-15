import { PopoverExample } from './examples/Popover';
import { DisclosureExample } from './examples/Disclosure';

import '../demo.css';
import '../solid-ui.css';

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
    </>
  );
}
