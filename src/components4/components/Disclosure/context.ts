import { Accessor, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

type DisclosureElementIds = {
  triggerId: string;
  contentId: string;
  overlayId: string;
};

export type DisclosureRole = 'menu' | 'listbox' | 'tree' | 'grid';

export type DisclosureState = DisclosureElementIds & {
  role: DisclosureRole;
  shouldShowContent: boolean;
  isContentOpen: boolean;
  isOverlayMounted: boolean;
};

export type DisclosureActions = Readonly<{
  setElementId(name: keyof DisclosureElementIds, id: string): void;
  openDisclosure(): void;
  closeDisclosure(): void;
  toggleDisclosure(): void;
  onOverlayMount(): void;
  onOverlayCleanup(): void;
}>;

export type DisclosureStore = [state: DisclosureState, actions: DisclosureActions];

export function createDisclosureStore(config: { role?: Accessor<DisclosureRole> } = {}) {
  const [state, setState] = createStore<DisclosureState>({
    triggerId: null,
    overlayId: null,
    contentId: null,
    get role(): DisclosureRole {
      return config.role?.();
    },
    shouldShowContent: false,
    get isContentOpen(): boolean {
      return state.shouldShowContent && (!state.overlayId || state.isOverlayMounted);
    },
    isOverlayMounted: false,
  });

  const actions: DisclosureActions = {
    setElementId(name, id) {
      setState({ [name]: id });
    },
    openDisclosure() {
      setState('shouldShowContent', true);
    },
    closeDisclosure() {
      setState('shouldShowContent', false);
    },
    toggleDisclosure() {
      setState('shouldShowContent', (state) => !state);
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

export const DisclosureStoreContext = createContext<DisclosureStore>();

export function useDisclosureStore() {
  return useContext(DisclosureStoreContext);
}
export function useDisclosureState() {
  return useContext(DisclosureStoreContext)[0];
}
export function useDisclosureActions() {
  return useContext(DisclosureStoreContext)[1];
}

export type DisclosureContext = Readonly<{
  isDisclosureOpen: Accessor<boolean>;
  isOverlayOpen: Accessor<boolean>;
  open: () => void;
  close: () => void;
}>;

export function useDisclosureContext(): DisclosureContext {
  const state = useDisclosureState();
  const actions = useDisclosureActions();

  return {
    isDisclosureOpen: () => state.isContentOpen,
    isOverlayOpen: () => state.shouldShowContent,
    open: () => actions.openDisclosure(),
    close: () => actions.closeDisclosure(),
  } as const;
}

export type DisclosureContextProp = {
  context?: (ctx: DisclosureContext) => void;
};
