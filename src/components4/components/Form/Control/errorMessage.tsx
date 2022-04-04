import { onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useFormControlActions, useFormControlContext } from './context';

export type CreateFormControlErrorMessageConfig = {
  idPrefix?: string;
};

export function createErrorMessage(config: CreateFormControlErrorMessageConfig = {}) {
  const props = createErrorMessageProps(config);

  return {
    props,
    effects: () => createErrorMessageEffects({ id: props.id }),
    context: useFormControlContext(),
  } as const;
}

export function createErrorMessageProps(config: CreateFormControlErrorMessageConfig = {}) {
  const { idPrefix = 'solid-ui-form-error-message' } = config;
  const id = useId(idPrefix);

  return {
    ...getDataProp(idPrefix),
    id,
  } as const;
}

export function createErrorMessageEffects(config: { id: string }) {
  registerErrorMessageIdOnMount(config);
}

export function registerErrorMessageIdOnMount(config: { id: string }) {
  const actions = useFormControlActions();
  onMount(() => {
    actions.setElementId('errorMessageId', config.id);
  });
}
