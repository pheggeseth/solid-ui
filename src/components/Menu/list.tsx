import { JSX, mergeProps, onMount } from 'solid-js';
import {
  createClickAwayEffect,
  createFocusTrapEffect,
  focusInitialChildOnMount,
} from '~/utils/eventUtils';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useKeyEventHandlers } from "~/utils/useKeyEventHandlers";
import { useMenuActions, useMenuContext, useMenuState } from './context';

export type ListConfig<ListElement extends HTMLElement> = {
  idPrefix?: string;
  onKeyDown?: JSX.EventHandler<ListElement, KeyboardEvent>;
};

export function createList<ListElement extends HTMLElement = HTMLElement>(
  config: ListConfig<ListElement> = {}
) {
  const props = createListProps(config);
  const handlers = createListHandlers();

  return {
    props: mergeProps(props, handlers),
    effects: () => createListEffects({ id: props.id }),
    context: useMenuContext(),
  } as const;
}

export function createListProps<ListElement extends HTMLElement = HTMLElement>(
  config: ListConfig<ListElement> = {}
) {
  const { idPrefix = 'solid-ui-menu-list' } = config;
  const id = useId(idPrefix);

  const state = useMenuState();

  return {
    get ['aria-activedescendent']() {
      return state.activeItemId;
    },
    get ['data-solid-ui-panel']() {
      return state.panelId ? undefined : '';
    },
    'data-solid-ui-list': '',
    ...getDataProp(idPrefix),
    id,
    role: 'menu',
    tabIndex: 0,
  } as const;
}

export function createListHandlers<ListElement extends HTMLElement = HTMLElement>(
  config: ListConfig<ListElement> = {}
) {
  const state = useMenuState();
  const actions = useMenuActions();

  const handlers = useKeyEventHandlers<ListElement>({
    ArrowUp(event) {
      if (state.orientation === 'vertical') {
        event.preventDefault();
        actions.focusPreviousItem();
      }
    },
    ArrowDown(event) {
      if (state.orientation === 'vertical') {
        event.preventDefault();
        actions.focusNextItem();
      }
    },
    ArrowLeft(event) {
      if (state.orientation === 'horizontal') {
        event.preventDefault();
        actions.focusPreviousItem();
      }
    },
    ArrowRight(event) {
      if (state.orientation === 'horizontal') {
        event.preventDefault();
        actions.focusNextItem();
      }
    },
    Home(event) {
      event.preventDefault();
      actions.focusFirstItem();
    },
    End(event) {
      event.preventDefault();
      actions.focusLastItem();
    },
    Enter(event) {
      event.preventDefault();
      actions.performMenuAction(state.activeItemId, 'keyboard');
    },
    Escape() {
      if (!state.panelId) {
        actions.closePopover();
      }
    },
    default(event) {
      if (event.key.length === 1) {
        if (!state.search && event.key === ' ') {
          event.preventDefault();
          actions.performMenuAction(state.activeItemId, 'keyboard');
        } else {
          actions.focusTypeaheadItem(event.key);
        }
      }
    },
  });

  const onKeyDown: JSX.EventHandler<ListElement, KeyboardEvent> = (event) => {
    handlers(event);
    config.onKeyDown?.(event);
  };

  return {
    onKeyDown,
  } as const;
}

export function createListEffects(config: { id: string }) {
  const state = useMenuState();
  const actions = useMenuActions();

  registerListIdOnMount(config);

  if (!state.panelId) {
    createFocusTrapEffect({
      containerId: config.id,
      isEnabled: () => state.isPanelOpen,
    });

    focusInitialChildOnMount({
      containerId: config.id,
    });

    createClickAwayEffect({
      containerId: config.id,
      exceptionIds: () => [state.triggerId],
      onClickAway: actions.closePopover,
      isEnabled: () =>
        state.isPanelOpen && document.getElementById(config.id).contains(document.activeElement),
    });
  }

  initializeActiveItemOnMount();
}

export function registerListIdOnMount(config: { id: string }) {
  onMount(() => {
    useMenuActions().setElementId('listId', config.id);
  });
}

export function initializeActiveItemOnMount() {
  const actions = useMenuActions();
  onMount(() => {
    actions.initializeItemFocus();
  });
}
