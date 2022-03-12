import { Accessor, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

type PopoverElementIds = {
  triggerId: string;
  dialogId: string;
  overlayId: string;
};

export type PopoverRole = 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | 'none';

export type PopoverState = PopoverElementIds & {
  role: PopoverRole;
  shouldShowPopover: boolean;
  isPopoverOpen: boolean;
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
    dialogId: null,
    get role(): PopoverRole {
      return config.role?.();
    },
    shouldShowPopover: false,
    get isPopoverOpen(): boolean {
      return state.shouldShowPopover && (!state.overlayId || state.isOverlayMounted);
    },
    isOverlayMounted: false,
  });

  const actions: PopoverActions = {
    setElementId(name, id) {
      setState({ [name]: id });
    },
    openPopover() {
      setState('shouldShowPopover', true);
    },
    closePopover() {
      setState('shouldShowPopover', false);
    },
    togglePopover() {
      setState('shouldShowPopover', (state) => !state);
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
    isPopoverOpen: () => state.isPopoverOpen,
    isOverlayOpen: () => state.shouldShowPopover,
    open: () => actions.openPopover(),
    close: () => actions.closePopover(),
  } as const;
}

export type PopoverContextProp = {
  context?: (ctx: PopoverContext) => void;
};
