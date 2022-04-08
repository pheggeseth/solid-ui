import { JSX } from 'solid-js';

export interface KeyHandlerObject<T> {
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
