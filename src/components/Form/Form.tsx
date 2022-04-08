import { JSX } from 'solid-js';
import { useFormActions, useFormSelectors } from './context';

export type CreateFormConfig = {
  onSubmit?: (event: SubmitEvent, onSubmitEnd: () => void) => void;
};

export function createForm(config: CreateFormConfig = {}) {
  const handlers = createFormHandlers(config);

  return {
    props: handlers,
  } as const;
}

export function createFormHandlers(config: CreateFormConfig) {
  const selectors = useFormSelectors();
  const actions = useFormActions();

  const onSubmit: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent> = (event) => {
    if (selectors.isInvalid()) {
      return;
    }

    actions.startSubmit();
    config.onSubmit?.(event, actions.endSubmit);
  };

  return {
    onSubmit,
  };
}
