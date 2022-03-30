import { JSX, mergeProps, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useComboboxActions, useComboboxContext, useComboboxState } from './context';

export type TriggerConfig<TriggerElement extends HTMLElement> = {
  idPrefix?: string;
  onClick?: JSX.EventHandler<TriggerElement, MouseEvent>;
  onMouseDown?: JSX.EventHandler<TriggerElement, MouseEvent>;
};

export function createTrigger<TriggerElement extends HTMLElement = HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const props = createTriggerProps(config);
  const handlers = createTriggerHandlers(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createTriggerEffects({ id: props.id }),
    context: useComboboxContext(),
  };
}

export function createTriggerProps<TriggerElement extends HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const state = useComboboxState();
  const { idPrefix = 'solid-ui-combobox-trigger' } = config;
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
    tabIndex: -1,
  } as const;
}

export function createTriggerHandlers<TriggerElement extends HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const state = useComboboxState();
  const actions = useComboboxActions();

  const onClick: JSX.EventHandler<TriggerElement, MouseEvent> = (event) => {
    actions.togglePopover();
    document.getElementById(state.inputId)?.focus({ preventScroll: true });
    config.onClick?.(event);
  };

  const onMouseDown: JSX.EventHandler<TriggerElement, MouseEvent> = (event) => {
    event.preventDefault();
    config.onMouseDown?.(event);
  };

  return {
    onClick,
    onMouseDown,
  } as const;
}

export function createTriggerEffects(config: { id: string }) {
  registerTriggerIdOnMount(config);
}

export function registerTriggerIdOnMount(config: { id: string }) {
  const actions = useComboboxActions();
  onMount(() => {
    actions.setElementId('triggerId', config.id);
  });
}
