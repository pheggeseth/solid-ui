import { Accessor, Component, createMemo, JSXElement, PropsWithChildren } from 'solid-js';
import { createStore, DeepReadonly } from 'solid-js/store';
import { usePopper } from '~/utils/portalUtils';
import {
  PopoverActions,
  PopoverComponentContext,
  PopoverState,
  usePopoverActions,
} from './context';
import Overlay from './Overlay';
import Panel from './Panel';
import Trigger from './Trigger';

export type PopoverContext = DeepReadonly<{ isOpen: Accessor<boolean>; close(): void }>;

type PopoverProviderProps = {
  context?: (context: PopoverContext) => void;
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

  const context: PopoverContext = {
    isOpen: createMemo(() => state.isOpen),
    close: () => actions.closePopover(),
  };

  props.context?.(context);

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
  Trigger: typeof Trigger;
  AnchorRef: typeof AnchorRef;
  Overlay: typeof Overlay;
  Panel: typeof Panel;
};

export const Popover: PopoverComponent = Object.assign(PopoverProvider, {
  Trigger,
  AnchorRef,
  Overlay,
  Panel,
});

export default Popover;
