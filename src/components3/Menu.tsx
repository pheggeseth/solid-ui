import { JSX, mergeProps, Show, splitProps } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';
import { BaseComponentProps, DynamicComponent, ListOrientation } from '~/types';
import { useId } from '~/utils/componentUtils';
import {
  ActiveDescendentProvider,
  createActiveDescendentContainerProps,
  createActiveDescendentProps,
  useActiveDescendentState,
} from './ActiveDescendent';
import {
  createMenuActionContainerProps,
  createMenuActionItemProps,
  MenuActionProvider,
} from './MenuAction';
import {
  createPanelButtonProps,
  createPanelProps,
  PanelButtonProps,
  PanelExternalContext,
  PanelProps,
  PanelProvider,
  PanelProviderProps,
  usePanelActions,
  usePanelState,
} from './Panel';
import Popper from './Popper';

function createExternalContext(config: { id?: string } = {}) {
  const activeDescendentState = useActiveDescendentState();
  const panelState = usePanelState();
  const panelActions = usePanelActions();

  return {
    activeDescendentId: () => activeDescendentState.activeDescendentId,
    isActive: () => activeDescendentState.activeDescendentId === config.id,
    isOpen: () => panelState.isPanelOpen,
    open: () => panelActions.openPanel,
    close: () => panelActions.closePanel,
  } as const;
}

type MenuExternalContextProp = {
  context?: (ctx: MenuContext) => void;
};

export type MenuContext = ReturnType<typeof createExternalContext>;

export type MenuProviderProps = Omit<PanelProviderProps, 'context' | 'role'> & {
  popper?: boolean;
  orientation?: ListOrientation;
} & MenuExternalContextProp;

export function MenuProvider(props: MenuProviderProps) {
  props = mergeProps<typeof props[]>({ popper: true }, props);

  const [localProps, otherProps] = splitProps(props, [
    'children',
    'context',
    'orientation',
    'popper',
  ]);

  let panelContext: PanelExternalContext;

  const provider = () => (
    <PanelProvider {...otherProps} context={(ctx) => (panelContext = ctx)} role="menu">
      <ActiveDescendentProvider orientation={localProps.orientation}>
        <MenuActionProvider onPerformAction={panelContext.close}>
          {(() => {
            localProps.context?.(createExternalContext());
            return localProps.children;
          })()}
        </MenuActionProvider>
      </ActiveDescendentProvider>
    </PanelProvider>
  );

  return localProps.popper ? <Popper>{provider()}</Popper> : provider();
}

export type MenuButtonProps<MenuButtonElement extends HTMLElement = HTMLButtonElement> =
  BaseComponentProps<
    {
      component?: DynamicComponent<PanelButtonProps<MenuButtonElement> & { id: string }>;
      idPrefix?: string;
    } & MenuExternalContextProp
  >;

export function MenuButton<MenuButtonElement extends HTMLElement = HTMLButtonElement>(
  props: MenuButtonProps<MenuButtonElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'button', idPrefix: 'solid-ui-menu-button' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix']);

  const id = useId(localProps.idPrefix);

  const buttonProps = createPanelButtonProps<MenuButtonElement>({ id });

  const finalProps = mergeProps(otherProps, buttonProps);

  localProps.context?.(createExternalContext());

  return (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      data-solid-ui-menu-button=""
      id={id}
    />
  );
}

export type MenuPanelProps<MenuPanelElement extends HTMLElement = HTMLDivElement> =
  BaseComponentProps<
    {
      component?: DynamicComponent<PanelProps<MenuPanelElement> & { id: string; role: 'none' }>;
      idPrefix?: string;
      portal?: boolean;
    } & MenuExternalContextProp
  >;

