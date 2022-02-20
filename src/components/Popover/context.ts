import { Accessor, createContext, createMemo, untrack, useContext } from 'solid-js';
import { ExternalContextComponent } from '~/utils/contextUtils';

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

export const PopoverComponentContext =
  createContext<[state: PopoverState, actions: PopoverActions]>();
export function usePopoverComponentContext() {
  return useContext(PopoverComponentContext);
}

export function usePopoverState() {
  return usePopoverComponentContext()[0];
}

export function usePopoverActions() {
  return usePopoverComponentContext()[1];
}

export type PopoverExternalContext = Accessor<{ isOpen: boolean; close(): void }>;

export const Context: ExternalContextComponent<PopoverExternalContext> = (props) => {
  const state = usePopoverState();
  const actions = usePopoverActions();

  const context = createMemo(() => ({
    isOpen: state.isOpen,
    close: actions.closePopover,
  }));

  return untrack(() => props.children(context));
};
