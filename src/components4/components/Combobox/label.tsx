import { onMount } from 'solid-js';
import { useId } from '~/utils/componentUtils';
import { useComboboxActions, useComboboxContext } from './context';

export type CreateLabelConfig = {
  idPrefix?: string;
};

export function createLabel(config: CreateLabelConfig = {}) {
  const props = createLabelProps(config);

  return {
    props,
    effects: () => createLabelEffects({ id: props.id }),
    context: useComboboxContext(),
  } as const;
}

export function createLabelProps(config: CreateLabelConfig = {}) {
  const { idPrefix = 'solid-ui-combobox-label' } = config;
  const id = useId(idPrefix);

  return { id };
}

export function createLabelEffects(config: { id: string }) {
  registerLabelIdOnMount(config);
}

export function registerLabelIdOnMount(config: { id: string }) {
  const actions = useComboboxActions();
  onMount(() => {
    actions.setElementId('labelId', config.id);
  });
}
