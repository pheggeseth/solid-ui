import { JSXElement, mergeProps, onMount, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useId } from '~/utils/componentUtils';
import { BaseComponent, BaseComponentProps } from '~/types';
import { useSwitchActions, useSwitchState } from './context';
import Description from './Description';
import Group from './Group';
import Label from './Label';

export type SwitchProps = {
  as?:
    | string
    | BaseComponent<{
        id: string;
        'aria-labelledby'?: string;
        'aria-describedby'?: string;
        'aria-checked': boolean;
        onClick: (event?: MouseEvent) => void;
        onKeyPress: (event: KeyboardEvent) => void;
        onKeyUp: (event: KeyboardEvent) => void;
        role: 'switch';
        tabIndex: string | number;
      }>;
  checked: boolean;
  onChange?: (checked: boolean) => void;
};

export const Switch: BaseComponent<SwitchProps> = (props) => {
  props = mergeProps({ as: 'button' }, props);

  const [localProps, otherProps] = splitProps(props, ['as', 'checked', 'onChange']);

  const actions = useSwitchActions();

  const id = useId('switch');

  onMount(() => {
    actions?.registerSwitchId(id);
  });

  function toggle() {
    localProps.onChange(!localProps.checked);
  }

  function handleKeyPress(event: KeyboardEvent) {
    event.preventDefault();
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key !== 'Tab') {
      event.preventDefault();
    }

    if (event.key === ' ') {
      toggle();
    }
  }

  const state = useSwitchState();

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      id={id}
      aria-labelledby={state?.labelId}
      aria-describedby={state?.descriptionId}
      aria-checked={localProps.checked}
      data-solid-switch=""
      onClick={toggle}
      onKeyPress={handleKeyPress}
      onKeyUp={handleKeyUp}
      role="switch"
      tabIndex="0"
    />
  );
};

type SwitchComponentType = {
  (props: BaseComponentProps<SwitchProps>): JSXElement;
  Group: typeof Group;
  Label: typeof Label;
  Description: typeof Description;
};

const SwitchComponent: SwitchComponentType = Object.assign(Switch, { Group, Label, Description });

export default SwitchComponent;
