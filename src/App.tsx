import { Component, createSignal, JSX, PropsWithChildren } from 'solid-js';
import { For } from 'solid-js/web';
import { CacheProvider } from '~/Cache';
import Disclosure from '~/components/Disclosure';
import Form from '~/components/Form';
import Switch from '~/components/Switch';
import './App.css';
import { ComboboxButton, ComboboxPanel } from './components2/Combobox';
import { DialogProvider } from './components2/Dialog';
import Popper from './components2/Popper';
import CalendarDemo from './demo/Calendar';
import ComboboxDemo from './demo/Combobox';
import ListboxDemo from './demo/Listbox';
import MenuDemo from './demo/Menu';
import PopoverDemo from './demo/Popover';
import RadioGroupDemo from './demo/RadioGroup';
import { ListboxProvider, Listbox, ListboxOption } from './components2/Listbox';

function MyDisclosure() {
  let ref;

  return (
    <Disclosure>
      <Disclosure.Button ref={ref} style={Disclosure.state.isOpen ? { background: 'red' } : {}}>
        Open
      </Disclosure.Button>
      <Disclosure.Panel>
        Stuff
        <Disclosure.Button>Close</Disclosure.Button>
      </Disclosure.Panel>
    </Disclosure>
  );
}

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

function NewCombobox() {
  return (
    <DialogProvider>
      <Popper>
        <span ref={Popper.AnchorRef}>Other thing</span>
        <ComboboxButton>Open</ComboboxButton>

        <ComboboxPanel>
          YO!!!
          <ComboboxButton>Close</ComboboxButton>
        </ComboboxPanel>
      </Popper>
    </DialogProvider>
  );
}

const options = [1, 2, 3];
function NewListbox() {
  const [value, setValue] = createSignal(2);

  return (
    <ListboxProvider
      value={value()}
      onChange={(value) => {
        console.log('new value:', value);
        setValue(value);
      }}
    >
      <Listbox>
        <For each={options}>
          {(option) => <ListboxOption value={option}>{option}</ListboxOption>}
        </For>
      </Listbox>
    </ListboxProvider>
  );
}

const App: Component = () => {
  return (
    <CacheProvider>
      <NewListbox />
      <NewCombobox />
      <PopoverDemo />
      <MenuDemo />
      <ListboxDemo />
      <ComboboxDemo />
      <CalendarDemo />
      <MyDisclosure />
      <RadioGroupDemo />
      <MySwitch />
      <MyForm />
      {/* <Todo />
        <Todo />
        <Todo /> */}
    </CacheProvider>
  );
};

export default App;
