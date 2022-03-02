import { createSignal, For } from 'solid-js';
import { Listbox, ListboxItem, ListboxLabel, ListboxProvider } from './Listbox';

export function NewDemo() {
  return <ListboxDemo />;
}

const fruits = ['apple', 'apricot', 'orange', 'peach', 'pineapple', 'watermelon'];

function ListboxDemo() {
  const [value, setValue] = createSignal('apricot');

  return (
    <ListboxProvider
      value={value()}
      onChange={(newValue) => {
        setValue(newValue);
        console.log(newValue);
      }}
    >
      <ListboxLabel>Favorite fruit:</ListboxLabel>
      <Listbox>
        <For each={fruits}>{(fruit) => <ListboxItem value={fruit}>{fruit}</ListboxItem>}</For>
      </Listbox>
    </ListboxProvider>
  );
}
