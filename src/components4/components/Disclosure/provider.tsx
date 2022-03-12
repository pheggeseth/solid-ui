import { PropsWithChildren } from 'solid-js';
import {
  createDisclosureStore,
  DisclosureContextProp,
  DisclosureRole,
  DisclosureStore,
  DisclosureStoreContext,
  useDisclosureContext,
} from './context';

export type DisclosureProviderProps = PropsWithChildren<
  DisclosureContextProp & {
    role?: DisclosureRole;
  }
>;

export default function DisclosureProvider(props: DisclosureProviderProps) {
  const store = createDisclosureStore({ role: () => props.role });

  return (
    <DisclosureStoreContext.Provider value={store as DisclosureStore}>
      {(() => {
        props.context?.(useDisclosureContext());
        return props.children;
      })()}
    </DisclosureStoreContext.Provider>
  );
}
