import { onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useDisclosureActions, useDisclosureContext } from './context';

export type ContentConfig = {
  idPrefix?: string;
};

export function createContent(config: ContentConfig = {}) {
  const props = createContentProps(config);

  return {
    props,
    effects: () => createContentEffects({ id: props.id }),
    context: useDisclosureContext(),
  };
}

export function createContentProps(config: ContentConfig) {
  const { idPrefix = 'solid-ui-disclosure-content' } = config;
  const id = useId(idPrefix);

  return {
    ...getDataProp(idPrefix),
    id,
  } as const;
}

export function createContentEffects(config: { id: string }) {
  registerContentIdOnMount(config);
}

export function registerContentIdOnMount(config: { id: string }) {
  onMount(() => {
    useDisclosureActions().setElementId('contentId', config.id);
  });
}
