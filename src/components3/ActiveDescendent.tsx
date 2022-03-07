import {
  createContext,
  createEffect,
  createSelector,
  mergeProps,
  onCleanup,
  onMount,
  PropsWithChildren,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { ListOrientation } from '~/types';
import { useKeyEventHandlers } from '~/utils/eventUtils';

type State = {
  activeDescendentId: string;
  descendents: string[];
  orientation: ListOrientation;
  search: string;
};

type Selectors = {
  isDescendentActive: (id: string) => boolean;
};

type Actions = {
  addDescendent(id: string): void;
  removeDescendent(id: string): void;
  focusNextDescendent(): void;
  focusPreviousDescendent(): void;
  focusFirstDescendent(): void;
  focusLastDescendent(): void;
  focusTypeaheadDescendent(key: string): void;
  hoverDescendent(itemId: string): void;
  hoverDescendentClear(): void;
};

const ActiveDescendentContext =
  createContext<{ state: State; selectors: Selectors; actions: Actions }>();
export function useActiveDescendentState() {
  return useContext(ActiveDescendentContext).state;
}
export function useActiveDescendentSelectors() {
  return useContext(ActiveDescendentContext).selectors;
}
export function useActiveDescendentActions() {
  return useContext(ActiveDescendentContext).actions;
}

export type ActiveDescendentProviderProps = PropsWithChildren<{
  orientation?: ListOrientation;
}>;

export function ActiveDescendentProvider(props: ActiveDescendentProviderProps) {
  props = mergeProps<typeof props[]>({ orientation: 'vertical' }, props);

  const [state, setState] = createStore<State>({
    activeDescendentId: null,
    descendents: [],
    get orientation(): ListOrientation {
      return props.orientation;
    },
    search: '',
  });

  const selectors: Selectors = {
    isDescendentActive: createSelector(() => state.activeDescendentId),
  };

  const getActiveDescendentIndex = () =>
    state.descendents.findIndex((id) => id === state.activeDescendentId);

  let resetSearch: NodeJS.Timeout;

  const actions: Actions = {
    addDescendent(descendent) {
      setState('descendents', (descendents) => [...descendents, descendent]);
    },
    removeDescendent(descendentId) {
      setState('descendents', (descendents) => descendents.filter((id) => id !== descendentId));
    },
    focusNextDescendent() {
      const activeItemIndex = getActiveDescendentIndex();
      if (activeItemIndex < state.descendents.length - 1) {
        setState('activeDescendentId', state.descendents[activeItemIndex + 1]);
      }
    },
    focusPreviousDescendent() {
      const activeItemIndex = getActiveDescendentIndex();

      if (activeItemIndex === -1) {
        setState('activeDescendentId', state.descendents[state.descendents.length - 1]);
      } else if (activeItemIndex > 0) {
        setState('activeDescendentId', state.descendents[activeItemIndex - 1]);
      }
    },
    focusFirstDescendent() {
      setState('activeDescendentId', state.descendents[0]);
    },
    focusLastDescendent() {
      setState('activeDescendentId', state.descendents[state.descendents.length - 1]);
    },
    focusTypeaheadDescendent(key: string) {
      clearTimeout(resetSearch);
      setState('search', (search) => search + key);

      const activeItemIndex = getActiveDescendentIndex();
      const wrappedDescendents = state.descendents
        .slice(activeItemIndex + 1)
        .concat(state.descendents.slice(0, activeItemIndex));

      const searchTerm = state.search.toLocaleLowerCase();
      const matchingDescendentId = wrappedDescendents.find((id) =>
        document.getElementById(id).textContent.toLocaleLowerCase().startsWith(searchTerm)
      );

      if (matchingDescendentId) {
        setState('activeDescendentId', matchingDescendentId);
      }

      resetSearch = setTimeout(() => {
        setState('search', '');
      }, 500);
    },
    hoverDescendent(descendentId) {
      setState('activeDescendentId', descendentId);
    },
    hoverDescendentClear() {
      setState('activeDescendentId', null);
    },
  };

  return (
    <ActiveDescendentContext.Provider value={{ state: state as State, selectors, actions }}>
      {props.children}
    </ActiveDescendentContext.Provider>
  );
}

export type CreateActiveDescendentContainerPropsConfig = {
  id: string;
};

export function createActiveDescendentContainerProps<ContainerElement extends HTMLElement>(
  config: CreateActiveDescendentContainerPropsConfig
) {
  const state = useActiveDescendentState();
  const actions = useActiveDescendentActions();

  return {
    get ['aria-activedescendent']() {
      return state.activeDescendentId;
    },
    onKeyDown: useKeyEventHandlers<ContainerElement>({
      ArrowUp(event) {
        if (state.orientation === 'vertical') {
          event.preventDefault();
          actions.focusPreviousDescendent();
        }
      },
      ArrowDown(event) {
        if (state.orientation === 'vertical') {
          event.preventDefault();
          actions.focusNextDescendent();
        }
      },
      ArrowLeft(event) {
        if (state.orientation === 'horizontal') {
          event.preventDefault();
          actions.focusPreviousDescendent();
        }
      },
      ArrowRight(event) {
        if (state.orientation === 'horizontal') {
          event.preventDefault();
          actions.focusNextDescendent();
        }
      },
      Home(event) {
        event.preventDefault();
        actions.focusFirstDescendent();
      },
      End(event) {
        event.preventDefault();
        actions.focusLastDescendent();
      },
      default(event) {
        if (event.key.length === 1) {
          if (!state.search && event.key === ' ') {
            return;
          } else {
            actions.focusTypeaheadDescendent(event.key);
          }
        }
      },
    }),
    tabIndex: 0,
  };
}

export type CreatActiveDescendentPropsConfig = {
  id: string;
};

export function createActiveDescendentProps(config: CreatActiveDescendentPropsConfig) {
  const state = useActiveDescendentState();
  const selectors = useActiveDescendentSelectors();
  const actions = useActiveDescendentActions();

  onMount(() => actions.addDescendent(config.id));
  onCleanup(() => actions.removeDescendent(config.id));

  createEffect(() => {
    if (state.activeDescendentId === config.id) {
      document.getElementById(config.id).scrollIntoView(false);
    }
  });

  return {
    get ['aria-selected']() {
      return selectors.isDescendentActive(config.id) || undefined;
    },
    get ['data-active']() {
      return selectors.isDescendentActive(config.id) ? '' : undefined;
    },
    onMouseEnter() {
      actions.hoverDescendent(config.id);
    },
    onMouseLeave() {
      actions.hoverDescendentClear();
    },
    tabIndex: -1,
  };
}
