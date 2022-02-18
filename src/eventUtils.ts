interface KeyHandlerObject {
  [key: string]: (event: KeyboardEvent) => void;
}

export function useKeyEventHandlers(handlers: KeyHandlerObject) {
  return (event: KeyboardEvent) => {
    if (handlers[event.key]) {
      handlers[event.key](event);
    } else {
      handlers.default?.(event);
    }
  };
}
