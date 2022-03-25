import { mergeProps, onMount } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useDisclosureActions, useDisclosureContext, useDisclosureState } from './context';

export type TriggerConfig<TriggerElement extends HTMLElement> = {
  idPrefix?: string;
  primary?: boolean;
  onClick?: JSX.EventHandler<TriggerElement, MouseEvent>;
};

export function createTrigger<TriggerElement extends HTMLElement = HTMLElement>(
  config: TriggerConfig<TriggerElement> = {}
) {
  const disclosureState = useDisclosureState();
  config.primary = config.primary ?? !disclosureState.triggerId;
  const props = createTriggerProps<TriggerElement>(config);
  const handlers = createTriggerHandlers(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createTriggerEffects({ id: props.id, primary: config.primary }),
    context: useDisclosureContext(),
  } as const;
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
      return primary ? disclosureState.isShowingContent : undefined;
    },
    'data-solid-ui-button': '',
    ...getDataProp(idPrefix),
    id,
  } as const;
}

export function createTriggerHandlers<TriggerElement extends HTMLElement>(
  config: TriggerConfig<TriggerElement>
) {
  const disclosureActions = useDisclosureActions();

  const onClick: JSX.EventHandler<TriggerElement, MouseEvent> = (event) => {
    disclosureActions.toggleContent();
    config.onClick?.(event);
  };

  return {
    onClick,
  } as const;
}

export function createTriggerEffects(config: { id: string; primary?: boolean }) {
  if (config.primary) {
    registerTriggerIdOnMount(config);
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
