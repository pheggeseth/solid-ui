import { Component, createSignal, For } from 'solid-js';
import Combobox, { ComboboxContext } from '~/components/Combobox';

export default function ComboboxDemo() {
  return (
    <section>
      <h2>Combobox</h2>
      <section>
        <h3>Manual Selection</h3>
        <MyCombobox selection="manual" />
      </section>
      <section>
        <h3>Automatic Selection</h3>
        <MyCombobox selection="automatic" />
      </section>
      <section>
        <h3>Inline-Automatic Selection</h3>
        <MyCombobox selection="inline-automatic" />
      </section>
    </section>
  );
}

const MyCombobox: Component<{ selection: 'manual' | 'automatic' | 'inline-automatic' }> = (
  props
) => {
  const [value, setValue] = createSignal('');

  let context: ComboboxContext;

  return (
    <Combobox
      value={value()}
      options={['red', 'rred', 'blue', 'green']}
      onChange={setValue}
      selection={props.selection}
      context={(ctx) => (context = ctx)}
    >
      <Combobox.Label>My Combobox:</Combobox.Label>
      <Combobox.Textbox />
      <Combobox.Dropdown class="combobox-dropdown">Open</Combobox.Dropdown>
      <Combobox.Options>
        <For each={context.options()}>
          {(option) => <Combobox.Option value={option}>{option}</Combobox.Option>}
        </For>
      </Combobox.Options>
    </Combobox>
  );
};
