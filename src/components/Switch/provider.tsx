import { PropsWithChildren } from 'solid-js';
import { createSwitchStore, SwitchStoreContext } from './context';

export type SwitchProviderProps = PropsWithChildren;

export function SwitchProvider(props: SwitchProviderProps) {
  const store = createSwitchStore();

  return <SwitchStoreContext.Provider value={store}>{props.children}</SwitchStoreContext.Provider>;
}
