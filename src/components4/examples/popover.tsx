import { createEffect, PropsWithChildren, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ComponentRef } from '~/types';
import Popover from '../components/Popover';

import Popper from '../components/Popper';

export function PopoverTrigger(
  props: PropsWithChildren<{ ref?: ComponentRef<HTMLButtonElement> }>
) {
  const { props: popoverProps, effects } = Popover.createTrigger();

  effects();

  return (
    <button ref={props.ref} {...popoverProps}>
      {props.children}
    </button>
  );
}

export function PopoverOverlay(props: PropsWithChildren) {
  const { props: overlayProps, createEffects, context } = Popover.createOverlay();

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
  const { props: dialogProps, createEffects, context } = Popover.createDialog();

  createEffect(() => {
    if (context.isPopoverOpen()) {
      createEffects();
    }
  });

  return (
    <Show when={context.isPopoverOpen()}>
      <Portal>
        <div ref={props.ref} {...dialogProps}>
          {props.children}
        </div>
      </Portal>
    </Show>
  );
}

export function PopoverExample() {
  return (
    <Popper>
      <Popover>
        <PopoverTrigger ref={Popper.AnchorRef}>Open popover</PopoverTrigger>
        <PopoverOverlay />
        <PopoverDialog ref={Popper.PopperRef}>
          This is the popover.
          <PopoverTrigger>X</PopoverTrigger>
        </PopoverDialog>
      </Popover>
    </Popper>
  );
}
