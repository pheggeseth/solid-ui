import { Component, createSignal } from 'solid-js';
import { For } from 'solid-js/web';
import { CacheProvider } from '~/Cache';
import Form from '~/components/Form';
import Switch from '~/components/Switch';
import './App.css';
import { Disclosure, DisclosureButton, DisclosureProvider } from './components2/Disclosure';
import { Listbox, ListboxItem, ListboxLabel, ListboxProvider } from './components2/Listbox3';
import { PopoverButton, PopoverPanel, PopoverProvider } from './components2/Popover';
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

// function NewCombobox() {
//   return (
//     <DialogProvider>
//       <Popper>
//         <span ref={Popper.AnchorRef}>Other thing</span>
//         <ComboboxButton>Open</ComboboxButton>

//         <ComboboxPanel>
//           YO!!!
//           <ComboboxButton>Close</ComboboxButton>
//         </ComboboxPanel>
//       </Popper>
//     </DialogProvider>
//   );
// }

const fruits = ['apple', 'apricot', 'orange', 'peach', 'pineapple', 'watermelon'];

function Listbox3() {
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

function Disclosure2() {
  return (
    <DisclosureProvider>
      {/* <Popper> */}
      <DisclosureButton>Open</DisclosureButton>
      <Disclosure>YO!!!</Disclosure>
      {/* </Popper> */}
    </DisclosureProvider>
  );
}

function Popover2() {
  return (
    <PopoverProvider>
      <PopoverButton>Open</PopoverButton>
      <PopoverPanel>YO!!!!!</PopoverPanel>
    </PopoverProvider>
  );
}

const App: Component = () => {
  return (
    <CacheProvider>
      <Listbox3 />
      <Disclosure2 />
      <Popover2 />
      {/* <NewCombobox /> */}
      <PopoverDemo />
      <MenuDemo />
      <ListboxDemo />
      <ComboboxDemo />
      <CalendarDemo />
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
