import { onCleanup, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useFormActions } from '../context';
import {
  useFormControlActions,
  useFormControlContext,
  useFormControlSelectors,
  useFormControlState,
} from './context';

type Validator<T> = (value: T) => string;

export type CreateFieldConfig<Value = any> = {
  idPrefix?: string;
  name: string;
  initialValue: Value;
  validators?: Validator<Value>[];
};

export function createField<Value = any>(config: CreateFieldConfig<Value>) {
  const state = useFormControlState();
  const actions = useFormControlActions();
  const formActions = useFormActions();

  const props = createFieldProps(config);

  function validate(value: Value) {
    if (config.validators) {
      const errors = config.validators.reduce((acc, validator) => {
        const error = validator(value);
        if (error) {
          acc.push(error);
        }

        return acc;
      }, [] as string[]);

      actions.setErrors(errors);
      formActions?.setFieldErrors(config.name, errors);
    } else if (state.errors.length > 0) {
      actions.setErrors([]);
    }
  }

  function touch() {
    actions.setIsTouched(true);
  }

  return {
    props,
    effects: () =>
      createFieldEffects({ id: props.id, validate, initialValue: config.initialValue }),
    context: useFormControlContext(),
    validate,
    touch,
  } as const;
}

export function createFieldProps<Value>(config: CreateFieldConfig<Value>) {
  const { idPrefix = 'solid-ui-form-control-field' } = config;
  const id = useId(idPrefix);
  const state = useFormControlState();
  const selectors = useFormControlSelectors();

  return {
    get ['aria-describedby']() {
      return (
        [state.helperTextId, selectors.isInvalid() && state.errorMessageId]
          .filter(Boolean)
          .join(' ') || undefined
      );
    },
    get ['aria-invalid']() {
      return selectors.isInvalid() || undefined;
    },
    get ['aria-labelledby']() {
      return state.labelId;
    },
    get ['aria-required']() {
      return selectors.isRequired() || undefined;
    },
    ...getDataProp(idPrefix),
    get disabled() {
      return selectors.isDisabled() || undefined;
    },
    id,
    get name() {
      return config.name;
    },
  } as const;
}

export function createFieldEffects<Value = any>(config: {
  id: string;
  validate: (value: Value) => void;
  initialValue: Value;
}) {
  registerFieldIdOnMount(config);
  validateFieldOnMount(config);
  trackFieldFocus(config);
}

export function registerFieldIdOnMount(config: { id: string }) {
  const actions = useFormControlActions();
  onMount(() => {
    actions.setElementId('fieldId', config.id);
  });
}

export function validateFieldOnMount<Value = any>(config: {
  validate: (value: Value) => void;
  initialValue: Value;
}) {
  onMount(() => {
    config.validate(config.initialValue);
  });
}

export function trackFieldFocus(config: { id: string }) {
  const state = useFormControlState();
  const actions = useFormControlActions();

  function trackFocus() {
    if (document.activeElement.id === config.id && !state.hasFocus) {
      actions.setHasFocus(true);
    }
  }

  function trackBlur() {
    if (state.hasFocus) {
      actions.setHasFocus(false);
    }
  }

  onMount(() => {
    document.addEventListener('focusin', trackFocus);
    document.addEventListener('focusout', trackBlur);
  });

  onCleanup(() => {
    document.removeEventListener('focusin', trackFocus);
    document.removeEventListener('focusout', trackBlur);
  });
}
