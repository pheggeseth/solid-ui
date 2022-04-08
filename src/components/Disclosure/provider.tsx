import { PropsWithChildren } from 'solid-js';
import {
  createDisclosureStore,
  DisclosureContextProp,
  DisclosureStore,
  DisclosureStoreContext,
  useDisclosureContext,
} from './context';

export type DisclosureProviderProps = PropsWithChildren<DisclosureContextProp>;

export default function DisclosureProvider(props: DisclosureProviderProps) {
  const store = createDisclosureStore();

  return (
    <DisclosureStoreContext.Provider value={store as DisclosureStore}>
      {(() => {
        props.context?.(useDisclosureContext());
        return props.children;
      })()}
    </DisclosureStoreContext.Provider>
  );
}
