import { JSX, mergeProps, onCleanup, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useMenuActions, useMenuContext, useMenuSelectors } from './context';

export type ItemConfig<ItemElement extends HTMLElement> = {
  action?: () => void;
  idPrefix?: string;
  onClick?: JSX.EventHandler<ItemElement, MouseEvent>;
  onMouseEnter?: JSX.EventHandler<ItemElement, MouseEvent>;
  onMouseLeave?: JSX.EventHandler<ItemElement, MouseEvent>;
};

export function createItem<ItemElement extends HTMLElement = HTMLElement>(
  config: ItemConfig<ItemElement> = {}
) {
  const props = createItemProps(config);
  const handlers = createItemHandlers({
    id: props.id,
    ...config,
  });

  const selectors = useMenuSelectors();

  const context = {
    ...useMenuContext(),
    isActive: () => selectors.isActive(props.id),
  } as const;

  return {
    props: mergeProps(props, handlers),
    effects: () => createItemEffects({ id: props.id, action: config.action }),
    context,
  } as const;
}

export function createItemProps(config: { idPrefix?: string }) {
  const { idPrefix = 'solid-ui-menu-item' } = config;
  const id = useId(idPrefix);

  const selectors = useMenuSelectors();

  return {
    get ['aria-selected']() {
      return selectors.isActive(id) || undefined;
    },
    get ['data-active']() {
      return selectors.isActive(id) ? '' : undefined;
    },
    'data-solid-ui-list-item': '',
    ...getDataProp(idPrefix),
    id,
    role: 'menuitem',
    tabIndex: -1,
  } as const;
}

export function createItemHandlers<ItemElement extends HTMLElement = HTMLElement>(config: {
  id: string;
  onClick?: JSX.EventHandler<ItemElement, MouseEvent>;
  onMouseEnter?: JSX.EventHandler<ItemElement, MouseEvent>;
  onMouseLeave?: JSX.EventHandler<ItemElement, MouseEvent>;
}) {
  const actions = useMenuActions();

  const onClick: JSX.EventHandler<ItemElement, MouseEvent> = (event) => {
    actions.performMenuAction(config.id, 'mouse');
    config.onClick?.(event);
  };

  const onMouseEnter: JSX.EventHandler<ItemElement, MouseEvent> = (event) => {
    actions.focusItem(config.id);
    config.onMouseEnter?.(event);
  };

  const onMouseLeave: JSX.EventHandler<ItemElement, MouseEvent> = (event) => {
    actions.clearItemFocus();
    config.onMouseLeave?.(event);
  };

  return {
    onClick,
    onMouseEnter,
    onMouseLeave,
  } as const;
}

export function createItemEffects(config: { id: string; action: () => void }) {
  addItemOnMount(config);
  removeItemOnCleanup(config);
  addMenuActionOnMount(config);
  removeMenuActionOnCleanup(config);
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

export function addMenuActionOnMount(config: { id: string; action: () => void }) {
  const actions = useMenuActions();
  onMount(() => {
    actions.addMenuAction(config.id, config.action);
  });
}

export function removeMenuActionOnCleanup(config: { id: string }) {
  const actions = useMenuActions();
  onCleanup(() => {
    actions.removeMenuAction(config.id);
  });
}
