import { JSXElement } from 'solid-js';
import { createControl } from './control';
import { createErrorMessage } from './errorMessage';
import { createField } from './field';
import { createHelperText } from './helperText';
import { createLabel } from './label';
import FormControlProvider, { FormControlProviderProps } from './provider';

export * from './context';
export * from './control';
export * from './errorMessage';
export * from './field';
export * from './helperText';
export * from './label';

export type FormControlComponentType = {
  (props: FormControlProviderProps): JSXElement;
  createControl: typeof createControl;
  createErrorMessage: typeof createErrorMessage;
  createField: typeof createField;
  createHelperText: typeof createHelperText;
  createLabel: typeof createLabel;
};

const FormControlComponent: FormControlComponentType = Object.assign(FormControlProvider, {
  createControl,
  createErrorMessage,
  createField,
  createHelperText,
  createLabel,
});

export default FormControlComponent;
