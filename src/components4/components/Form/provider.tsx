import { PropsWithChildren } from 'solid-js';
import { createFormStore, FormContextProp, FormStoreContext, useFormContext } from './context';

export type FormProviderProps = PropsWithChildren<FormContextProp>;

export default function FormProvider(props: FormProviderProps) {
  const store = createFormStore();

  return (
    <FormStoreContext.Provider value={store}>
      {(() => {
        props.context?.(useFormContext());
        return props.children;
      })()}
    </FormStoreContext.Provider>
  );
}
