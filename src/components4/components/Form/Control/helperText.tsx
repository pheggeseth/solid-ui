import { onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useFormControlActions, useFormControlContext } from './context';

export type CreateHelperTextConfig = {
  idPrefix?: string;
};

export function createHelperText(config: CreateHelperTextConfig = {}) {
  const props = createHelperTextProps(config);

  return {
    props,
    effects: () => createHelperTextEffects({ id: props.id }),
    context: useFormControlContext(),
  } as const;
}

export function createHelperTextProps(config: CreateHelperTextConfig) {
  const { idPrefix = 'solid-ui-form-helper-text' } = config;
  const id = useId(idPrefix);

  return {
    ...getDataProp(idPrefix),
    id,
  } as const;
}

export function createHelperTextEffects(config: { id: string }) {
  registerHelperTextIdOnMount(config);
}

export function registerHelperTextIdOnMount(config: { id: string }) {
  const actions = useFormControlActions();
  onMount(() => {
    actions.setElementId('helperTextId', config.id);
  });
}
