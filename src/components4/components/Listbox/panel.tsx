import { JSX, mergeProps, onMount } from 'solid-js';
import {
  createClickAwayEffect,
  createFocusTrapEffect,
  focusInitialChildOnMount,
} from '~/components4/utils/eventUtils';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useListboxActions, useListboxContext, useListboxState } from './context';

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
    context: useListboxContext(),
  } as const;
}

export function createPanelProps<PanelElement extends HTMLElement = HTMLElement>(
  config: PanelConfig<PanelElement>
) {
  const { idPrefix = 'solid-ui-listbox-panel' } = config;
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
  const actions = useListboxActions();

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
  const state = useListboxState();
  const actions = useListboxActions();

  registerPanelIdOnMount({ id: config.id });

  createFocusTrapEffect({
    containerId: config.id,
    isEnabled: () => state.isPanelOpen,
  });

  focusInitialChildOnMount({
    containerId: config.id,
  });

  createClickAwayEffect({
    containerId: config.id,
    exceptionIds: () => [state.triggerId],
    onClickAway: actions.closePopover,
    isEnabled: () =>
      state.isPanelOpen && document.getElementById(config.id).contains(document.activeElement),
  });
}

export function registerPanelIdOnMount(config: { id: string }) {
  const actions = useListboxActions();
  onMount(() => {
    actions.setElementId('panelId', config.id);
  });
}
