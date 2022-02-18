import { createEffect, createMemo, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponent } from '~/types';
import { useFormControlActions, useFormControlState } from './context';

export type FormLabelProps = {
  as?: string | BaseComponent<{ id: string; for: string }>;
};

export const FormLabel: BaseComponent<FormLabelProps> = (props) => {
  props = mergeProps({ as: 'label' }, props);

  const state = useFormControlState();
  const actions = useFormControlActions();

  const id = createMemo(() => `${state.fieldId}-label`);

  createEffect(() => {
    actions.registerLabelId(id());
  });

  const [localProps, otherProps] = splitProps(props, ['as']);

  return <Dynamic {...otherProps} component={localProps.as} id={id()} for={state.fieldId} />;
};

export default FormLabel;
