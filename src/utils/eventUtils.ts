import { createEffect, JSX, onCleanup } from 'solid-js';

interface KeyHandlerObject<T> {
  [key: string]: JSX.EventHandler<T, KeyboardEvent>;
}

export function useKeyEventHandlers<T extends HTMLElement = HTMLElement>(
  handlers: KeyHandlerObject<T>
): JSX.EventHandler<T, KeyboardEvent> {
  return (event) => {
    if (handlers[event.key]) {
      handlers[event.key](event);
    } else {
      handlers.default?.(event);
    }
  };
}

export function useOnClickAway(
  container: HTMLElement,
  onClickAway: () => void,
  options: {
    exceptions?: HTMLElement[];
    shouldContainActiveElement?: boolean;
  } = {}
) {
  const { exceptions = [], shouldContainActiveElement } = options;

  createEffect(() => {
    function handleMouseUp(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        (shouldContainActiveElement ? container.contains(document.activeElement) : true) &&
        !container.contains(target) &&
        !exceptions.includes(target)
      ) {
        onClickAway();
        if (exceptions.includes(target)) {
          target.focus();
        }
      }
    }

    document.addEventListener('mouseup', handleMouseUp);

    onCleanup(() => {
      document.removeEventListener('mouseup', handleMouseUp);
    });
  });
}
