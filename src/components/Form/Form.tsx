import { Accessor, JSX, JSXElement, mergeProps, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import { BaseComponent, BaseComponentProps } from '~/types';
import { FormActions, FormContext, FormState, useFormState } from './context';
import Control from './FormControl';
import ErrorMessage from './FormErrorMessage';
import HelperText from './FormHelperText';
import Label from './FormLabel';
import Submit from './FormSubmit';
import { useField } from './utils';

type FormSubmitHandler = JSX.EventHandler<HTMLFormElement, SubmitEvent>;

export type FormProps = {
  as?: 'form' | BaseComponent<{ onSubmit: FormSubmitHandler }>;
  onSubmit?: (submitEnd: () => void) => void;
};

export const Form: BaseComponent<FormProps> = (props) => {
  props = mergeProps({ as: 'form' }, props);

  const [state, setState] = createStore<FormState>({
    errors: {},
    isInvalid: false,
    isSubmitting: false,
  });

  const actions: FormActions = {
    setFieldErrors(fieldName, fieldErrors) {
      setState('errors', fieldName, fieldErrors);
      setState(
        'isInvalid',
        Object.values(state.errors).some((fieldErrors) => fieldErrors.length > 0)
      );
    },
    submitStart() {
      console.log('submitting');
      setState({ isSubmitting: true });
    },
    submitEnd() {
      console.log('done submitting');
      setState({ isSubmitting: false });
    },
  };

  const handleSubmit: FormSubmitHandler = (event) => {
    event.preventDefault();

    if (state.isInvalid) {
      return;
    }

    actions.submitStart();
    props.onSubmit(actions.submitEnd);
  };

  const [localProps, otherProps] = splitProps(props, ['as']);

  return (
    <FormContext.Provider value={[state, actions]}>
      <Dynamic {...otherProps} component={localProps.as} onSubmit={handleSubmit} />
    </FormContext.Provider>
  );
};

export type FormComponentType = {
  (props: BaseComponentProps<FormProps>): JSXElement;
  Control: typeof Control;
  Label: typeof Label;
  HelperText: typeof HelperText;
  ErrorMessage: typeof ErrorMessage;
  useField: typeof useField;
  Submit: typeof Submit;
  state: {
    isInvalid: Accessor<boolean>;
    isSubmitting: Accessor<boolean>;
    errors: Accessor<FormState['errors']>;
  };
};

const FormComponent: FormComponentType = Object.assign(Form, {
  Control,
  Label,
  HelperText,
  ErrorMessage,
  useField,
  Submit,
  state: {
    isInvalid() {
      return useFormState()?.isInvalid || false;
    },
    isSubmitting() {
      return useFormState()?.isSubmitting || false;
    },
    errors() {
      return useFormState()?.errors || null;
    },
  },
});

export default FormComponent;
