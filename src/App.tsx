import { Component, createSignal } from 'solid-js';
import { For } from 'solid-js/web';
import { CacheProvider } from '~/Cache';
import Combobox from '~/Combobox';
import Disclosure from '~/Disclosure';
import Form from '~/Form';
import Listbox from '~/Listbox';
import Menu from '~/Menu';
import Popover from '~/Popover';
import RadioGroup from '~/RadioGroup';
import Switch from '~/Switch';
import CalendarDemo from '../demo/Calendar';
import './App.css';

const MyPopover: Component = () => {
  return (
    <Popover>
      <Popover.Trigger>{Popover.state.isOpen ? 'Close' : 'Open'}</Popover.Trigger>
      <Popover.Overlay class="popover-overlay" />
      <Popover.Panel class="popover">
        <Popover.Trigger>X</Popover.Trigger>
        <button>1</button>
        <Popover>
          <button ref={Popover.AnchorRef}>2</button>
          <button>3</button>
          <Popover.Trigger>{Popover.state.isOpen ? 'Close' : 'Open'}</Popover.Trigger>
          <Popover.Overlay class="popover-overlay" />
          <Popover.Panel class="popover">
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </Popover.Panel>
        </Popover>
      </Popover.Panel>
    </Popover>
  );
};

const MyMenuItem = (props) => {
  return (
    <Menu.Item
      as="button"
      classList={{ active: Menu.Item.state.isActive() }}
      onClick={() => console.log(`clicked Item ${props.value}`)}
      disabled={props.value % 2 === 0}
    >
      {`Item ${props.value}`}
    </Menu.Item>
  );
};

function MyMenu() {
  return (
    <Menu>
      <Menu.Button>Open Menu</Menu.Button>
      <Menu.Panel class="popover">
        <h4 tabIndex={0}>Choose an item</h4>
        <Menu.Items aria-orientation="horizontal">
          <MyMenuItem value={1} />
          <MyMenuItem value={2} />
          <MyMenuItem value={3} />
        </Menu.Items>
      </Menu.Panel>
    </Menu>
  );
}

const listboxItems = [0, 1, 12, 123, 3, 4, 5, 6, 7, 8];
const MyListbox = () => {
  const [value, setValue] = createSignal(123);

  const classList = () => ({
    active: Listbox.Option.state.isActive(),
    selected: Listbox.Option.state.isSelected(),
  });

  return (
    <Listbox value={value()} onChange={setValue}>
      <Listbox.Label>Option:</Listbox.Label>
      <Listbox.Button>{value}</Listbox.Button>
      <Listbox.Overlay class="popover-overlay" />
      <Listbox.Options class="popover">
        <For each={listboxItems}>
          {(item) => (
            <Listbox.Option classList={classList()} value={item} disabled={item % 2 === 0}>
              {item}
            </Listbox.Option>
          )}
        </For>
      </Listbox.Options>
    </Listbox>
  );
};

const MyCombobox: Component<{ selection: 'manual' | 'automatic' | 'inline-automatic' }> = (
  props
) => {
  const [value, setValue] = createSignal('');

  function classList() {
    return {
      active: Combobox.Option.state.isActive(),
    };
  }

  return (
    <Combobox
      value={value()}
      options={['red', 'rred', 'blue', 'green']}
      onChange={setValue}
      selection={props.selection}
    >
      <Combobox.Label>My Combobox:</Combobox.Label>
      <Combobox.Textbox />
      <Combobox.Dropdown class="combobox-dropdown">Open</Combobox.Dropdown>
      <Combobox.Listbox class="popover">
        <For each={Combobox.state.options}>
          {(option) => (
            <Combobox.Option classList={classList()} value={option}>
              {option}
            </Combobox.Option>
          )}
        </For>
      </Combobox.Listbox>
    </Combobox>
  );
};

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

function MyRadioGroup() {
  const [value, setValue] = createSignal(1);

  function classList() {
    return {
      active: RadioGroup.Option.state.isActive(),
      selected: RadioGroup.Option.state.isSelected(),
    };
  }

  return (
    <RadioGroup
      value={value()}
      onChange={(value) => {
        console.log('radio group selected:', value);
        setValue(value);
      }}
    >
      <RadioGroup.Option classList={classList()} value={1}>
        1
      </RadioGroup.Option>
      <RadioGroup.Option classList={classList()} value={2}>
        2
      </RadioGroup.Option>
      <RadioGroup.Option classList={classList()} value={3}>
        3
      </RadioGroup.Option>
    </RadioGroup>
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

const App: Component = () => {
  return (
    <CacheProvider>
      <div>
        <MyPopover />
        <MyMenu />
        <MyListbox />
        <MyCombobox selection="manual" />
        <MyCombobox selection="automatic" />
        <MyCombobox selection="inline-automatic" />
        <CalendarDemo />
        <MyDisclosure />
        <MyRadioGroup />
        <MySwitch />
        <MyForm />
        {/* <Todo />
        <Todo />
        <Todo /> */}
      </div>
    </CacheProvider>
  );
};

export default App;
