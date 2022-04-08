import { Accessor, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

type DisclosureElementIds = {
  triggerId: string;
  contentId: string;
};

export type DisclosureState = DisclosureElementIds & {
  isShowingContent: boolean;
};

export type DisclosureActions = Readonly<{
  setElementId(name: keyof DisclosureElementIds, id: string): void;
  showContent(): void;
  hideContent(): void;
  toggleContent(): void;
}>;

export type DisclosureStore = [state: DisclosureState, actions: DisclosureActions];

export function createDisclosureStore() {
  const [state, setState] = createStore({
    triggerId: null,
    contentId: null,
    isShowingContent: false,
  });

  const actions: DisclosureActions = {
    setElementId(name, id) {
      setState({ [name]: id });
    },
    showContent() {
      setState('isShowingContent', true);
    },
    hideContent() {
      setState('isShowingContent', false);
    },
    toggleContent() {
      setState('isShowingContent', (isShowingContent) => !isShowingContent);
    },
  };

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
  isShowingContent: Accessor<boolean>;
  show: () => void;
  hide: () => void;
}>;

export function useDisclosureContext(): DisclosureContext {
  const state = useDisclosureState();
  const actions = useDisclosureActions();

  return {
    isShowingContent: () => state.isShowingContent,
    show: () => actions.showContent(),
    hide: () => actions.hideContent(),
  };
}

export type DisclosureContextProp = {
  context?: (ctx: DisclosureContext) => void;
};
