import { PropsWithChildren } from 'solid-js';
import {
  createFormControlStore,
  CreateFormControlStoreConfig,
  FormControlContextProp,
  FormControlStoreContext,
  useFormControlContext,
} from './context';

export type FormControlProviderProps = PropsWithChildren<
  FormControlContextProp & CreateFormControlStoreConfig
>;

export default function FormControlProvider(props: FormControlProviderProps) {
  const store = createFormControlStore(props);

  return (
    <FormControlStoreContext.Provider value={store}>
      {(() => {
        props.context?.(useFormControlContext());
        return props.children;
      })()}
    </FormControlStoreContext.Provider>
  );
}
