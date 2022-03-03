import { mergeProps, Show, splitProps } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';
import { BaseComponentProps, ComponentRef, DynamicComponent } from '~/types';
import {
  createPanelButtonProps,
  createPanelProps,
  CreatePanelPropsConfig,
  PanelButtonProps,
  PanelProps,
  PanelProvider,
  PanelProviderProps,
  usePanelState,
} from './Panel';
import { PopperProvider } from './Popper';

export type PopoverProviderProps = PanelProviderProps & { popper?: boolean };

export function PopoverProvider(props: PopoverProviderProps) {
  props = mergeProps<typeof props[]>({ popper: true }, props);

  const [localProps, otherProps] = splitProps(props, ['popper']);

  return localProps.popper ? (
    <PopperProvider>
      <PanelProvider {...otherProps} />
    </PopperProvider>
  ) : (
    <PanelProvider {...otherProps} />
  );
}

export type PopoverButtonProps<PopoverButtonElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent<PanelButtonProps<PopoverButtonElement>>;
  idPrefix?: string;
  ref?: ComponentRef<PopoverButtonElement>;
}>;

export function PopoverButton<PopoverButtonElement extends HTMLElement = HTMLButtonElement>(
  props: PopoverButtonProps<PopoverButtonElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'button', idPrefix: 'solid-ui-popover-button' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix']);

  const buttonProps = createPanelButtonProps({
    idPrefix: localProps.idPrefix,
  });

  return <Dynamic {...otherProps} {...buttonProps} component={localProps.component} />;
}

export type PopoverPanelProps<PopoverPanelElement extends HTMLElement> = BaseComponentProps<
  {
    component?: DynamicComponent<PanelProps<PopoverPanelElement>>;
    portal?: boolean;
  } & Partial<CreatePanelPropsConfig<PopoverPanelElement>>
>;

export function PopoverPanel<PopoverPanelElement extends HTMLElement = HTMLDivElement>(
  props: PopoverPanelProps<PopoverPanelElement>
) {
  props = mergeProps<typeof props[]>(
    {
      clickAway: true,
      component: 'div',
      idPrefix: 'solid-ui-popover-panel',
      manageFocus: true,
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

  const panelProps = createPanelProps(localProps as CreatePanelPropsConfig<PopoverPanelElement>);

  const panel = () => (
    <Dynamic
      {...otherProps}
      {...panelProps}
      component={localProps.component}
      data-solid-ui-popover-panel=""
    />
  );

  const panelState = usePanelState();

  return (
    <Show when={panelState.isPanelOpen}>
      {localProps.portal ? <Portal>{panel()}</Portal> : panel()}
    </Show>
  );
}
