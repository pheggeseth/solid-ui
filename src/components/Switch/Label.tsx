import { JSX, mergeProps, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useSwitchActions, useSwitchState } from './context';

export type CreateLabelConfig<LabelElement extends HTMLElement = HTMLElement> = {
  idPrefix?: string;
  onClick?: JSX.EventHandler<LabelElement, MouseEvent>;
  passive?: boolean;
};

export function createLabel<LabelElement extends HTMLElement = HTMLElement>(
  config: CreateLabelConfig<LabelElement> = {}
) {
  const props = createLabelProps(config);
  const handlers = createLabelHandlers<LabelElement>(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createLabelEffects({ id: props.id }),
  } as const;
}

export function createLabelProps(config: CreateLabelConfig = {}) {
  const { idPrefix = 'solid-ui-switch-label' } = config;
  const id = useId(idPrefix);

  return {
    ...getDataProp(idPrefix),
    id,
  } as const;
}

export function createLabelHandlers<LabelElement extends HTMLElement = HTMLElement>(
  config: CreateLabelConfig<LabelElement> = {}
) {
  const state = useSwitchState();

  const onClick: JSX.EventHandler<LabelElement, MouseEvent> = (event) => {
    if (!config.passive) {
      document.getElementById(state.labelId)?.click();
    }
    config.onClick?.(event);
  };

  return {
    onClick,
  } as const;
}

export function createLabelEffects(config: { id: string }) {
  registerLabelIdOnMount(config);
}

export function registerLabelIdOnMount(config: { id: string }) {
  const actions = useSwitchActions();
  onMount(() => {
    actions.setElementId('labelId', config.id);
  });
}
