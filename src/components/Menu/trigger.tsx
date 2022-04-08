import { createEffect, JSX, mergeProps, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useMenuActions, useMenuContext, useMenuState } from './context';

export type TriggerConfig<TriggerElement extends HTMLElement> = {
  idPrefix?: string;
  onClick?: JSX.EventHandler<TriggerElement, MouseEvent>;
  onKeyDown?: JSX.EventHandler<TriggerElement, KeyboardEvent>;
};

export function createTrigger<TriggerElement extends HTMLElement = HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const props = createTriggerProps<TriggerElement>(config);
  const handlers = createTriggerHandlers<TriggerElement>(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createTriggerEffects({ id: props.id }),
    context: useMenuContext(),
  } as const;
}

export function createTriggerProps<TriggerElement extends HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const state = useMenuState();
  const { idPrefix = 'solid-ui-menu-trigger' } = config;
  const id = useId(idPrefix);

  return {
    get ['aria-controls']() {
      return state.panelId || state.listId;
    },
    get ['aria-expanded']() {
      return state.isPanelOpen;
    },
    ['aria-haspopup']: 'menu',
    'data-solid-ui-button': '',
    ...getDataProp(idPrefix),
    id,
  } as const;
}

export function createTriggerHandlers<TriggerElement extends HTMLElement = HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const actions = useMenuActions();

  const onClick: JSX.EventHandler<TriggerElement, MouseEvent> = (event) => {
    actions.togglePopover();
    config.onClick?.(event);
  };

  const onKeyDown: JSX.EventHandler<TriggerElement, KeyboardEvent> = (event) => {
    if (event.key === 'Escape') {
      actions.closePopover();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      actions.openPopover();
    }
    config.onKeyDown?.(event);
  };

  return {
    onClick,
    onKeyDown,
  } as const;
}

export function createTriggerEffects(config: { id: string }) {
  registerTriggerIdOnMount(config);
  focusTriggerOnClose(config);
}

export function registerTriggerIdOnMount(config: { id: string }) {
  onMount(() => {
    useMenuActions().setElementId('triggerId', config.id);
  });
}

export function focusTriggerOnClose(config: { id: string }) {
  const state = useMenuState();

  createEffect<boolean>((wasPanelOpen) => {
    if (wasPanelOpen && !state.isPanelOpen) {
      document.getElementById(config.id)?.focus({ preventScroll: true });
    }
    return state.isPanelOpen;
  });
}
