import { mergeProps, PropsWithChildren, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponentProps, ComponentRef, DynamicComponent } from '~/types';
import {
  createPanelButtonProps,
  createPanelProps,
  PanelButtonProps,
  PanelExternalContext,
  PanelProps,
  PanelProvider,
  PanelProviderProps,
} from './Panel';

export type DisclosureContext = PanelExternalContext;

export type DisclosureProviderProps = PanelProviderProps;

export function DisclosureProvider(props: DisclosureProviderProps) {
  return <PanelProvider {...props} />;
}

export type DisclosureButtonProps<DisclosureButtonElement extends HTMLElement> =
  BaseComponentProps<{
    component?: DynamicComponent<PanelButtonProps<DisclosureButtonElement>>;
    idPrefix?: string;
    ref?: ComponentRef<DisclosureButtonElement>;
  }>;

export function DisclosureButton<DisclosureButtonElement extends HTMLElement = HTMLButtonElement>(
  props: DisclosureButtonProps<DisclosureButtonElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'button', idPrefix: 'solid-ui-disclosure-button' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix']);

  const panelButtonProps = createPanelButtonProps<DisclosureButtonElement>({
    idPrefix: localProps.idPrefix,
  });

  return (
    <Dynamic
      {...otherProps}
      {...panelButtonProps}
      component={localProps.component}
      data-solid-ui-disclosure-button=""
    />
  );
}

export type DisclosureProps<DisclosureElement extends HTMLElement> = BaseComponentProps<{
  component?: DynamicComponent<PanelProps<DisclosureElement>>;
  idPrefix?: string;
}>;

export function DisclosurePanel<DisclosurePanelElement extends HTMLElement = HTMLDivElement>(
  props: DisclosureProps<DisclosurePanelElement>
) {
  props = mergeProps<typeof props[]>(
    {
      component: 'div',
      idPrefix: 'solid-ui-disclosure-panel',
    },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix']);

  const panelProps = createPanelProps({
    idPrefix: localProps.idPrefix,
  });

  return (
    <Dynamic
      {...otherProps}
      {...panelProps}
      component={localProps.component}
      data-solid-ui-disclosure-panel=""
    />
  );
}
