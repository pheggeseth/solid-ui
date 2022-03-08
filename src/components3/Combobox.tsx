import { mergeProps, PropsWithChildren, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponentProps, DynamicComponent } from '~/types';
import { createComponentContext, getDataProp, useId } from '~/utils/componentUtils';
import { PanelProvider } from './base/Panel';

export type ComboboxContext = {};

type ComboboxContextProp = {
  context?: (ctx: ComboboxContext) => void;
};

export function createComboboxContext() {
  return createComponentContext<ComboboxContext>();
}

export type ComboboxProviderProps<Value> = PropsWithChildren<{
  value?: Value;
  onChange?: (newValue: Value) => void;
}>;

export function ComboboxProvider<Value>(props: ComboboxProviderProps<Value>) {
  return <PanelProvider></PanelProvider>;
}

export type ComboboxInputProps = BaseComponentProps<
  {
    component?: DynamicComponent<{ id: string }>;
    idPrefix?: string;
  } & ComboboxContextProp
>;

export function ComboboxInput(props: ComboboxInputProps) {
  props = mergeProps<typeof props[]>(
    { component: 'input', idPrefix: 'solid-ui-combobox-input' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix']);

  const id = useId(localProps.idPrefix);

  const finalProps = mergeProps(otherProps, getDataProp(localProps.idPrefix));

  localProps.context?.(createComboboxContext());

  return <Dynamic {...finalProps} component={localProps.component} id={id} />;
}

export type ComboboxPopupProps = BaseComponentProps;

export function ComboboxPopup(props: ComboboxPopupProps) {}

export type ComboboxListProps = BaseComponentProps;

export function ComboboxList(props: ComboboxListProps) {}

export type ComboboxOptionProps = BaseComponentProps;

export function ComboboxOption(props: ComboboxOptionProps) {}
