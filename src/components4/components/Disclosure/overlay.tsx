import { onCleanup, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useDisclosureContext, useDisclosureActions } from './context';

export function createOverlay(config: { idPrefix?: string } = {}) {
  const props = createOverlayProps(config);

  return {
    props,
    createEffects: () => createOverlayEffects({ id: props.id }),
    context: useDisclosureContext(),
  };
}

export function createOverlayProps(config: { idPrefix?: string } = {}) {
  const { idPrefix = 'solid-ui-disclosure-overlay' } = config;
  const id = useId(idPrefix);

  return {
    'data-solid-ui-overlay': '',
    ...getDataProp(idPrefix),
    id,
    ref() {},
  };
}

export function registerOverlayIdOnMount(config: { id: string }) {
  const disclosureActions = useDisclosureActions();
  onMount(() => disclosureActions.setElementId('overlayId', config.id));
}

export function trackIsOverlayMounted() {
  const disclosureActions = useDisclosureActions();
  onMount(disclosureActions.onOverlayMount);
  onCleanup(disclosureActions.onOverlayCleanup);
}

export function createOverlayEffects(config: { id: string }) {
  registerOverlayIdOnMount(config);
  trackIsOverlayMounted();
}
