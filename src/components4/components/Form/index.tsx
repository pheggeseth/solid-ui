import { JSXElement } from 'solid-js';
import Control from './Control';
import { createForm } from './form';
import FormProvider, { FormProviderProps } from './provider';

export * from './Control';

export type FormComponentType = {
  (props: FormProviderProps): JSXElement;
  Control: typeof Control;
  createForm: typeof createForm;
};

const FormComponent: FormComponentType = Object.assign(FormProvider, {
  Control,
  createForm,
});

export default FormComponent;
