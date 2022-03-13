import { createEffect, JSX, mergeProps, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { usePopoverContext, usePopoverActions, usePopoverState } from './context';

export type TriggerConfig<TriggerElement extends HTMLElement> = {
  idPrefix?: string;
  primary?: boolean;
  onClick?: JSX.EventHandler<TriggerElement, MouseEvent>;
  onKeyUp?: JSX.EventHandler<TriggerElement, KeyboardEvent>;
};

export function createTrigger<TriggerElement extends HTMLElement = HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const popoverState = usePopoverState();
  config.primary = config.primary ?? !popoverState.triggerId;
  const props = createTriggerProps<TriggerElement>(config);
  const handlers = createTriggerHandlers<TriggerElement>(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createTriggerEffects({ id: props.id, primary: config.primary }),
    context: usePopoverContext(),
  };
}

export function createTriggerProps<TriggerElement extends HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const popoverState = usePopoverState();
  const { idPrefix = 'solid-ui-popover-trigger', primary = !popoverState.triggerId } = config;
  const id = useId(idPrefix);

  return {
    get ['aria-controls']() {
      return primary ? popoverState.panelId : undefined;
    },
    get ['aria-expanded']() {
      return primary ? popoverState.isPanelOpen : undefined;
    },
    get ['aria-haspopup']() {
      return primary ? popoverState.role : undefined;
    },
    'data-solid-ui-button': '',
    ...getDataProp(idPrefix),
    id,
  };
}

export function createTriggerHandlers<TriggerElement extends HTMLElement = HTMLElement>(
  config: TriggerConfig<TriggerElement>
) {
  const popoverState = usePopoverState();
  const popoverActions = usePopoverActions();

  const onClick: JSX.EventHandler<TriggerElement, MouseEvent> = (event) => {
    popoverActions.togglePopover();
    config.onClick?.(event);
  };

  const onKeyUp: JSX.EventHandler<TriggerElement, KeyboardEvent> = (event) => {
    if (event.key === 'Escape') {
      popoverActions.closePopover();
    } else if (
      (popoverState.role === 'menu' || popoverState.role === 'listbox') &&
      (event.key === 'ArrowDown' || event.key === 'ArrowUp')
    ) {
      popoverActions.openPopover();
    }
    config.onKeyUp?.(event);
  };

  return {
    onClick,
    onKeyUp,
  };
}

export function createTriggerEffects(config: { id: string; primary?: boolean }) {
  if (config.primary) {
    registerTriggerIdOnMount(config);
    focusPrimaryTriggerOnClose(config);
  }
}

export function registerTriggerIdOnMount(config: { id: string }) {
  onMount(() => {
    const popoverState = usePopoverState();
    const popoverActions = usePopoverActions();

    if (!popoverState.triggerId) {
      popoverActions.setElementId('triggerId', config.id);
    }
  });
}

export function focusPrimaryTriggerOnClose(config: { id: string }) {
  const popoverState = usePopoverState();

  createEffect<boolean>((wasPanelOpen) => {
    if (wasPanelOpen && !popoverState.isPanelOpen && config.id === popoverState.triggerId) {
      document.getElementById(config.id)?.focus();
    }
    return popoverState.isPanelOpen;
  });
}
