import { Accessor, mergeProps, PropsWithChildren, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponentProps, ComponentRef, DynamicComponent } from '~/types';
import { getCreateComponentContext, useId } from '~/utils/componentUtils';
import {
  createExternalContext,
  createPanelButtonProps,
  createPanelProps,
  PanelButtonProps,
  PanelContext,
  PanelContextProp,
  PanelProps,
  PanelProvider,
  PanelProviderProps,
  usePanelState,
} from './base/Panel';

export type DisclosureContext = PanelContext;

export const createDisclosureContext = getCreateComponentContext<DisclosureContext>();

type DisclosureContextProp = PanelContextProp;

export type DisclosureProviderProps = PanelProviderProps;

export function DisclosureProvider(props: DisclosureProviderProps) {
  return <PanelProvider {...props} />;
}

export type DisclosureButtonProps<DisclosureButtonElement extends HTMLElement> = BaseComponentProps<
  {
    component?: DynamicComponent<PanelButtonProps<DisclosureButtonElement> & { id: string }>;
    idPrefix?: string;
  } & DisclosureContextProp
>;

export function DisclosureButton<DisclosureButtonElement extends HTMLElement = HTMLButtonElement>(
  props: DisclosureButtonProps<DisclosureButtonElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'button', idPrefix: 'solid-ui-disclosure-button' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix']);

  const id = useId(localProps.idPrefix);

  const panelButtonProps = createPanelButtonProps<DisclosureButtonElement>({ id });

  const finalProps = mergeProps(otherProps, panelButtonProps);

  localProps.context?.(createExternalContext());

  return (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      data-solid-ui-disclosure-button=""
      id={id}
    />
  );
}

export type DisclosureProps<DisclosureElement extends HTMLElement> = BaseComponentProps<
  {
    component?: DynamicComponent<PanelProps<DisclosureElement> & { id: string }>;
    idPrefix?: string;
  } & DisclosureContextProp
>;

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

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix']);

  const id = useId(localProps.idPrefix);

  const panelProps = createPanelProps({ id });

  const finalProps = mergeProps(otherProps, panelProps);

  const panelState = usePanelState();

  localProps.context?.(createExternalContext());

  return (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      data-hidden={!panelState.isPanelOpen ? '' : undefined}
      data-solid-ui-disclosure-panel=""
      id={id}
    />
  );
}
