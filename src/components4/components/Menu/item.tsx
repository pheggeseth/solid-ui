import { mergeProps, onCleanup, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useMenuActions, useMenuContext, useMenuSelectors } from './context';

export type ItemConfig = {
  idPrefix?: string;
};

export function createItem<ItemElement extends HTMLElement = HTMLElement>(config: ItemConfig = {}) {
  const props = createItemProps(config);
  const handlers = createItemHandlers({ id: props.id });

  return {
    props: mergeProps(props, handlers),
    effects: () => createItemEffects({ id: props.id }),
    context: useMenuContext(),
  } as const;
}

export function createItemProps(config: ItemConfig) {
  const { idPrefix = 'solid-ui-menu-item' } = config;
  const id = useId(idPrefix);

  const selectors = useMenuSelectors();

  return {
    get ['aria-selected']() {
      return selectors.isItemActive(id) || undefined;
    },
    get ['data-active']() {
      return selectors.isItemActive(id) ? '' : undefined;
    },
    ...getDataProp(idPrefix),
    id,
    role: 'menuitem',
    tabIndex: -1,
  } as const;
}

export function createItemHandlers(config: { id: string }) {
  const actions = useMenuActions();

  return {
    onMouseEnter() {
      actions.focusItem(config.id);
    },
    onMouseLeave() {
      actions.clearItemFocus();
    },
  };
}

export function createItemEffects(config: { id: string }) {
  addItemOnMount(config);
  removeItemOnCleanup(config);
}

export function addItemOnMount(config: { id: string }) {
  const actions = useMenuActions();
  onMount(() => {
    actions.addItem(config.id);
  });
}

export function removeItemOnCleanup(config: { id: string }) {
  const actions = useMenuActions();
  onCleanup(() => {
    actions.removeItem(config.id);
  });
}
