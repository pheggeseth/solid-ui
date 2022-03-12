import { createEffect, PropsWithChildren, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ComponentRef } from '~/types';
import Disclosure from '../components/Disclosure';

import Popper from '../components/Popper';

export function PopoverTrigger(
  props: PropsWithChildren<{ ref?: ComponentRef<HTMLButtonElement> }>
) {
  const { props: disclosureProps, effects } = Disclosure.createTrigger({
    idPrefix: 'solid-ui-popover-trigger',
  });

  effects();

  return (
    <button ref={props.ref} {...disclosureProps}>
      {props.children}
    </button>
  );
}

export function PopoverOverlay(props: PropsWithChildren) {
  const {
    props: overlayProps,
    createEffects,
    context,
  } = Disclosure.createOverlay({ idPrefix: 'solid-ui-popover-overlay' });

  createEffect(() => {
    if (context.isOverlayOpen()) {
      createEffects();
    }
  });

  return (
    <Show when={context.isOverlayOpen()}>
      <Portal>
        <div {...overlayProps}>{props.children}</div>
      </Portal>
    </Show>
  );
}

export function PopoverDialog(props: PropsWithChildren<{ ref?: ComponentRef<HTMLDivElement> }>) {
  const {
    props: contentProps,
    createEffects,
    context,
  } = Disclosure.createContent({ idPrefix: 'solid-ui-popover-content' });

  createEffect(() => {
    if (context.isDisclosureOpen()) {
      createEffects();
    }
  });

  return (
    <Show when={context.isDisclosureOpen()}>
      <Portal>
        <div ref={props.ref} {...contentProps} data-solid-ui-dialog>
          {props.children}
        </div>
      </Portal>
    </Show>
  );
}

export function PopoverExample() {
  return (
    <Popper>
      <Disclosure>
        <PopoverTrigger ref={Popper.AnchorRef}>Open popover</PopoverTrigger>
        <PopoverOverlay />
        <PopoverDialog ref={Popper.PopperRef}>
          This is the popover.
          <PopoverTrigger>X</PopoverTrigger>
        </PopoverDialog>
      </Disclosure>
    </Popper>
  );
}
