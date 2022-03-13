import { mergeProps, onMount } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { getDataProp, useId } from '~/utils/componentUtils';
import {
  createClickAwayEffect,
  createFocusTrapEffect,
  focusInitialChildOnMount,
} from '../../utils/eventUtils';
import { usePopoverContext, usePopoverActions, usePopoverState } from './context';

export type PanelConfig<PanelElement extends HTMLElement> = {
  idPrefix?: string;
  onKeyUp?: JSX.EventHandler<PanelElement, KeyboardEvent>;
};

export function createPanel(config: { idPrefix?: string } = {}) {
  const props = createPanelProps(config);
  const handlers = createPanelHandlers();

  return {
    props: mergeProps(props, handlers),
    effects: () => createPanelEffects({ id: props.id }),
    context: usePopoverContext(),
  };
}

export function createPanelProps<PanelElement extends HTMLElement = HTMLElement>(
  config: PanelConfig<PanelElement> = {}
) {
  const { idPrefix = 'solid-ui-popover-panel' } = config;
  const id = useId(idPrefix);

  const popoverState = usePopoverState();

  return {
    ...getDataProp(idPrefix),
    id,
    get role() {
      return popoverState.role;
    },
    tabIndex: 0,
  };
}

export function createPanelHandlers<PanelElement extends HTMLElement = HTMLElement>(
  config: PanelConfig<PanelElement> = {}
) {
  const popoverActions = usePopoverActions();

  const onKeyUp: JSX.EventHandler<PanelElement, KeyboardEvent> = (event) => {
    if (event.key === 'Escape') {
      popoverActions.closePopover();
    }
    config.onKeyUp?.(event);
  };

  return {
    onKeyUp,
  };
}

export function createPanelEffects(config: { id: string }) {
  const popoverState = usePopoverState();
  const popoverActions = usePopoverActions();

  registerPanelIdOnMount(config);

  createFocusTrapEffect({
    containerId: config.id,
    isEnabled: () => popoverState.isPanelOpen,
  });

  focusInitialChildOnMount({
    containerId: config.id,
  });

  createClickAwayEffect({
    containerId: config.id,
    exceptionIds: () => [popoverState.triggerId],
    onClickAway: popoverActions.closePopover,
    isEnabled: () =>
      popoverState.isPanelOpen &&
      document.getElementById(config.id).contains(document.activeElement),
  });
}

export function registerPanelIdOnMount(config: { id: string }) {
  const popoverActions = usePopoverActions();

  onMount(() => {
    popoverActions.setElementId('panelId', config.id);
  });
}
