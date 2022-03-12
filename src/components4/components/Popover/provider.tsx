import { Accessor, PropsWithChildren } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  usePopoverContext,
  PopoverActions,
  PopoverStoreContext,
  PopoverContextProp,
  PopoverRole,
  PopoverState,
  createPopoverStore,
  PopoverStore,
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
