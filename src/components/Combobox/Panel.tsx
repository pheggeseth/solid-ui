import { JSX, mergeProps, onMount } from 'solid-js';
import { createClickAwayEffect, focusInitialChildOnMount } from '~/utils/eventUtils';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useComboboxActions, useComboboxContext, useComboboxState } from './context';

export type PanelConfig<PanelElement extends HTMLElement> = {
  idPrefix?: string;
  onKeyUp?: JSX.EventHandler<PanelElement, KeyboardEvent>;
};

export function createPanel<PanelElement extends HTMLElement = HTMLElement>(
  config: PanelConfig<PanelElement> = {}
) {
  const props = createPanelProps(config);
  const handlers = createPanelHandlers(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createPanelEffects({ id: props.id }),
    context: useComboboxContext(),
  } as const;
}

export function createPanelProps<PanelElement extends HTMLElement = HTMLElement>(
  config: PanelConfig<PanelElement>
) {
  const { idPrefix = 'solid-ui-combobox-panel' } = config;
  const id = useId(idPrefix);

  return {
    'data-solid-ui-panel': '',
    ...getDataProp(idPrefix),
    id,
    tabIndex: -1,
  } as const;
}

export function createPanelHandlers<PanelElement extends HTMLElement = HTMLElement>(
  config: PanelConfig<PanelElement>
) {
  const actions = useComboboxActions();

  const onKeyUp: JSX.EventHandler<PanelElement, KeyboardEvent> = (event) => {
    if (event.key === 'Escape') {
      actions.closePopover();
    }
    config.onKeyUp?.(event);
  };

  return {
    onKeyUp,
  } as const;
}

export function createPanelEffects(config: { id: string }) {
  const state = useComboboxState();
  const actions = useComboboxActions();

  registerPanelIdOnMount({ id: config.id });

  createClickAwayEffect({
    containerId: config.id,
    exceptionIds: () => [state.triggerId],
    onClickAway: actions.closePopover,
    isEnabled: () =>
      state.isPanelOpen /* && document.getElementById(config.id).contains(document.activeElement) */,
  });
}

export function registerPanelIdOnMount(config: { id: string }) {
  const actions = useComboboxActions();
  onMount(() => {
    actions.setElementId('panelId', config.id);
  });
}
