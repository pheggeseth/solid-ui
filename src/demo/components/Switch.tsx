import { Component, createSignal, PropsWithChildren } from 'solid-js';
import Switch from '../../components/Switch';
import { CodeBlock } from '../utils';

const SwitchButton: Component<{ checked: boolean; onChange: (checked: boolean) => void }> = (
  props
) => {
  const { props: switchProps, effects } = Switch.createSwitch({
    checked: () => props.checked,
    onChange: props.onChange,
  });

  effects();

  return (
    <button type="button" {...switchProps}>
      {props.children}
    </button>
  );
};

const SwitchDescription: Component = (props: PropsWithChildren) => {
  const { props: descriptionProps, effects } = Switch.createDescription();

  effects();

  return <p {...descriptionProps}>{props.children}</p>;
};

const SwitchLabel: Component = (props) => {
  const { props: labelProps, effects } = Switch.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
};

const MySwitch: Component = () => {
  const [checked, setChecked] = createSignal(false);

  return (
    <Switch>
      <SwitchLabel>Enable feature flag: </SwitchLabel>
      <SwitchButton checked={checked()} onChange={setChecked} />
      <SwitchDescription>This is the description of the switch.</SwitchDescription>
    </Switch>
  );
};

export function SwitchDemo() {
  return (
    <section>
      <h2 id="Switch">Switch</h2>
      <p>
        A switch functions just like a native checkbox, but has switch semantics applied to it
        instead.
      </p>
      <h3>Example</h3>
      <MySwitch />
      <h3>Code</h3>
      <CodeBlock>{exampleCode}</CodeBlock>
    </section>
  );
}

SwitchDemo.Link = () => <a href="#Switch">Switch</a>;

const exampleCode = `import { Component, createSignal, PropsWithChildren } from 'solid-js';
import Switch from '@solid-ui/switch';

const SwitchButton: Component<{ checked: boolean; onChange: (checked: boolean) => void }> = (
  props
) => {
  const { props: switchProps, effects } = Switch.createSwitch({
    checked: () => props.checked,
    onChange: props.onChange,
  });

  effects();

  return (
    <button type="button" {...switchProps}>
      {props.children}
    </button>
  );
};

const SwitchDescription: Component = (props: PropsWithChildren) => {
  const { props: descriptionProps, effects } = Switch.createDescription();

  effects();

  return <p {...descriptionProps}>{props.children}</p>;
};

const SwitchLabel: Component = (props) => {
  const { props: labelProps, effects } = Switch.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
};

const MySwitch: Component = () => {
  const [checked, setChecked] = createSignal(false);

  return (
    <Switch>
      <SwitchLabel>Enable feature flag: </SwitchLabel>
      <SwitchButton checked={checked()} onChange={setChecked} />
      <SwitchDescription>This is the description of the switch.</SwitchDescription>
    </Switch>
  );
};`;
