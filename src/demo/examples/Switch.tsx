import { createSignal, PropsWithChildren } from 'solid-js';
import SolidUISwitch, { CreateSwitchConfig } from '../../components/Switch';

function Switch(
  props: PropsWithChildren<{ checked: boolean; onChange: (checked: boolean) => void }>
) {
  const { props: switchProps, effects } = SolidUISwitch.createSwitch({
    checked: () => props.checked,
    onChange: props.onChange,
  });

  effects();

  return (
    <button type="button" {...switchProps}>
      {props.children}
    </button>
  );
}

function SwitchDescription(props: PropsWithChildren) {
  const { props: descriptionProps, effects } = SolidUISwitch.createDescription();

  effects();

  return <p {...descriptionProps}>{props.children}</p>;
}

function SwitchLabel(props: PropsWithChildren) {
  const { props: labelProps, effects } = SolidUISwitch.createLabel();

  effects();

  return <label {...labelProps}>{props.children}</label>;
}

export function SwitchExample() {
  const [checked, setChecked] = createSignal(false);

  return (
    <SolidUISwitch>
      <SwitchLabel>Enable feature flag: </SwitchLabel>
      <Switch checked={checked()} onChange={setChecked} />
      <SwitchDescription>This is the description of the switch.</SwitchDescription>
    </SolidUISwitch>
  );
}
