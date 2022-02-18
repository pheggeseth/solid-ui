import { createContext, useContext } from 'solid-js';

export type SwitchState = {
  switchId: string | null;
  labelId: string | null;
  descriptionId: string | null;
};

export type SwitchActions = {
  registerSwitchId: (switchId: string) => void;
  registerLabelId: (labelId: string) => void;
  registerDescriptionId: (descriptionId: string) => void;
};

export const SwitchContext = createContext<[state: SwitchState, actions: SwitchActions]>();

export function useSwitchContext() {
  return useContext(SwitchContext);
}

export function useSwitchState() {
  return useSwitchContext()?.[0];
}

export function useSwitchActions() {
  return useSwitchContext()?.[1];
}
