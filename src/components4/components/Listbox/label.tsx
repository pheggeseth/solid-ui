import { onMount } from 'solid-js';
import { useId } from '~/utils/componentUtils';
import { useListboxActions, useListboxContext } from './context';

export type CreateLabelConfig = {
  idPrefix?: string;
};

export function createLabel(config: CreateLabelConfig = {}) {
  const props = createLabelProps(config);

  return {
    props,
    effects: () => createLabelEffects({ id: props.id }),
    context: useListboxContext(),
  } as const;
}

export function createLabelProps(config: CreateLabelConfig = {}) {
  const { idPrefix = 'solid-ui-listbox-label' } = config;
  const id = useId(idPrefix);

  return { id };
}

export function createLabelEffects(config: { id: string }) {
  registerLabelIdOnMount(config);
}

export function registerLabelIdOnMount(config: { id: string }) {
  const actions = useListboxActions();
  onMount(() => {
    actions.setElementId('labelId', config.id);
  });
}
