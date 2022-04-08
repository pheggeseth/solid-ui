import { Accessor, createContext, createMemo, useContext } from 'solid-js';
import { createStore, DeepReadonly } from 'solid-js/store';

export type FormState = {
  errors: { [fieldName: string]: string[] };
  isSubmitting: boolean;
};

export type FormActions = Readonly<{
  setFieldErrors(fieldName: string, fieldErrors: string[]): void;
  startSubmit(): void;
  endSubmit(): void;
}>;

export type FormSelectors = Readonly<{
  isInvalid: Accessor<boolean>;
}>;

export type FormStore = Readonly<
  [state: FormState, actions: FormActions, selectors: FormSelectors]
>;

export function createFormStore(): FormStore {
  const [state, setState] = createStore<FormState>({
    errors: {},
    isSubmitting: false,
  });

  const actions: FormActions = {
    setFieldErrors(fieldName, fieldErrors) {
      setState('errors', fieldName, fieldErrors);
    },
    startSubmit() {
      setState({ isSubmitting: true });
    },
    endSubmit() {
      setState({ isSubmitting: false });
    },
  };

  const selectors: FormSelectors = {
    isInvalid: createMemo(() =>
      Object.values(state.errors).some((fieldErrors) => fieldErrors.length > 0)
    ),
  };

  return [state as FormState, actions, selectors] as const;
}

export const FormStoreContext = createContext<FormStore>();
export function useFormStore() {
  return useContext(FormStoreContext);
}
export function useFormState() {
  return useFormStore()[0];
}
export function useFormActions() {
  return useFormStore()[1];
}
export function useFormSelectors() {
  return useFormStore()[2];
}

export type FormContext = Readonly<{
  errors: Accessor<FormState['errors']>;
  isInvalid: Accessor<boolean>;
  isSubmitting: Accessor<boolean>;
}>;

export function useFormContext(): FormContext {
  const state = useFormState();
  const selectors = useFormSelectors();

  return {
    errors: () => state.errors,
    isInvalid: selectors.isInvalid,
    isSubmitting: () => state.isSubmitting,
  };
}

export type FormContextProp = {
  context?: (ctx: FormContext) => void;
};
