import { Component, createSignal } from 'solid-js';
import { For } from 'solid-js/web';
import Form from '~/components/Form';
import Switch from '~/components/Switch';
import './App.css';
import { NewDemo } from './components2/demo';
import { Demo } from './components3/demo';
import CalendarDemo from './demo/Calendar';
import ComboboxDemo from './demo/Combobox';
import ListboxDemo from './demo/Listbox';
import MenuDemo from './demo/Menu';
import PopoverDemo from './demo/Popover';
import RadioGroupDemo from './demo/RadioGroup';

function MySwitch() {
  const [checked, setChecked] = createSignal(false);

  return (
    <Switch.Group>
      <Switch.Label>Label</Switch.Label>
      <Switch.Description>Description</Switch.Description>
      <Switch checked={checked()} onChange={setChecked}>
        {JSON.stringify(checked())}
      </Switch>
    </Switch.Group>
  );
}

function Input(props: { name: string }) {
  const [value, setValue] = createSignal('');

  const { fieldProps, validate, onTouch } = Form.useField({
    name: props.name,
    initialValue: value(),
    validators: [
      (value) => value.length < 5 && 'too short',
      (value) => !value.includes('a') && 'must include "a"',
    ],
  });

  return (
    <input
      {...fieldProps()}
      value={value()}
      onInput={(event) => {
        setValue(event.currentTarget.value);
        validate(event.currentTarget.value);
      }}
      onBlur={onTouch}
    />
  );
}

function MyForm() {
  return (
    <Form
      onSubmit={(submitEnd) => {
        setTimeout(() => {
          submitEnd();
        }, 1000);
      }}
    >
      <Form.Control>
        <Form.Label>Field one:</Form.Label>
        <Input name="one" />
        <Form.HelperText>Helper text</Form.HelperText>
        {Form.Control.state.isTouched() && Form.Control.state.isInvalid() && (
          <Form.ErrorMessage>
            <For each={Form.Control.state.errors()}>
              {(errorMessage) => <div>{errorMessage}</div>}
            </For>
          </Form.ErrorMessage>
        )}
      </Form.Control>
      <Form.Control>
        <Form.Label>Field two:</Form.Label>
        <Input name="two" />
        <Form.HelperText>Helper text</Form.HelperText>
        {Form.Control.state.isTouched() && Form.Control.state.isInvalid() && (
          <Form.ErrorMessage>
            <For each={Form.Control.state.errors()}>
              {(errorMessage) => <div>{errorMessage}</div>}
            </For>
          </Form.ErrorMessage>
        )}
      </Form.Control>
      <Form.Submit>{Form.state.isSubmitting() ? 'Submitting...' : 'Submit'}</Form.Submit>
      {JSON.stringify(Form.state.errors())}
    </Form>
  );
}

const App: Component = () => {
  return (
    <>
      <Demo />
      {/* <NewDemo />
      <section>
        <h1>Old</h1>
        <PopoverDemo />
        <MenuDemo />
        <ListboxDemo />
        <ComboboxDemo />
        <CalendarDemo />
        <RadioGroupDemo />
        <MySwitch />
        <MyForm />
        <CacheProvider>
          <Todo />
          <Todo />
          <Todo />
        </CacheProvider>
      </section> */}
    </>
  );
};

export default App;
