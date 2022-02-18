import { createContext, useContext } from 'solid-js';

export type PopoverState = {
  isOpen: boolean;
  isOverlayOpen: boolean;
  isPanelOpen: boolean;
  triggerId: string | null;
  overlayId: string | null;
  panelId: string | null;
};

export type PopoverActions = {
  setTriggerReference(element: Element): void;
  setAnchorReference(element: Element): void;
  setPopperReference(element: HTMLElement): void;
  registerTrigger(triggerId: string): void;
  registerOverlay(overlayId: string): void;
  registerPanel(panelId: string): void;
  openPopover(): void;
  closePopover(): void;
  togglePopover(): void;
  openOverlay(): void;
  closeOverlay(): void;
};

export const PopoverContext = createContext<[state: PopoverState, actions: PopoverActions]>();
export function usePopoverContext() {
  return useContext(PopoverContext);
}

export function usePopoverState() {
  return usePopoverContext()[0];
}

export function usePopoverActions() {
  return usePopoverContext()[1];
}
