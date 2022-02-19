import { splitProps } from 'solid-js';
import { Dynamic, mergeProps } from 'solid-js/web';
import { BaseComponent } from '~/types';
import { useFormState } from './context';

export type FormSubmitProps = {
  as?: 'button' | BaseComponent<{ type: 'submit'; disabled: boolean }>;
  disabled?: boolean;
};

export const FormSubmit: BaseComponent<FormSubmitProps> = (props) => {
  props = mergeProps({ as: 'button' }, props);

  const formState = useFormState();

  const [localProps, otherProps] = splitProps(props, ['as', 'disabled']);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      type="submit"
      disabled={localProps.disabled || formState.isInvalid}
    />
  );
};

export default FormSubmit;
