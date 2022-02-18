import { createContext, useContext } from 'solid-js';

export type DisclosureState = {
  buttonId: string | null;
  panelId: string | null;
  isOpen: boolean;
};

export type DisclosureActions = {
  registerButton(buttonId: string): void;
  registerPanel(panelId: string): void;
  toggle: () => void;
};

export const DisclosureContext =
  createContext<[state: DisclosureState, actions: DisclosureActions]>();

export function useDisclosureState() {
  return useContext(DisclosureContext)[0];
}

export function useDisclosureActions() {
  return useContext(DisclosureContext)[1];
}