export function MenuPanel<MenuPanelElement extends HTMLElement = HTMLDivElement>(
  props: MenuPanelProps<MenuPanelElement>
) {
  props = mergeProps<typeof props[]>({ component: 'div', idPrefix: 'solid-ui-menu-panel' }, props);

  const [localProps, otherProps] = splitProps(props, [
    'component',
    'context',
    'idPrefix',
    'portal',
  ]);

  const id = useId(localProps.idPrefix);

  const panelProps = createPanelProps<MenuPanelElement>({
    clickAway: true,
    id,
    manageFocus: true,
    tabIndex: -1,
  });

  const finalProps = mergeProps(otherProps, panelProps);

  const panel = () => (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      id={id}
      data-solid-ui-menu-panel=""
      // if we render this panel, we also need to render options,
      // so options need to have role="menu", not the panel
      role="none"
    />
  );

  const panelState = usePanelState();

  localProps.context?.(createExternalContext());

  return (
    <Show when={panelState.isPanelOpen}>
      <Show when={localProps.portal} fallback={panel()}>
        <Portal>{panel()}</Portal>
      </Show>
    </Show>
  );
}

export type MenuListProps = BaseComponentProps<
  {
    component?: DynamicComponent<{ id: string; role?: 'menu' }>;
    idPrefix?: string;
    portal?: boolean;
  } & MenuExternalContextProp
>;

export function MenuList<MenuListElement extends HTMLElement = HTMLUListElement>(
  props: MenuListProps
) {
  props = mergeProps<typeof props[]>(
    { component: 'ul', idPrefix: 'solid-ui-menu-list', portal: true },
    props
  );

  const [localProps, otherProps] = splitProps(props, [
    'component',
    'context',
    'idPrefix',
    'portal',
  ]);

  const id = useId(localProps.idPrefix);

  const containerProps = createActiveDescendentContainerProps({ id });

  const activeDescendentState = useActiveDescendentState();

  const menuContainerProps = createMenuActionContainerProps<MenuListElement>({
    activeId: () => activeDescendentState.activeDescendentId,
    search: () => activeDescendentState.search,
  });

  const panelState = usePanelState();

  const panelProps = !panelState.panelId
    ? createPanelProps<MenuListElement>({
        clickAway: true,
        id,
        manageFocus: true,
        tabIndex: 0,
      })
    : ({} as { onKeyDown: never });

  const onKeyDown: JSX.EventHandler<MenuListElement, KeyboardEvent> = (event) => {
    containerProps.onKeyDown(event);
    menuContainerProps.onKeyDown(event);
    panelProps?.onKeyDown(event);
  };

  const finalProps = mergeProps(otherProps, containerProps, menuContainerProps, panelProps, {
    onKeyDown,
  });

  const menuList = () => (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      data-solid-ui-menu-list=""
      id={id}
      role="menu"
    />
  );

  localProps.context?.(createExternalContext());

  return !panelState.panelId ? (
    <Show when={panelState.isPanelOpen}>
      {localProps.portal ? <Portal>{menuList()}</Portal> : menuList()}
    </Show>
  ) : (
    menuList()
  );
}

export type MenuItemProps<MenuItemElement extends HTMLElement = HTMLLIElement> = BaseComponentProps<
  {
    action?: () => void;
    component?: DynamicComponent<{ id: string; role: 'menuitem' }>;
    idPrefix?: string;
    onClick?: JSX.EventHandler<MenuItemElement, MouseEvent>;
    onSelect?: () => void;
  } & MenuExternalContextProp
>;

export function MenuItem<MenuItemElement extends HTMLElement = HTMLLIElement>(
  props: MenuItemProps<MenuItemElement>
) {
  props = mergeProps<typeof props[]>({ component: 'li', idPrefix: 'solid-ui-menu-item' }, props);

  const [localProps, otherProps] = splitProps(props, [
    'action',
    'component',
    'context',
    'idPrefix',
    'onClick',
    'onSelect',
  ]);

  const id = useId(localProps.idPrefix);

  const descendentProps = createActiveDescendentProps({ id });
  const menuItemProps = createMenuActionItemProps({ action: localProps.action, id });

  const finalProps = mergeProps(otherProps, descendentProps, menuItemProps);

  localProps.context?.(createExternalContext({ id }));

  return (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      data-solid-ui-menu-item=""
      id={id}
      role="menuitem"
    />
  );
}
