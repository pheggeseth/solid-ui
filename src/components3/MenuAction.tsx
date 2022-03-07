import {
  Accessor,
  createContext,
  onCleanup,
  onMount,
  PropsWithChildren,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { useKeyEventHandlers } from '~/utils/eventUtils';

type State = {
  menuActions: { [id: string]: () => void };
};

type Actions = {
  addAction(id: string, action: () => void): void;
  removeAction(id: string): void;
  performMenuAction(id: string): void;
};

const MenuActionContext = createContext<{ state: State; actions: Actions }>();
function useState() {
  return useContext(MenuActionContext).state;
}
function useActions() {
  return useContext(MenuActionContext).actions;
}

export type MenuActionProviderProps = {
  onPerformAction?: (menuItemId: string) => void;
};

export function MenuActionProvider(props: PropsWithChildren<MenuActionProviderProps>) {
  const [state, setState] = createStore<State>({
    menuActions: {},
  });

  const actions: Actions = {
    addAction(id: string, action: () => void) {
      setState('menuActions', { [id]: action });
    },
    removeAction(id) {
      setState('menuActions', { [id]: undefined });
    },
    performMenuAction(id: string) {
      if (state.menuActions[id]) {
        state.menuActions[id]();
        props.onPerformAction?.(id);
      } else {
        const element = document.getElementById(id);
        if (element.onclick || ['BUTTON', 'A'].includes(element.tagName)) {
          element.click();
          props.onPerformAction?.(id);
        }
      }
    },
  };

  return (
    <MenuActionContext.Provider value={{ state, actions }}>
      {props.children}
    </MenuActionContext.Provider>
  );
}

export function createMenuActionContainerProps<MenuContainerElement extends HTMLElement>(config: {
  activeId: Accessor<string>;
  search: Accessor<string>;
}) {
  const actions = useActions();

  return {
    onKeyDown: useKeyEventHandlers<MenuContainerElement>({
      Enter(event) {
        if (config.activeId()) {
          event.preventDefault();
          actions.performMenuAction(config.activeId());
        }
      },
      [' '](event) {
        if (config.activeId() && !config.search()) {
          event.preventDefault();
          actions.performMenuAction(config.activeId());
        }
      },
    }),
  };
}

export function createMenuActionItemProps(config: { action: () => void; id: string }) {
  const actions = useActions();

  onMount(() => actions.addAction(config.id, config.action));
  onCleanup(() => actions.removeAction(config.id));

  return {
    onClick() {
      actions.performMenuAction(config.id);
    },
  };
}
