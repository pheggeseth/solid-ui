import { createSignal, For } from 'solid-js';
import Listbox from '~/components/Listbox';

const listboxItems = [0, 1, 12, 123, 3, 4, 5, 6, 7, 8];

export default function ListboxDemo() {
  const [value, setValue] = createSignal(123);

  const classList = () => ({
    active: Listbox.Option.state.isActive(),
    selected: Listbox.Option.state.isSelected(),
  });

  return (
    <section>
      <h2>Listbox</h2>
      <Listbox value={value()} onChange={setValue}>
        <Listbox.Label>Option:</Listbox.Label>
        <Listbox.Button>{value}</Listbox.Button>
        <Listbox.Overlay class="popover-overlay" />
        <Listbox.Options class="popover">
          <For each={listboxItems}>
            {(item) => (
              <Listbox.Option classList={classList()} value={item}>
                {item}
              </Listbox.Option>
            )}
          </For>
        </Listbox.Options>
      </Listbox>
    </section>
  );
}
