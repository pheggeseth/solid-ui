import { Component, createMemo, JSXElement, PropsWithChildren } from 'solid-js';
import { createStore } from 'solid-js/store';
import { usePopper } from '~/utils/popperUtils';
import {
  PopoverActions,
  PopoverContext,
  PopoverState,
  usePopoverActions,
  usePopoverState,
} from './context';
import Overlay from './Overlay';
import Panel from './Panel';
import Trigger from './Trigger';

export const PopoverProvider: Component = (props) => {
  const [state, setState] = createStore<PopoverState>({
    isOpen: false,
    isOverlayOpen: false,
    get isPanelOpen(): boolean {
      return isPanelOpen();
    },
    triggerId: null,
    overlayId: null,
    panelId: null,
  });

  const isPanelOpen = createMemo(() => state.isOpen && (!state.overlayId || state.isOverlayOpen));

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

  return (
    <PopoverContext.Provider value={[state, actions]}>
      {props.children}
    </PopoverContext.Provider>
  );
};

export function AnchorRef(element: HTMLElement) {
  const actions = usePopoverActions();
  actions.setAnchorReference(element);
}

type PopoverComponent = {
  (props: PropsWithChildren): JSXElement;
  close(): void;
  state: {
    isOpen: boolean;
  };
  Trigger: typeof Trigger;
  AnchorRef: typeof AnchorRef;
  Overlay: typeof Overlay;
  Panel: typeof Panel;
};

export const Popover: PopoverComponent = Object.assign(PopoverProvider, {
  close() {
    usePopoverActions().closePopover();
  },
  state: {
    get isOpen() {
      const state = usePopoverState();
      return state.isOpen;
    },
  },
  Trigger,
  AnchorRef,
  Overlay,
  Panel,
});

export default Popover;
