import { createPopper, Options } from '@popperjs/core';
import { createEffect, createSignal } from 'solid-js';

export function usePopper(props: Partial<Options> = {}): {
  setTriggerReference(element: HTMLElement): void;
  setAnchorReference(element: HTMLElement): void;
  setPopperReference(element: HTMLElement): void;
} {
  const [triggerReference, setTriggerReference] = createSignal<HTMLElement>();
  const [anchorReference, setAnchorReference] = createSignal<HTMLElement>();
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
        modifiers: [
          ...(otherProps.modifiers || []),
          {
            name: 'offset',
            options: { offset: [0, 4] },
          },
        ],
      });
    }
  });

  return {
    setTriggerReference,
    setAnchorReference,
    setPopperReference,
  };
}
