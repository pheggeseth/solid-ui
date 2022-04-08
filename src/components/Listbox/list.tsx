import { JSX, mergeProps, onMount } from 'solid-js';
import {
  createClickAwayEffect,
  createFocusTrapEffect,
  focusInitialChildOnMount,
} from '~/utils/eventUtils';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useKeyEventHandlers } from "~/utils/useKeyEventHandlers";
import { useListboxActions, useListboxContext, useListboxState } from './context';

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
    context: useListboxContext(),
  } as const;
}

export function createListProps<ListElement extends HTMLElement = HTMLElement>(
  config: ListConfig<ListElement> = {}
) {
  const { idPrefix = 'solid-ui-listbox-list' } = config;
  const id = useId(idPrefix);

  const state = useListboxState();

  return {
    get ['aria-activedescendent']() {
      return state.activeItemId;
    },
    get ['aria-labelledby']() {
      return state.labelId;
    },
    get ['data-solid-ui-panel']() {
      return state.panelId ? undefined : '';
    },
    'data-solid-ui-list': '',
    ...getDataProp(idPrefix),
    id,
    role: 'listbox',
    tabIndex: 0,
  } as const;
}

export function createListHandlers<ListElement extends HTMLElement = HTMLElement>(
  config: ListConfig<ListElement> = {}
) {
  const state = useListboxState();
  const actions = useListboxActions();

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
      actions.chooseValue(state.activeItemId);
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
          actions.chooseValue(state.activeItemId);
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
  const state = useListboxState();
  const actions = useListboxActions();

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
  const actions = useListboxActions();
  onMount(() => {
    actions.setElementId('listId', config.id);
  });
}

export function initializeActiveItemOnMount() {
  const actions = useListboxActions();
  onMount(() => {
    actions.initializeItemFocus();
  });
}
