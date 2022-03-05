import { createMemo, mergeProps, PropsWithChildren, Show, splitProps } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';
import { BaseComponentProps, ComponentRef, DynamicComponent } from '~/types';
import { useId } from '~/utils/componentUtils';
import {
  createPanelButtonProps,
  createPanelOverlayProps,
  createPanelProps,
  CreatePanelPropsConfig,
  OverlayPortal,
  PanelButtonProps,
  PanelExternalContext,
  PanelProps,
  PanelProvider,
  PanelProviderProps,
  usePanelState,
} from './Panel';
import { PopperProvider } from './Popper';

export type PopupContext = PanelExternalContext;

export type PopupProviderProps = PanelProviderProps & { popper?: boolean };

export function PopupProvider(props: PopupProviderProps) {
  props = mergeProps<typeof props[]>({ popper: true, role: 'dialog' }, props);

  const [localProps, otherProps] = splitProps(props, ['popper']);

  const provider = () => <PanelProvider {...otherProps} />;

  return localProps.popper ? <PopperProvider>{provider()}</PopperProvider> : provider();
}

type PopupButtonDynamicComponentProps<PopupButtonElement extends HTMLElement> =
  PanelButtonProps<PopupButtonElement> & { id: string };

export type PopupButtonProps<PopupButtonElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent<PopupButtonDynamicComponentProps<PopupButtonElement>>;
  idPrefix?: string;
  ref?: ComponentRef<PopupButtonElement>;
}>;

export function PopupButton<PopupButtonElement extends HTMLElement = HTMLButtonElement>(
  props: PopupButtonProps<PopupButtonElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'button', idPrefix: 'solid-ui-popup-button' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['idPrefix']);

  const id = useId(localProps.idPrefix);

  const buttonProps = createPanelButtonProps<PopupButtonElement>({ id });

  return (
    <Dynamic<PopupButtonDynamicComponentProps<PopupButtonElement>>
      {...otherProps}
      {...buttonProps}
      id={id}
      data-solid-ui-popup-button=""
    />
  );
}

export type PopupOverlayProps = BaseComponentProps<{
  component?: DynamicComponent<{ id: string }>;
  idPrefix?: string;
  portal?: boolean;
}>;

export function PopupOverlay(props: PopupOverlayProps) {
  props = mergeProps<typeof props[]>(
    { component: 'div', idPrefix: 'solid-ui-popup-overlay', portal: true },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['idPrefix', 'portal']);

  const id = useId(localProps.idPrefix);

  const overlayProps = createPanelOverlayProps({ id });

  const overlay = () => (
    <Dynamic {...otherProps} {...overlayProps} id={id} data-solid-ui-popup-overlay="" />
  );

  const panelState = usePanelState();

  return (
    <Show when={panelState.shouldShowPanel}>
      {localProps.portal ? <OverlayPortal>{overlay()}</OverlayPortal> : overlay()}
    </Show>
  );
}

type PopupPanelDynamicComponentProps<PopupPanelElement extends HTMLElement> =
  PanelProps<PopupPanelElement> & { id: string };

export type PopupPanelProps<PopupPanelElement extends HTMLElement> = BaseComponentProps<
  {
    component?: DynamicComponent<PopupPanelDynamicComponentProps<PopupPanelElement>>;
    portal?: boolean;
    idPrefix?: string;
  } & Omit<CreatePanelPropsConfig<PopupPanelElement>, 'id'>
>;

export function PopupPanel<PopupPanelElement extends HTMLElement = HTMLDivElement>(
  props: PopupPanelProps<PopupPanelElement>
) {
  const panelState = usePanelState();

  props = mergeProps<typeof props[]>(
    {
      clickAway: true,
      component: 'div',
      idPrefix: 'solid-ui-popup-panel',
      get manageFocus() {
        return {
          initialFocusRef: document.getElementById(panelState.buttonId),
        };
      },
      portal: true,
    },
    props
  );

  const [localProps, otherProps] = splitProps(props, [
    'clickAway',
    'idPrefix',
    'manageFocus',
    'portal',
    'ref',
    'tabIndex',
  ]);

  const id = useId(localProps.idPrefix);

  const panelProps = createPanelProps<PopupPanelElement>({
    clickAway: localProps.clickAway,
    id,
    get manageFocus() {
      return localProps.manageFocus;
    },
    ref: localProps.ref,
    tabIndex: localProps.tabIndex,
  });

  const panel = () => {
    return (
      <Dynamic<PopupPanelDynamicComponentProps<PopupPanelElement>>
        {...otherProps}
        {...panelProps}
        id={id}
        data-solid-ui-popup-panel=""
      />
    );
  };

  return (
    <Show when={panelState.isPanelOpen}>
      {localProps.portal ? <Portal>{panel()}</Portal> : panel()}
    </Show>
  );
}
