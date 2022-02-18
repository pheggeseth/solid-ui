import { createMemo, onMount } from 'solid-js';
import { useId } from '~/componentUtils';
import { useFormActions, useFormControlActions, useFormControlState } from './context';

type Validator<T> = (value: T) => string;

export type ProvidedFieldProps<V> = {
  name: string;
  initialValue: V;
  validators?: Validator<V>[];
};

export function useField<T = HTMLInputElement, V = string>(props: ProvidedFieldProps<V>) {
  const formControlState = useFormControlState();
  const formControlActions = useFormControlActions();

  const id = useId(props.name);
  let ref: T;

  formControlActions.registerFieldId(id);

  const fieldProps = createMemo(() => {
    const descriptorIds = [formControlState.helperTextId];
    if (formControlState.errorMessageId && formControlState.isInvalid) {
      descriptorIds.push(formControlState.errorMessageId);
    }

    return {
      'aria-describedby': descriptorIds.filter((id) => id).join(' ') || undefined,
      'aria-invalid': formControlState.isInvalid || undefined,
      'aria-required': formControlState.isRequired || undefined,
      disabled: formControlState.isDisabled || undefined,
      id,
      name: props.name,
      ref: (el) => {
        ref = el;
      },
    } as const;
  });

  const formActions = useFormActions();

  function validate(value: V) {
    if (props.validators) {
      const errors = props.validators.reduce<string[]>((acc, validator) => {
        const error = validator(value);
        if (error) {
          acc.push(error);
        }

        return acc;
      }, []);

      formControlActions.setErrors(errors);
      formActions?.setFieldErrors(props.name, errors);
    } else if (formControlState.errors.length > 0) {
      formControlActions.setErrors([]);
    }
  }

  function onTouch() {
    formControlActions.setIsTouched(true);
  }

  onMount(() => {
    validate(props.initialValue);
  });

  return { fieldProps, validate, onTouch };
}
