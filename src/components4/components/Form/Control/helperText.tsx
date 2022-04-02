import { onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useFormControlActions, useFormControlContext } from './context';

export type CreateFormHelperTextConfig = {
  idPrefix?: string;
};

export function createFormHelperText(config: CreateFormHelperTextConfig) {
  const props = createFormHelperTextProps(config);

  return {
    props,
    effects: () => createFormHelperTextEffects({ id: props.id }),
    context: useFormControlContext(),
  } as const;
}

export function createFormHelperTextProps(config: CreateFormHelperTextConfig) {
  const { idPrefix = 'solid-ui-form-helper-text' } = config;
  const id = useId(idPrefix);

  return {
    ...getDataProp(idPrefix),
    id,
  } as const;
}

export function createFormHelperTextEffects(config: { id: string }) {
  registerFormHelperIdOnMount(config);
}

export function registerFormHelperIdOnMount(config: { id: string }) {
  const actions = useFormControlActions();
  onMount(() => {
    actions.setElementId('helperTextId', config.id);
  });
}
