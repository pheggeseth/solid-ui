import { Accessor, createContext, createMemo, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

export type FormControlElementIds = {
  labelId: string;
  fieldId: string;
  helperTextId: string;
  errorMessageId: string;
};

export type FormControlState = Readonly<
  FormControlElementIds & {
    errors: string[];
    isTouched: boolean;
  }
>;

export type FormControlActions = Readonly<{
  setElementId(name: keyof FormControlElementIds, id: string): void;
  setIsTouched(isTouched: boolean): void;
  setErrors(errors: string[]): void;
}>;

export type FormControlSelectors = Readonly<{
  fieldId: Accessor<string>;
  isDisabled: Accessor<boolean>;
  isInvalid: Accessor<boolean>;
  isRequired: Accessor<boolean>;
  isTouched: Accessor<boolean>;
}>;

export type FormControlStore = Readonly<
  [state: FormControlState, actions: FormControlActions, selectors: FormControlSelectors]
>;

export type CreateFormControlStoreConfig = {
  id?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  isTouched?: boolean;
};

export function createFormControlStore(
  config: CreateFormControlStoreConfig = {}
): FormControlStore {
  const [state, setState] = createStore<FormControlState>({
    labelId: null,
    fieldId: null,
    helperTextId: null,
    errorMessageId: null,
    errors: [],
    isTouched: false,
  });

  const actions: FormControlActions = {
    setElementId(name, id) {
      setState({ [name]: id });
    },
    setIsTouched(isTouched) {
      setState('isTouched', isTouched);
    },
    setErrors(errors) {
      setState('errors', errors);
    },
  };

  const selectors: FormControlSelectors = {
    fieldId: createMemo(() => config.id ?? state.fieldId),
    isDisabled: () => config.isDisabled,
    isInvalid: createMemo(() => config.isInvalid ?? Boolean(state.errors.length > 0)),
    isRequired: () => config.isRequired,
    isTouched: createMemo(() => config.isTouched ?? state.isTouched),
  };

  return [state as FormControlState, actions, selectors] as const;
}

export const FormControlStoreContext = createContext<FormControlStore>();
export function useFormControlStore() {
  return useContext(FormControlStoreContext);
}
export function useFormControlState() {
  return useContext(FormControlStoreContext)[0];
}
export function useFormControlActions() {
  return useContext(FormControlStoreContext)[1];
}
export function useFormControlSelectors() {
  return useContext(FormControlStoreContext)[2];
}

export type FormControlContext = Readonly<{
  errors: Accessor<string[]>;
  isInvalid: Accessor<boolean>;
  isTouched: Accessor<boolean>;
}>;

export function useFormControlContext(): FormControlContext {
  const state = useFormControlState();
  const selectors = useFormControlSelectors();

  return {
    errors: () => state.errors,
    isInvalid: selectors.isInvalid,
    isTouched: () => state.isTouched,
  };
}

export type FormControlContextProp = {
  context?: (ctx: FormControlContext) => void;
};
