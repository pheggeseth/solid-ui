import { createEffect, PropsWithChildren, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ComponentRef } from '~/types';
import Popover from '../components/Popover';

import Popper from '../components/Popper';

export function PopoverTrigger(
  props: PropsWithChildren<{ ref?: ComponentRef<HTMLButtonElement> }>
) {
  const { props: triggerProps, effects } = Popover.createTrigger({
    idPrefix: 'solid-ui-popover-trigger',
  });

  effects();

  return (
    <button ref={props.ref} {...triggerProps}>
      {props.children}
    </button>
  );
}

export function PopoverOverlay(props: PropsWithChildren) {
  const {
    props: overlayProps,
    effects,
    context,
  } = Popover.createOverlay({ idPrefix: 'solid-ui-popover-overlay' });

  createEffect(() => {
    if (context.isOverlayOpen()) {
      effects();
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

export function PopoverPanel(props: PropsWithChildren<{ ref?: ComponentRef<HTMLDivElement> }>) {
  const {
    props: panelProps,
    effects,
    context,
  } = Popover.createPanel({ idPrefix: 'solid-ui-popover-panel' });

  createEffect(() => {
    if (context.isPopoverOpen()) {
      effects();
    }
  });

  return (
    <Show when={context.isPopoverOpen()}>
      <Portal>
        <div ref={props.ref} {...panelProps}>
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
        <PopoverPanel ref={Popper.PopperRef}>
          This is the popover.
          <PopoverTrigger>X</PopoverTrigger>
        </PopoverPanel>
      </Popover>
    </Popper>
  );
}
