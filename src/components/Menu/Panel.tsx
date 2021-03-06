import { JSX, mergeProps, onMount } from 'solid-js';
import {
  createClickAwayEffect,
  createFocusTrapEffect,
  focusInitialChildOnMount,
} from '~/utils/eventUtils';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useMenuActions, useMenuContext, useMenuState } from './context';

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
    context: useMenuContext(),
  } as const;
}

export function createPanelProps<PanelElement extends HTMLElement = HTMLElement>(
  config: PanelConfig<PanelElement>
) {
  const { idPrefix = 'solid-ui-menu-panel' } = config;
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
  const actions = useMenuActions();

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
  const state = useMenuState();
  const actions = useMenuActions();

  registerPanelIdOnMount({ id: config.id });

  if (state.listId) {
    createFocusTrapEffect({
      containerId: config.id,
      isEnabled: () => state.isPanelOpen,
    });

    focusInitialChildOnMount({
      containerId: config.id,
    });
  }

  createClickAwayEffect({
    containerId: config.id,
    exceptionIds: () => [state.triggerId],
    onClickAway: actions.closePopover,
    isEnabled: () =>
      state.isPanelOpen && document.getElementById(config.id).contains(document.activeElement),
  });
}

export function registerPanelIdOnMount(config: { id: string }) {
  const actions = useMenuActions();
  onMount(() => {
    actions.setElementId('panelId', config.id);
  });
}
