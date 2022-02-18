import { mergeProps, onMount, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useId } from '~/componentUtils';
import { BaseComponent } from '~/types';
import { useDisclosureActions, useDisclosureState } from './context';

const dataAttribute = {
  'data-solid-disclosure-button': '' as const,
};

export type ButtonProps = {
  as?:
    | string
    | BaseComponent<
        {
          id: string;
          'aria-expanded': boolean;
          'aria-controls': string;
          onClick(event?: MouseEvent): void;
          type: 'button';
        },
        typeof dataAttribute
      >;
  focusRef?: HTMLElement;
};

const Button: BaseComponent<ButtonProps> = (props) => {
  props = mergeProps({ as: 'button' }, props);

  const state = useDisclosureState();
  const actions = useDisclosureActions();

  const buttonId = useId('disclosure-button');

  onMount(() => {
    if (!state.buttonId) {
      actions.registerButton(buttonId);
    }
  });

  function handleClick() {
    actions.toggle();
    if (props.focusRef) {
      props.focusRef.focus();
    } else {
      document.getElementById(state.buttonId)?.focus();
    }
  }

  const [localProps, otherProps] = splitProps(props, ['as', 'focusRef']);

  return (
    <Dynamic
      {...otherProps}
      aria-expanded={state.isOpen}
      aria-controls={state.isOpen ? state.panelId : undefined}
      {...dataAttribute}
      component={localProps.as}
      id={buttonId}
      onClick={handleClick}
      type="button"
    />
  );
};

export default Button;
