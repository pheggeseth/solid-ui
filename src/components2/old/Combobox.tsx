import { PropsWithChildren } from 'solid-js';
import Button, { ButtonProps } from './Button';
import {
  DialogContextRefProp,
  exposeDialogExternalContext,
  useDialogButtonLogic,
  useDialogLogic,
} from './Dialog';
import Panel, { PanelProps } from './Panel';

export type ComboboxButtonProps<T extends HTMLElement> = Partial<ButtonProps<T>> &
  DialogContextRefProp;

export function ComboboxButton<T extends HTMLElement = HTMLButtonElement>(
  props: PropsWithChildren<ComboboxButtonProps<T>>
) {
  const buttonProps = useDialogButtonLogic<T>({
    idPrefix: 'solid-ui-combobox-button',
    onClick: props.onClick,
  });

  exposeDialogExternalContext(props);

  return <Button<T> {...props} {...buttonProps} data-solid-ui-combobox-button="" />;
}

export type ComboboxPanelProps<T extends HTMLElement> = PropsWithChildren<Partial<PanelProps<T>>> &
  DialogContextRefProp;

export function ComboboxPanel<T extends HTMLElement = HTMLDivElement>(
  props: ComboboxPanelProps<T>
) {
  const dialogProps = useDialogLogic<T>({
    idPrefix: 'solid-ui-combobox-panel',
    ref: props.ref,
    onKeyDown: props.onKeyDown,
  });

  exposeDialogExternalContext(props);

  return <Panel<T> {...props} {...dialogProps} data-solid-ui-combobox-panel="" />;
}

type ComboboxState = {};

export type ComboboxProviderProps = PropsWithChildren;

export function ComboboxProvider(props: ComboboxProviderProps) {

};
