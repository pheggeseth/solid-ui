import { JSX, mergeProps, Show, splitProps } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';
import { BaseComponentProps, ComponentRef, DynamicComponent, ListboxOrientation } from '~/types';
import { useId } from '~/utils/componentUtils';
import {
  ActiveDescendentProvider,
  createActiveDescendentContainerProps,
  createActiveDescendentProps,
} from './ActiveDescendent';
import { createMenuContainerProps, createMenuItemProps, MenuActionProvider } from './MenuAction';
import {
  createPanelButtonProps,
  createPanelProps,
  PanelButtonProps,
  PanelExternalContext,
  PanelProps,
  PanelProvider,
  PanelProviderProps,
  usePanelState,
} from './Panel';
import Popper from './Popper';
import { PopupPanelProps } from './Popup';

// export type MenuContext = PanelExternalContext;

export type MenuProviderProps = Omit<PanelProviderProps, 'role'> & {
  popper?: boolean;
  orientation?: ListboxOrientation;
};

export function MenuProvider(props: MenuProviderProps) {
  props = mergeProps<typeof props[]>({ popper: true }, props);

  const [localProps, otherProps] = splitProps(props, ['orientation', 'popper']);

  const provider = () => (
    <ActiveDescendentProvider orientation={localProps.orientation}>
      <MenuActionProvider>
        <PanelProvider {...otherProps} role="menu" />
      </MenuActionProvider>
    </ActiveDescendentProvider>
  );

  return localProps.popper ? <Popper>{provider()}</Popper> : provider();
}

type MenuButtonDynamicComponentProps<MenuButtonElement extends HTMLElement> =
  PanelButtonProps<MenuButtonElement> & { id: string };

export type MenuButtonProps<MenuButtonElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent<MenuButtonDynamicComponentProps<MenuButtonElement>>;
  idPrefix?: string;
  ref?: ComponentRef<MenuButtonElement>;
}>;

export function MenuButton<MenuButtonElement extends HTMLElement = HTMLButtonElement>(
  props: MenuButtonProps<MenuButtonElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'button', idPrefix: 'solid-ui-menu-button' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix']);

  const id = useId(localProps.idPrefix);

  const buttonProps = createPanelButtonProps<MenuButtonElement>({ id });

  return (
    <Dynamic<MenuButtonDynamicComponentProps<MenuButtonElement>>
      {...otherProps}
      {...buttonProps}
      component={localProps.component}
      data-solid-ui-menu-button=""
      id={id}
    />
  );
}

export type MenuPanelProps<MenuPanelElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent<PanelProps<MenuPanelElement> & { id: string; role: 'none' }>;
  idPrefix?: string;
  portal?: boolean;
}>;

export function MenuPanel<MenuPanelElement extends HTMLElement = HTMLDivElement>(
  props: MenuPanelProps<MenuPanelElement>
) {
  props = mergeProps<typeof props[]>({ component: 'div', idPrefix: 'solid-ui-menu-panel' }, props);

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix', 'portal']);

  const id = useId(localProps.idPrefix);

  const panelProps = createPanelProps<MenuPanelElement>({
    clickAway: true,
    id,
    manageFocus: true,
    tabIndex: -1,
  });

  const panel = () => (
    <Dynamic
      {...otherProps}
      {...panelProps}
      component={localProps.component}
      id={id}
      data-solid-ui-menu-panel=""
      // if we render this panel, we also need to render options,
      // so options need to have role="menu", not the panel
      role="none"
    />
  );

  const panelState = usePanelState();

  return (
    <Show when={panelState.isPanelOpen}>
      {localProps.portal ? <Portal>{panel()}</Portal> : panel()}
    </Show>
  );
}

export type MenuListProps<MenuListElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent<{ role?: 'menu' }>;
  idPrefix?: string;
  portal?: boolean;
}>;

export function MenuList<MenuListElement extends HTMLElement = HTMLUListElement>(
  props: MenuListProps<MenuListElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'ul', idPrefix: 'solid-ui-menu-list', portal: true },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['idPrefix', 'portal']);

  const id = useId(localProps.idPrefix);

  const containerProps = createActiveDescendentContainerProps({ id });

  const menuContainerProps = createMenuContainerProps<MenuListElement>();

  const panelState = usePanelState();

  const onKeyDown: JSX.EventHandler<MenuListElement, KeyboardEvent> = (event) => {
    containerProps.onKeyDown(event);
    menuContainerProps.onKeyDown(event);
  };

  const menuList = () => (
    <Dynamic
      {...otherProps}
      {...containerProps}
      {...menuContainerProps}
      {...{ onKeyDown }}
      data-solid-ui-menu-list=""
      role="menu"
    />
  );

  return !panelState.panelId ? <MenuPanel>{menuList()}</MenuPanel> : menuList();
}

export type MenuItemProps<MenuOptionElement extends HTMLElement> = BaseComponentProps<{
  action?: () => void;
  component?: DynamicComponent<{ id: string; role: 'menuitem' }>;
  idPrefix?: string;
  onClick?: JSX.EventHandler<MenuOptionElement, MouseEvent>;
  onSelect?: () => void;
  // context?: (ctx: ListItemProps<MenuOptionElement>) => void;
}>;

export function MenuItem<MenuItemElement extends HTMLElement = HTMLLIElement>(
  props: MenuItemProps<MenuItemElement>
) {
  props = mergeProps<typeof props[]>({ component: 'li', idPrefix: 'solid-ui-menu-item' }, props);

  const [localProps, otherProps] = splitProps(props, ['action', 'idPrefix', 'onClick', 'onSelect']);

  const id = useId(localProps.idPrefix);

  const descendentProps = createActiveDescendentProps({ id });
  const menuItemProps = createMenuItemProps({ action: localProps.action, id });

  return (
    <Dynamic
      {...otherProps}
      {...descendentProps}
      {...menuItemProps}
      data-solid-ui-menu-item
      id={id}
      role="menuitem"
    />
  );
}
