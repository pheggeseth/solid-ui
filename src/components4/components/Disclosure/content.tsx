import { mergeProps, onMount } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { getDataProp, useId } from '~/utils/componentUtils';
import {
  createClickAwayEffect,
  createFocusTrapEffect,
  focusInitialChildOnMount,
} from '../../utils/eventUtils';
import { useDisclosureContext, useDisclosureActions, useDisclosureState } from './context';

export type ContentConfig<ContentElement extends HTMLElement> = {
  idPrefix?: string;
  onKeyUp?: JSX.EventHandler<ContentElement, KeyboardEvent>;
};

export function createContent(config: { idPrefix?: string } = {}) {
  const props = createContentProps(config);
  const handlers = createContentHandlers();

  return {
    props: mergeProps(props, handlers),
    createEffects: () => createContentEffects({ id: props.id }),
    context: useDisclosureContext(),
  };
}

export function createContentProps<ContentElement extends HTMLElement = HTMLElement>(
  config: ContentConfig<ContentElement> = {}
) {
  const { idPrefix = 'solid-ui-disclosure-content' } = config;
  const id = useId(idPrefix);

  const disclosureState = useDisclosureState();

  return {
    ...getDataProp(idPrefix),
    id,
    get role() {
      return disclosureState.role;
    },
    tabIndex: 0,
  };
}

export function createContentHandlers<ContentElement extends HTMLElement = HTMLElement>(
  config: ContentConfig<ContentElement> = {}
) {
  const disclosureActions = useDisclosureActions();

  const onKeyUp: JSX.EventHandler<ContentElement, KeyboardEvent> = (event) => {
    if (event.key === 'Escape') {
      disclosureActions.closeDisclosure();
    }
    config.onKeyUp?.(event);
  };

  return {
    onKeyUp,
  };
}

export function createContentEffects(config: { id: string }) {
  const disclosureState = useDisclosureState();
  const disclosureActions = useDisclosureActions();

  registerContentIdOnMount(config);

  createFocusTrapEffect({
    containerId: config.id,
    isEnabled: () => disclosureState.isContentOpen,
  });

  focusInitialChildOnMount({
    containerId: config.id,
  });

  createClickAwayEffect({
    containerId: config.id,
    exceptionIds: () => [disclosureState.triggerId],
    onClickAway: disclosureActions.closeDisclosure,
    isEnabled: () =>
      disclosureState.isContentOpen &&
      document.getElementById(config.id).contains(document.activeElement),
  });
}

export function registerContentIdOnMount(config: { id: string }) {
  const disclosureActions = useDisclosureActions();

  onMount(() => {
    disclosureActions.setElementId('contentId', config.id);
  });
}
