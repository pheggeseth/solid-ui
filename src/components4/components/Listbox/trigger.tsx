import { createEffect, JSX, mergeProps, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useListboxActions, useListboxContext, useListboxState } from './context';

export type TriggerConfig<TriggerElement extends HTMLElement> = {
  idPrefix?: string;
  onClick?: JSX.EventHandler<TriggerElement, MouseEvent>;
  onKeyUp?: JSX.EventHandler<TriggerElement, KeyboardEvent>;
};

export function createTrigger<TriggerElement extends HTMLElement = HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const props = createTriggerProps<TriggerElement>(config);
  const handlers = createTriggerHandlers<TriggerElement>(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createTriggerEffects({ id: props.id }),
    context: useListboxContext(),
  } as const;
}

export function createTriggerProps<TriggerElement extends HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const state = useListboxState();
  const { idPrefix = 'solid-ui-listbox-trigger' } = config;
  const id = useId(idPrefix);

  return {
    get ['aria-controls']() {
      return state.panelId || state.listId;
    },
    get ['aria-expanded']() {
      return state.isPanelOpen;
    },
    ['aria-haspopup']: 'listbox',
    get ['aria-labelledby']() {
      return state.labelId;
    },
    'data-solid-ui-button': '',
    ...getDataProp(idPrefix),
    id,
  } as const;
}

export function createTriggerHandlers<TriggerElement extends HTMLElement = HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const actions = useListboxActions();

  const onClick: JSX.EventHandler<TriggerElement, MouseEvent> = (event) => {
    actions.togglePopover();
    config.onClick?.(event);
  };

  const onKeyUp: JSX.EventHandler<TriggerElement, KeyboardEvent> = (event) => {
    if (event.key === 'Escape') {
      actions.closePopover();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      actions.openPopover();
    }
    config.onKeyUp?.(event);
  };

  return {
    onClick,
    onKeyUp,
  } as const;
}

export function createTriggerEffects(config: { id: string }) {
  registerTriggerIdOnMount(config);
  focusTriggerOnClose(config);
}

export function registerTriggerIdOnMount(config: { id: string }) {
  const actions = useListboxActions();
  onMount(() => {
    actions.setElementId('triggerId', config.id);
  });
}

export function focusTriggerOnClose(config: { id: string }) {
  const state = useListboxState();

  createEffect<boolean>((wasPanelOpen) => {
    if (wasPanelOpen && !state.isPanelOpen) {
      document.getElementById(config.id)?.focus();
    }
    return state.isPanelOpen;
  });
}
