import { createEffect, createMemo, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponent } from '~/types';
import { useFormControlActions, useFormControlState } from './context';

export type FormHelperTextProps = {
  as?: string | BaseComponent<{ id: string }>;
};

export const FormHelperText: BaseComponent<FormHelperTextProps> = (props) => {
  props = mergeProps({ as: 'div' }, props);

  const state = useFormControlState();
  const actions = useFormControlActions();

  const id = createMemo(() => `${state.fieldId}-helperText`);

  createEffect(() => {
    actions.registerHelperTextId(id());
  });

  const [localProps, otherProps] = splitProps(props, ['as']);

  return <Dynamic {...otherProps} component={localProps.as} id={id()} />;
};

export default FormHelperText;
