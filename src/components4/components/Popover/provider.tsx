import { PropsWithChildren } from 'solid-js';
import {
  createPopoverStore,
  PopoverContextProp,
  PopoverRole,
  PopoverStore,
  PopoverStoreContext,
  usePopoverContext,
} from './context';

export type PopoverProviderProps = PropsWithChildren<
  PopoverContextProp & {
    role?: PopoverRole;
  }
>;

export default function PopoverProvider(props: PopoverProviderProps) {
  const store = createPopoverStore({ role: () => props.role });

  return (
    <PopoverStoreContext.Provider value={store as PopoverStore}>
      {(() => {
        props.context?.(usePopoverContext());
        return props.children;
      })()}
    </PopoverStoreContext.Provider>
  );
}
