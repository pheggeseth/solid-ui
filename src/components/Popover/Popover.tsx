import { Component, createMemo, JSXElement, PropsWithChildren } from 'solid-js';
import { createStore } from 'solid-js/store';
import { usePopper } from '~/utils/popperUtils';
import {
  Context,
  PopoverActions,
  PopoverComponentContext,
  PopoverExternalContext,
  PopoverState,
  usePopoverActions,
} from './context';
import Overlay from './Overlay';
import Panel from './Panel';
import Trigger from './Trigger';

type PopoverProviderProps = {
  context?: (context: PopoverExternalContext) => void;
};

export const PopoverProvider: Component<PopoverProviderProps> = (props) => {
  const [state, setState] = createStore<PopoverState>({
    isOpen: false,
    isOverlayOpen: false,
    get isPanelOpen(): boolean {
      return state.isOpen && (!state.overlayId || state.isOverlayOpen);
    },
    triggerId: null,
    overlayId: null,
    panelId: null,
  });

  const { setTriggerReference, setAnchorReference, setPopperReference } = usePopper();

  const actions: PopoverActions = {
    setTriggerReference,
    setAnchorReference,
    setPopperReference,
    registerTrigger(triggerId) {
      setState('triggerId', triggerId);
    },
    registerOverlay(overlayId) {
      setState('overlayId', overlayId);
    },
    registerPanel(panelId) {
      setState('panelId', panelId);
    },
    openPopover() {
      setState({ isOpen: true });
    },
    closePopover() {
      setState({ isOpen: false });
    },
    togglePopover() {
      setState('isOpen', (isOpen) => !isOpen);
    },
    openOverlay() {
      setState('isOverlayOpen', true);
    },
    closeOverlay() {
      setState('isOverlayOpen', false);
    },
  };

  const contextMemo = createMemo(() => ({
    isOpen: state.isOpen,
    close: actions.closePopover,
  }));

  props.context?.(contextMemo);

  return (
    <PopoverComponentContext.Provider value={[state, actions]}>
      {props.children}
    </PopoverComponentContext.Provider>
  );
};

export function AnchorRef(element: HTMLElement) {
  const actions = usePopoverActions();
  actions.setAnchorReference(element);
}

type PopoverComponent = {
  (props: PropsWithChildren<PopoverProviderProps>): JSXElement;
  Context: typeof Context;
  Trigger: typeof Trigger;
  AnchorRef: typeof AnchorRef;
  Overlay: typeof Overlay;
  Panel: typeof Panel;
};

export const Popover: PopoverComponent = Object.assign(PopoverProvider, {
  Context,
  Trigger,
  AnchorRef,
  Overlay,
  Panel,
});

export default Popover;
