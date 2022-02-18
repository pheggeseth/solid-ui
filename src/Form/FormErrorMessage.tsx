import { createEffect, createMemo, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponent } from '~/types';
import { useFormControlActions, useFormControlState } from './context';

export type FormErrorMessageProps = {
  as?: string | BaseComponent<{ id: string }>;
};

export const FormErrorMessage: BaseComponent<FormErrorMessageProps> = (props) => {
  props = mergeProps({ as: 'div' }, props);

  const state = useFormControlState();
  const actions = useFormControlActions();

  const id = createMemo(() => `${state.fieldId}-errorMessage`);

  createEffect(() => {
    actions.registerErrorMessageId(id());
  });

  const [localProps, otherProps] = splitProps(props, ['as']);

  return <Dynamic {...otherProps} component={localProps.as} id={id()} />;
};

export default FormErrorMessage;
