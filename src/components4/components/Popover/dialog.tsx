import { mergeProps, onMount } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { getDataProp, useId } from '~/utils/componentUtils';
import {
  createClickAwayEffect,
  createFocusTrapEffect,
  focusInitialChildOnMount,
} from '../../utils/eventUtils';
import { usePopoverContext, usePopoverActions, usePopoverState } from './context';

export type DialogConfig<DialogElement extends HTMLElement> = {
  idPrefix?: string;
  onKeyUp?: JSX.EventHandler<DialogElement, KeyboardEvent>;
};

export function createDialog(config: { idPrefix?: string } = {}) {
  const props = createDialogProps(config);
  const handlers = createDialogHandlers();

  return {
    props: mergeProps(props, handlers),
    createEffects: () => createDialogEffects({ id: props.id }),
    context: usePopoverContext(),
  };
}



export function createDialogProps<DialogElement extends HTMLElement = HTMLElement>(
  config: DialogConfig<DialogElement> = {}
) {
  const { idPrefix = 'solid-ui-popover-dialog' } = config;
  const id = useId(idPrefix);

  const popoverState = usePopoverState();

  return {
    'data-solid-ui-dialog': '',
    ...getDataProp(idPrefix),
    id,
    get role() {
      return popoverState.role;
    },
    tabIndex: 0,
  };
}

export function createDialogHandlers<DialogElement extends HTMLElement = HTMLElement>(
  config: DialogConfig<DialogElement> = {}
) {
  const popoverActions = usePopoverActions();

  const onKeyUp: JSX.EventHandler<DialogElement, KeyboardEvent> = (event) => {
    if (event.key === 'Escape') {
      popoverActions.closePopover();
    }
    config.onKeyUp?.(event);
  };

  return {
    onKeyUp,
  };
}

export function createDialogEffects(config: { id: string }) {
  const popoverState = usePopoverState();
  const popoverActions = usePopoverActions();

  registerDialogIdOnMount(config);

  createFocusTrapEffect({
    containerId: config.id,
    isEnabled: () => popoverState.isPopoverOpen,
  });

  focusInitialChildOnMount({
    containerId: config.id,
  });

  createClickAwayEffect({
    containerId: config.id,
    exceptionIds: () => [popoverState.triggerId],
    onClickAway: popoverActions.closePopover,
    isEnabled: () =>
      popoverState.isPopoverOpen &&
      document.getElementById(config.id).contains(document.activeElement),
  });
}

export function registerDialogIdOnMount(config: { id: string }) {
  const popoverActions = usePopoverActions();

  onMount(() => {
    popoverActions.setElementId('dialogId', config.id);
  });
}
