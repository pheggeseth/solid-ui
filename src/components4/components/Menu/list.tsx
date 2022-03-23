import { JSX, mergeProps, onMount } from 'solid-js';
import {
  createClickAwayEffect,
  createFocusTrapEffect,
  focusInitialChildOnMount,
} from '~/components4/utils/eventUtils';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useKeyEventHandlers } from '~/utils/eventUtils';
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
  };
}

export function createListProps<ListElement extends HTMLElement = HTMLElement>(
  config: ListConfig<ListElement> = {}
) {
  const { idPrefix = 'solid-ui-menu-list' } = config;
  const id = useId(idPrefix);

  const menuState = useMenuState();

  return {
    get ['aria-activedescendent']() {
      return menuState.activeItemId;
    },
    ...getDataProp(idPrefix),
    id,
    tabIndex: 0,
  };
}

export function createListHandlers<ListElement extends HTMLElement = HTMLElement>() {
  const state = useMenuState();
  const actions = useMenuActions();

  const onKeyDown = useKeyEventHandlers<ListElement>({
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
      actions.focusFirstDescendent();
    },
    End(event) {
      event.preventDefault();
      actions.focusLastItem();
    },
    Escape() {
      actions.closePopover();
    },
    default(event) {
      if (event.key.length === 1) {
        if (!state.search && event.key === ' ') {
          return;
        } else {
          actions.focusTypeaheadItem(event.key);
        }
      }
    },
  });

  return {
    onKeyDown,
  };
}

export function createListEffects(config: { id: string }) {
  const state = useMenuState();
  const actions = useMenuActions();

  registerListIdOnMount(config);

  if (!state.popoverId) {
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
