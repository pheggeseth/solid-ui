import { PropsWithChildren } from 'solid-js';
import {
  Dialog,
  Button,
  ButtonProps,
  DialogProps,
  useDialogButtonLogic,
  useDialogLogic,
} from './Dialog';

export type ComboboxButtonProps<T extends HTMLElement> = Partial<ButtonProps<T>>;

export function ComboboxButton<T extends HTMLElement = HTMLButtonElement>(
  props: PropsWithChildren<ComboboxButtonProps<T>>
) {
  const buttonProps = useDialogButtonLogic<T>({
    idPrefix: 'solid-ui-combobox-button',
    onClick: props.onClick,
  });

  return <Button<T> {...props} {...buttonProps} data-solid-ui-combobox-button="" />;
}

export type ComboboxPanelProps<T extends HTMLElement> = Partial<DialogProps<T>>;

export function ComboboxPanel<T extends HTMLElement = HTMLDivElement>(
  props: PropsWithChildren<ComboboxPanelProps<T>>
) {
  const panelProps = useDialogLogic<T>({
    idPrefix: 'solid-ui-combobox-panel',
    ref: props.ref,
    onKeyDown: props.onKeyDown,
  });

  return <Dialog<T> {...props} {...panelProps} data-solid-ui-combobox-panel="" />;
}
