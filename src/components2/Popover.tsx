import { mergeProps, splitProps } from 'solid-js';
import {
  DisclosureProvider,
  DisclosureProviderProps,
  DisclosureButton,
  Disclosure,
  DisclosureProps,
  DisclosureButtonProps,
} from './Disclosure';
import { PopperProvider } from './Popper';

export type PopoverProviderProps = DisclosureProviderProps & { popper?: boolean };

export function PopoverProvider(props: PopoverProviderProps) {
  props = mergeProps<typeof props[]>({ popper: true }, props);

  const [localProps, otherProps] = splitProps(props, ['popper']);

  return localProps.popper ? (
    <PopperProvider>
      <DisclosureProvider {...otherProps} />
    </PopperProvider>
  ) : (
    <DisclosureProvider {...otherProps} />
  );
}

export type PopoverButtonProps<PopoverButtonElement extends HTMLElement> =
  DisclosureButtonProps<PopoverButtonElement>;

export function PopoverButton<PopoverButtonElement extends HTMLElement = HTMLButtonElement>(
  props: PopoverButtonProps<PopoverButtonElement>
) {
  props = mergeProps<typeof props[]>({ idPrefix: 'solid-ui-popover-button' }, props);

  return <DisclosureButton {...props} data-solid-ui-popover-button="" />;
}

export type PopoverPanelProps<PopoverPanelElement extends HTMLElement> =
  DisclosureProps<PopoverPanelElement>;

export function PopoverPanel<PopoverPanelElement extends HTMLElement = HTMLDivElement>(
  props: PopoverPanelProps<PopoverPanelElement>
) {
  props = mergeProps<typeof props[]>(
    { clickAway: true, idPrefix: 'solid-ui-popover-panel', manageFocus: true, portal: true },
    props
  );

  return <Disclosure {...props} data-solid-ui-popover-panel="" />;
}
