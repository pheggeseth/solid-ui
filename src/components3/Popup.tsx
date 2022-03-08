import { mergeProps, Show, splitProps } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';
import { BaseComponentProps, ComponentRef, DynamicComponent } from '~/types';
import { useId } from '~/utils/componentUtils';
import {
  createPanelButtonProps,
  createPanelOverlayProps,
  createPanelProps,
  CreatePanelPropsConfig,
  exposePanelExternalContext,
  OverlayPortal,
  PanelButtonProps,
  PanelContext,
  PanelContextProp,
  PanelProps,
  PanelProvider,
  PanelProviderProps,
  usePanelState,
} from './base/Panel';
import { PopperProvider } from './Popper';

export type PopupContext = PanelContext;

export type PopupProviderProps = PanelProviderProps & { popper?: boolean };

export function PopupProvider(props: PopupProviderProps) {
  props = mergeProps<typeof props[]>({ popper: true, role: 'dialog' }, props);

  const [localProps, otherProps] = splitProps(props, ['popper']);

  const provider = () => <PanelProvider {...otherProps} />;

  return localProps.popper ? <PopperProvider>{provider()}</PopperProvider> : provider();
}

export type PopupButtonProps<PopupButtonElement extends HTMLElement> = BaseComponentProps<
  {
    component?: DynamicComponent<PanelButtonProps<PopupButtonElement> & { id: string }>;
    idPrefix?: string;
    ref?: ComponentRef<PopupButtonElement>;
  } & PanelContextProp
>;

export function PopupButton<PopupButtonElement extends HTMLElement = HTMLButtonElement>(
  props: PopupButtonProps<PopupButtonElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'button', idPrefix: 'solid-ui-popup-button' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix']);

  const id = useId(localProps.idPrefix);

  const buttonProps = createPanelButtonProps<PopupButtonElement>({ id });

  const finalProps = mergeProps(otherProps, buttonProps);

  exposePanelExternalContext(localProps);

  return (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      id={id}
      data-solid-ui-popup-button=""
    />
  );
}

export type PopupOverlayProps = BaseComponentProps<
  {
    component?: DynamicComponent<{ id: string }>;
    idPrefix?: string;
    portal?: boolean;
  } & PanelContextProp
>;

export function PopupOverlay(props: PopupOverlayProps) {
  props = mergeProps<typeof props[]>(
    { component: 'div', idPrefix: 'solid-ui-popup-overlay', portal: true },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['context', 'idPrefix', 'portal']);

  const id = useId(localProps.idPrefix);

  const overlayProps = createPanelOverlayProps({ id });

  const overlay = () => (
    <Dynamic {...otherProps} {...overlayProps} id={id} data-solid-ui-popup-overlay="" />
  );

  const panelState = usePanelState();

  exposePanelExternalContext(localProps);

  return (
    <Show when={panelState.shouldShowPanel}>
      {localProps.portal ? <OverlayPortal>{overlay()}</OverlayPortal> : overlay()}
    </Show>
  );
}

export type PopupPanelProps<PopupPanelElement extends HTMLElement> = BaseComponentProps<
  {
    component?: DynamicComponent<PanelProps<PopupPanelElement> & { id: string }>;
    portal?: boolean;
    idPrefix?: string;
  } & Omit<CreatePanelPropsConfig<PopupPanelElement>, 'id'> &
    PanelContextProp
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
    'context',
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

  const finalProps = mergeProps(otherProps, panelProps);

  const panel = () => {
    return (
      <Dynamic
        {...finalProps}
        component={localProps.component}
        id={id}
        data-solid-ui-popup-panel=""
      />
    );
  };

  exposePanelExternalContext(localProps);

  return (
    <Show when={panelState.isPanelOpen}>
      <Show when={localProps.portal} fallback={panel}>
        <Portal>{panel()}</Portal>
      </Show>
    </Show>
  );
}
