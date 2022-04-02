import { onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useFormControlActions, useFormControlContext } from './context';

export type CreateFormErrorMessageConfig = {
  idPrefix?: string;
};

export function createFormErrorMessage(config: CreateFormErrorMessageConfig) {
  const props = createFormErrorMessageProps(config);

  return {
    props,
    effects: () => createFormErrorMessageEffects({ id: props.id }),
    context: useFormControlContext(),
  } as const;
}

export function createFormErrorMessageProps(config: CreateFormErrorMessageConfig) {
  const { idPrefix = 'solid-ui-form-error-message' } = config;
  const id = useId(idPrefix);

  return {
    ...getDataProp(idPrefix),
    id,
  } as const;
}

export function createFormErrorMessageEffects(config: { id: string }) {
  registerErrorMessageIdOnMount(config);
}

export function registerErrorMessageIdOnMount(config: { id: string }) {
  const actions = useFormControlActions();
  onMount(() => {
    actions.setElementId('errorMessageId', config.id);
  });
}
