import { onCleanup, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { usePopoverContext, usePopoverActions } from './context';

export function createOverlay(config: { idPrefix?: string } = {}) {
  const props = createOverlayProps(config);

  return {
    props,
    effects: () => createOverlayEffects({ id: props.id }),
    context: usePopoverContext(),
  };
}

export function createOverlayProps(config: { idPrefix?: string } = {}) {
  const { idPrefix = 'solid-ui-popover-overlay' } = config;
  const id = useId(idPrefix);

  return {
    'data-solid-ui-overlay': '',
    ...getDataProp(idPrefix),
    id,
    ref() {},
  };
}

export function registerOverlayIdOnMount(config: { id: string }) {
  const popoverActions = usePopoverActions();
  onMount(() => popoverActions.setElementId('overlayId', config.id));
}

export function trackIsOverlayMounted() {
  const popoverActions = usePopoverActions();
  onMount(popoverActions.onOverlayMount);
  onCleanup(popoverActions.onOverlayCleanup);
}

export function createOverlayEffects(config: { id: string }) {
  registerOverlayIdOnMount(config);
  trackIsOverlayMounted();
}
