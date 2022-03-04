import { createMemo, mergeProps, PropsWithChildren, Show, splitProps } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';
import { BaseComponentProps, ComponentRef, DynamicComponent } from '~/types';
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

export type PopupButtonProps<PopupButtonElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent<PanelButtonProps<PopupButtonElement>>;
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

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix']);

  const buttonProps = createPanelButtonProps<PopupButtonElement>({
    idPrefix: localProps.idPrefix,
  });

  return <Dynamic {...otherProps} {...buttonProps} component={localProps.component} />;
}

export type PopupOverlayProps = BaseComponentProps<{
  component?: DynamicComponent;
  idPrefix?: string;
  portal?: boolean;
}>;

export function PopupOverlay(props: PopupOverlayProps) {
  props = mergeProps<typeof props[]>(
    { component: 'div', idPrefix: 'solid-ui-popup-overlay', portal: true },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix', 'portal']);

  const overlayProps = createPanelOverlayProps({
    idPrefix: localProps.idPrefix,
  });

  const overlay = () => (
    <Dynamic {...otherProps} {...overlayProps} component={localProps.component} />
  );

  const panelState = usePanelState();

  return (
    <Show when={panelState.shouldShowPanel}>
      {localProps.portal ? <OverlayPortal>{overlay()}</OverlayPortal> : overlay()}
    </Show>
  );
}

export type PopupPanelProps<PopupPanelElement extends HTMLElement> = BaseComponentProps<
  {
    component?: DynamicComponent<PanelProps<PopupPanelElement>>;
    portal?: boolean;
  } & Partial<CreatePanelPropsConfig<PopupPanelElement>>
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
    'component',
    'idPrefix',
    'manageFocus',
    'portal',
    'ref',
    'tabIndex',
  ]);

  const panelProps = createPanelProps<PopupPanelElement>(
    localProps as CreatePanelPropsConfig<PopupPanelElement>
  );

  const panel = () => {
    return (
      <Dynamic
        {...otherProps}
        {...panelProps}
        component={localProps.component}
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
