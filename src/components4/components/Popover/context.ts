import { Accessor, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

type PopoverElementIds = {
  triggerId: string;
  panelId: string;
  overlayId: string;
};

export type PopoverRole = 'menu' | 'listbox' | 'tree' | 'grid';

export type PopoverState = PopoverElementIds & {
  role: PopoverRole;
  shouldShowPanel: boolean;
  isPanelOpen: boolean;
  isOverlayMounted: boolean;
};

export type PopoverActions = Readonly<{
  setElementId(name: keyof PopoverElementIds, id: string): void;
  openPopover(): void;
  closePopover(): void;
  togglePopover(): void;
  onOverlayMount(): void;
  onOverlayCleanup(): void;
}>;

export type PopoverStore = [state: PopoverState, actions: PopoverActions];

export function createPopoverStore(config: { role?: Accessor<PopoverRole> } = {}) {
  const [state, setState] = createStore<PopoverState>({
    triggerId: null,
    overlayId: null,
    panelId: null,
    get role(): PopoverRole {
      return config.role?.();
    },
    shouldShowPanel: false,
    get isPanelOpen(): boolean {
      return state.shouldShowPanel && (!state.overlayId || state.isOverlayMounted);
    },
    isOverlayMounted: false,
  });

  const actions: PopoverActions = {
    setElementId(name, id) {
      setState({ [name]: id });
    },
    openPopover() {
      setState('shouldShowPanel', true);
    },
    closePopover() {
      setState('shouldShowPanel', false);
    },
    togglePopover() {
      setState('shouldShowPanel', (state) => !state);
    },
    onOverlayMount() {
      setState({ isOverlayMounted: true });
    },
    onOverlayCleanup() {
      setState({ isOverlayMounted: false });
    },
  } as const;

  return [state, actions] as const;
}

export const PopoverStoreContext = createContext<PopoverStore>();

export function usePopoverStore() {
  return useContext(PopoverStoreContext);
}
export function usePopoverState() {
  return useContext(PopoverStoreContext)[0];
}
export function usePopoverActions() {
  return useContext(PopoverStoreContext)[1];
}

export type PopoverContext = Readonly<{
  isPopoverOpen: Accessor<boolean>;
  isOverlayOpen: Accessor<boolean>;
  open: () => void;
  close: () => void;
}>;

export function usePopoverContext(): PopoverContext {
  const state = usePopoverState();
  const actions = usePopoverActions();

  return {
    isPopoverOpen: () => state.isPanelOpen,
    isOverlayOpen: () => state.shouldShowPanel,
    open: () => actions.openPopover(),
    close: () => actions.closePopover(),
  } as const;
}

export type PopoverContextProp = {
  context?: (ctx: PopoverContext) => void;
};
