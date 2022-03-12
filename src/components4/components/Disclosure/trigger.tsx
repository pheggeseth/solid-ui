import { createEffect, JSX, mergeProps, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useDisclosureContext, useDisclosureActions, useDisclosureState } from './context';

export type TriggerConfig<TriggerElement extends HTMLElement> = {
  idPrefix?: string;
  primary?: boolean;
  onClick?: JSX.EventHandler<TriggerElement, MouseEvent>;
  onKeyUp?: JSX.EventHandler<TriggerElement, KeyboardEvent>;
};

export function createTrigger<TriggerElement extends HTMLElement = HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const disclosureState = useDisclosureState();
  config.primary = config.primary ?? !disclosureState.triggerId;
  const props = createTriggerProps<TriggerElement>(config);
  const handlers = createTriggerHandlers<TriggerElement>(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createTriggerEffects({ id: props.id, primary: config.primary }),
    context: useDisclosureContext(),
  };
}

export function createTriggerProps<TriggerElement extends HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const disclosureState = useDisclosureState();
  const { idPrefix = 'solid-ui-disclosure-trigger', primary = !disclosureState.triggerId } = config;
  const id = useId(idPrefix);

  return {
    get ['aria-controls']() {
      return primary ? disclosureState.contentId : undefined;
    },
    get ['aria-expanded']() {
      return primary ? disclosureState.isContentOpen : undefined;
    },
    get ['aria-haspopup']() {
      return primary ? disclosureState.role : undefined;
    },
    'data-solid-ui-button': '',
    ...getDataProp(idPrefix),
    id,
  };
}

export function createTriggerHandlers<TriggerElement extends HTMLElement = HTMLElement>(
  config: TriggerConfig<TriggerElement>
) {
  const disclosureState = useDisclosureState();
  const disclosureActions = useDisclosureActions();

  const onClick: JSX.EventHandler<TriggerElement, MouseEvent> = (event) => {
    disclosureActions.toggleDisclosure();
    config.onClick?.(event);
  };

  const onKeyUp: JSX.EventHandler<TriggerElement, KeyboardEvent> = (event) => {
    if (event.key === 'Escape') {
      disclosureActions.closeDisclosure();
    } else if (
      (disclosureState.role === 'menu' || disclosureState.role === 'listbox') &&
      (event.key === 'ArrowDown' || event.key === 'ArrowUp')
    ) {
      disclosureActions.openDisclosure();
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
    const disclosureState = useDisclosureState();
    const disclosureActions = useDisclosureActions();

    if (!disclosureState.triggerId) {
      disclosureActions.setElementId('triggerId', config.id);
    }
  });
}

export function focusPrimaryTriggerOnClose(config: { id: string }) {
  const disclosureState = useDisclosureState();

  createEffect<boolean>((wasPanelOpen) => {
    if (wasPanelOpen && !disclosureState.isContentOpen && config.id === disclosureState.triggerId) {
      document.getElementById(config.id)?.focus();
    }
    return disclosureState.isContentOpen;
  });
}
