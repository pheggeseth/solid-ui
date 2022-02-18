import { createEffect, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useId } from '~/componentUtils';
import { BaseComponent } from '~/types';
import { usePopoverActions, usePopoverState } from './context';

type TriggerProps = {
  as?:
    | BaseComponent<{
        'aria-expanded': boolean;
        'aria-haspopup': TriggerProps['aria-haspopup'];
        id: string;
        onClick: TriggerProps['onClick'];
        onKeyDown?: TriggerProps['onKeyDown'];
        type: 'button';
      }>
    | string;
  'aria-haspopup'?: boolean | string;
  idPrefix?: string;
  onClick?: (event: MouseEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  ref?: (element: Element) => void;
};

export const Trigger: BaseComponent<TriggerProps> = function Trigger(props) {
  props = mergeProps({ 'aria-haspopup': 'dialog', as: 'button' }, props);

  const state = usePopoverState();
  const actions = usePopoverActions();

  const triggerId = useId(props.idPrefix || 'popover-trigger');

  // only register the first trigger that renders
  if (!state.triggerId) {
    actions.registerTrigger(triggerId);
  }

  function ref(element: HTMLElement) {
    // only use this trigger as the popper trigger if it was the first trigger to render
    if (state.triggerId === triggerId) {
      actions.setTriggerReference(element);
    }
    props.ref?.(element);
  }

  createEffect((prevIsOpen) => {
    if (prevIsOpen && !state.isOpen) {
      document.getElementById(state.triggerId)?.focus();
    }
    return state.isOpen;
  });

  function handleClick(event: MouseEvent) {
    props.onClick?.(event);
    actions.togglePopover();
  }

  function handleKeyDown(event) {
    props.onKeyDown?.(event);
  }

  const [localProps, otherProps] = splitProps(props, ['as', 'aria-haspopup']);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      aria-controls={state.isOpen ? state.panelId : undefined}
      aria-expanded={state.isOpen}
      aria-haspopup={localProps['aria-haspopup']}
      id={triggerId}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={ref}
      type="button"
    >
      {otherProps.children}
    </Dynamic>
  );
};

export default Trigger;
