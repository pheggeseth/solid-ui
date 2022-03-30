import { JSX, onMount } from 'solid-js';
import { createClickAwayEffect } from '~/components4/utils/eventUtils';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useComboboxActions, useComboboxContext, useComboboxState } from './context';

export type ListConfig<ListElement extends HTMLElement> = {
  idPrefix?: string;
  onKeyDown?: JSX.EventHandler<ListElement, KeyboardEvent>;
};

export function createList<ListElement extends HTMLElement = HTMLElement>(
  config: ListConfig<ListElement> = {}
) {
  const props = createListProps(config);

  return {
    props,
    effects: () => createListEffects({ id: props.id }),
    context: useComboboxContext(),
  } as const;
}

export function createListProps<ListElement extends HTMLElement = HTMLElement>(
  config: ListConfig<ListElement> = {}
) {
  const { idPrefix = 'solid-ui-combobox-list' } = config;
  const id = useId(idPrefix);

  const state = useComboboxState();

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

export function createListEffects(config: { id: string }) {
  const state = useComboboxState();
  const actions = useComboboxActions();

  registerListIdOnMount(config);

  if (!state.panelId) {
    createClickAwayEffect({
      containerId: config.id,
      exceptionIds: () => [state.triggerId],
      onClickAway: actions.closePopover,
      isEnabled: () =>
        state.isPanelOpen /* && document.getElementById(config.id).contains(document.activeElement) */,
    });
  }

  initializeActiveItemOnMount();
}

export function registerListIdOnMount(config: { id: string }) {
  const actions = useComboboxActions();
  onMount(() => {
    actions.setElementId('listId', config.id);
  });
}

export function initializeActiveItemOnMount() {
  const actions = useComboboxActions();
  onMount(() => {
    actions.initializeItemFocus();
  });
}
