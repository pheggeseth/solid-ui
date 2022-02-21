import { createPopper, Options } from '@popperjs/core';
import { createEffect, createSignal } from 'solid-js';

export function usePopper(props: Partial<Options> = {}): {
  setTriggerReference(element: Element): void;
  setAnchorReference(element: Element): void;
  setPopperReference(element: HTMLElement): void;
} {
  const [triggerReference, setTriggerReference] = createSignal<Element>();
  const [anchorReference, setAnchorReference] = createSignal<Element>();
  const [popper, setPopperReference] = createSignal<HTMLElement>();

  let popperInstance;

  createEffect(() => {
    popperInstance?.destroy();

    const anchor = anchorReference();
    const trigger = triggerReference();
    const reference = anchor || trigger;

    if (reference && popper()) {
      const { placement = 'bottom-start', ...otherProps } = props;

      popperInstance = createPopper(reference, popper(), {
        placement,
        ...otherProps,
      });
    }
  });

  return {
    setTriggerReference,
    setAnchorReference,
    setPopperReference,
  };
}
