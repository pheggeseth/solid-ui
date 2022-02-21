import { createSignal } from 'solid-js';
import RadioGroup, { RadioOptionContext } from '~/components/RadioGroup';

export default function RadioGroupDemo() {
  const [value, setValue] = createSignal(1);

  return (
    <section>
      <h2>Radio Group</h2>
      <RadioGroup
        value={value()}
        onChange={(value) => {
          console.log('radio group selected:', value);
          setValue(value);
        }}
      >
        <RadioOption value={1} />
        <RadioOption value={2} />
        <RadioOption value={3} />
      </RadioGroup>
    </section>
  );
}

function RadioOption(props: { value: number }) {
  let context: RadioOptionContext<number>;

  return (
    <RadioGroup.Option
      classList={{
        active: context.isActive(),
        selected: context.isSelected(),
      }}
      context={(ctx) => (context = ctx)}
      value={props.value}
    >
      {props.value}
    </RadioGroup.Option>
  );
}
