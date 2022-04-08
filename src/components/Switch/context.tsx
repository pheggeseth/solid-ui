import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

export type SwitchElementIds = {
  descriptionId: string;
  labelId: string;
  switchId: string;
};

export type SwitchState = SwitchElementIds;

export type SwitchActions = Readonly<{
  setElementId(name: keyof SwitchElementIds, id: string): void;
}>;

export type SwitchStore = Readonly<[state: SwitchState, actions: SwitchActions]>;

export function createSwitchStore(): SwitchStore {
  const [state, setState] = createStore<SwitchState>({
    descriptionId: null,
    labelId: null,
    switchId: null,
  });

  const actions: SwitchActions = {
    setElementId(name, id) {
      setState({ [name]: id });
    },
  };

  return [state, actions] as const;
}

export const SwitchStoreContext = createContext<SwitchStore>();
export function useSwitchStore() {
  return useContext(SwitchStoreContext);
}
export function useSwitchState() {
  return useContext(SwitchStoreContext)[0];
}
export function useSwitchActions() {
  return useContext(SwitchStoreContext)[1];
}
