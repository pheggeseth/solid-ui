import { JSX, mergeProps, Show, splitProps, untrack } from 'solid-js';
import { Dynamic, Portal, spread } from 'solid-js/web';
import Fragment from '~/components/Fragment';
import { BaseComponentProps, ComponentRef, DynamicComponent } from '~/types';
import {
  createListItemProps,
  createListProps,
  CreateListPropsConfig,
  ListItemProps,
  ListProps,
  ListProvider,
} from './List';
import {
  createPanelButtonProps,
  createPanelProps,
  PanelButtonProps,
  PanelExternalContext,
  PanelProvider,
  PanelProviderProps,
  usePanelState,
} from './Panel';
import Popper from './Popper';
import { PopupPanelProps } from './Popup';

export type MenuContext = PanelExternalContext;

export type MenuProviderProps = Omit<PanelProviderProps, 'role'> & { popper?: boolean };

export function MenuProvider(props: MenuProviderProps) {
  props = mergeProps<typeof props[]>({ popper: true }, props);

  const [localProps, otherProps] = splitProps(props, ['children', 'popper']);

  const provider = () => (
    <PanelProvider {...otherProps} role="menu">
      <ListProvider shouldClickListItem>{localProps.children}</ListProvider>
    </PanelProvider>
  );

  return localProps.popper ? <Popper>{provider()}</Popper> : provider();
}

export type MenuButtonProps<MenuButtonElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent<PanelButtonProps<MenuButtonElement>>;
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

  const buttonProps = createPanelButtonProps<MenuButtonElement>({ idPrefix: localProps.idPrefix });

  return <Dynamic {...otherProps} {...buttonProps} component={localProps.component} />;
}

export type MenuPanelProps<MenuPanelElement extends HTMLElement> =
  PopupPanelProps<MenuPanelElement>;

export function MenuPanel<MenuPanelElement extends HTMLElement = HTMLDivElement>(
  props: MenuPanelProps<MenuPanelElement>
) {
  props = mergeProps<typeof props[]>({ component: 'div', idPrefix: 'solid-ui-menu-panel' }, props);

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix', 'portal']);

  const panelProps = createPanelProps<MenuPanelElement>({
    clickAway: true,
    idPrefix: localProps.idPrefix,
    manageFocus: true,
  });

  const panel = () => (
    <Dynamic
      {...otherProps}
      {...panelProps}
      component={localProps.component}
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

export type MenuOptionsProps<MenuOptionsElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent<ListProps<MenuOptionsElement> & { role?: 'menu' }>;
  idPrefix?: string;
  portal?: boolean;
}>;

export function MenuOptions<MenuOptionsElement extends HTMLElement = HTMLUListElement>(
  props: MenuOptionsProps<MenuOptionsElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'div', idPrefix: 'solid-ui-menu-options', portal: true },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix', 'portal']);

  const listProps = createListProps<any, MenuOptionsElement>({
    idPrefix: localProps.idPrefix,
  });

  const options = () => (
    <Dynamic
      {...otherProps}
      {...listProps}
      component={localProps.component}
      data-solid-ui-menu-options=""
      role="menu"
    />
  );

  const panelState = usePanelState();

  return panelState.panelId ? options() : <MenuPanel>{options()}</MenuPanel>;

  // const optionsProps = {
  //   ...listProps,
  //   ...(panelState.panelId ? {} : panelProps),
  // };

  // const options = () => (
  //   <Dynamic
  //     {...otherProps}
  //     {...optionsProps}
  //     component={localProps.component}
  //     data-solid-ui-menu-options=""
  //     role="menu"
  //     tabIndex={0}
  //   />
  // );

  // return panelState.panelId ? (
  //   options()
  // ) : (
  //   <Show when={panelState.isPanelOpen}>
  //     {localProps.portal ? <Portal>{options()}</Portal> : options()}
  //   </Show>
  // );
}

export type MenuOptionProps<MenuOptionElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent;
  idPrefix?: string;
  onClick?: JSX.EventHandler<MenuOptionElement, MouseEvent>;
  onSelect?: () => void;
  context?: (ctx: ListItemProps<MenuOptionElement>) => void;
}>;

export function MenuOption<MenuOptionElement extends HTMLElement = HTMLLIElement>(
  props: MenuOptionProps<MenuOptionElement>
) {
  props = mergeProps<typeof props[]>(
    { component: Fragment, idPrefix: 'solid-ui-menu-option' },
    props
  );

  const [localProps, otherProps] = splitProps(props, [
    'component',
    'idPrefix',
    'onClick',
    'onSelect',
  ]);

  const listItemProps = createListItemProps<any, MenuOptionElement>({
    idPrefix: localProps.idPrefix,
    onClick: localProps.onClick,
    role: 'menuitem',
  });

  if (localProps.component === Fragment) {
    // props.context(listItemProps);
    return untrack(() => props.children(() => listItemProps));
  } else {
    return (
      <Dynamic
        {...otherProps}
        {...listItemProps}
        component={localProps.component}
      />
    );
  }

  return <Dynamic {...otherProps} {...listItemProps} component={localProps.component} />;
}
