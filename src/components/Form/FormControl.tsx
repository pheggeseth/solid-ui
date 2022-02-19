import { Accessor, createEffect, JSXElement, mergeProps, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import { BaseComponent, BaseComponentProps } from '~/types';
import {
  FormControlActions,
  FormControlContext,
  FormControlState,
  useFormControlState,
} from './context';

export type FormControlProps = {
  as?: string | BaseComponent<{ role: 'group' }>;
  id?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isTouched?: boolean;
};

export const FormControl: BaseComponent<FormControlProps> = (props) => {
  props = mergeProps({ as: 'div' }, props);

  const [state, setState] = createStore<FormControlState>({
    labelId: null,
    fieldId: props.id ?? null,
    helperTextId: null,
    errorMessageId: null,
    isInvalid: props.isInvalid || false,
    isDisabled: props.isDisabled || false,
    isRequired: props.isRequired || false,
    isTouched: props.isTouched || false,
    errors: null,
  });

  const actions: FormControlActions = {
    registerLabelId(labelId) {
      setState({ labelId });
    },
    registerFieldId(fieldId) {
      props.id ?? setState({ fieldId });
    },
    registerHelperTextId(helperTextId) {
      setState({ helperTextId });
    },
    registerErrorMessageId(errorMessageId) {
      setState({ errorMessageId });
    },
    setIsTouched(isTouched) {
      props.isTouched ?? setState({ isTouched });
    },
    setErrors(errors) {
      setState({ errors, isInvalid: props.isInvalid ?? Boolean(errors?.length > 0) });
    },
  };

  createEffect(() => {
    setState({
      isInvalid: props.isInvalid,
      isDisabled: props.isDisabled,
      isRequired: props.isRequired,
      isTouched: props.isTouched,
    });
  });

  const [localProps, otherProps] = splitProps(props, [
    'as',
    'isDisabled',
    'isInvalid',
    'isRequired',
    'isTouched',
  ]);

  return (
    <FormControlContext.Provider value={[state, actions]}>
      <Dynamic {...otherProps} component={localProps.as} role="group" />
    </FormControlContext.Provider>
  );
};

export type FormControlComponentType = {
  (props: BaseComponentProps<FormControlProps>): JSXElement;
  state: {
    isTouched: Accessor<boolean>;
    isInvalid: Accessor<boolean>;
    errors: Accessor<readonly string[] | null>;
  };
};

const FormControlComponent: FormControlComponentType = Object.assign(FormControl, {
  state: {
    isTouched() {
      return useFormControlState()?.isTouched || false;
    },
    isInvalid() {
      return useFormControlState()?.isInvalid || false;
    },
    errors() {
      return useFormControlState()?.errors || null;
    },
  },
});

export default FormControlComponent;
