import { JSXElement } from 'solid-js';
import Control from './Control';
import { createForm } from './form';
import FormProvider, { FormProviderProps } from './provider';
import { createSubmit } from './submit';

export * from './Control';
export * from './context';
export * from './form';
export * from './provider';
export * from './submit';

export type FormComponentType = {
  (props: FormProviderProps): JSXElement;
  Control: typeof Control;
  createForm: typeof createForm;
  createSubmit: typeof createSubmit;
};

const FormComponent: FormComponentType = Object.assign(FormProvider, {
  Control,
  createForm,
  createSubmit,
});

export default FormComponent;
