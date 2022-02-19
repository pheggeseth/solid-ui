/*
  state
  - labelId
  - fieldId
  - helperTextId
  - errorMessageId
  - isInvalid
  - isDisabled
  - isRequired
  - error
  - isTouched
*/

import { createContext, useContext } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

export type FormState = DeepReadonly<{
  errors: { [fieldName: string]: string[] };
  isInvalid: boolean;
  isSubmitting: boolean;
}>;

export type FormActions = Readonly<{
  setFieldErrors(fieldName: string, fieldErrors: string[]): void;
  submitStart(): void;
  submitEnd(): void;
}>;

export const FormContext = createContext<[state: FormState, actions: FormActions]>();

export function useFormState() {
  return useContext(FormContext)[0];
}

export function useFormActions() {
  return useContext(FormContext)[1];
}

export type FormControlState = DeepReadonly<{
  labelId: string | null;
  fieldId: string | null;
  helperTextId: string | null;
  errorMessageId: string | null;
  isInvalid: boolean;
  isDisabled: boolean;
  isRequired: boolean;
  isTouched: boolean;
  errors: string[];
}>;

export type FormControlActions = {
  registerLabelId(labelId: string): void;
  registerFieldId(fieldId: string): void;
  registerHelperTextId(helperTextId: string): void;
  registerErrorMessageId(errorMessageId: string): void;
  setIsTouched(isTouched: boolean): void;
  setErrors(errors: string[]): void;
};

export const FormControlContext =
  createContext<[state: FormControlState, actions: FormControlActions]>();

export function useFormControlState() {
  return useContext(FormControlContext)[0];
}

export function useFormControlActions() {
  return useContext(FormControlContext)[1];
}
