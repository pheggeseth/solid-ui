import { Accessor, createEffect, onCleanup } from 'solid-js';

export function useFocusOnOpen(element: HTMLElement, isOpen: Accessor<boolean>) {
  createEffect((prevIsOpen) => {
    if (!prevIsOpen && isOpen()) element.focus();
    return isOpen();
  });
}

export function useFocusOnClose(element: HTMLElement, isOpen: Accessor<boolean>) {
  createEffect((prevIsOpen) => {
    if (prevIsOpen && !isOpen()) element.focus();
    return isOpen();
  });
}

export const focusableElementsQuery =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function getAllFocusableElements(container: HTMLElement): NodeListOf<HTMLElement> {
  return container.querySelectorAll(focusableElementsQuery);
}

export function getFirstFocusableElement(container: HTMLElement): HTMLElement {
  return container.querySelector(focusableElementsQuery) || container;
}

export function useFocusTrap(container: HTMLElement, isActive: Accessor<boolean>) {
  createEffect((prevIsActive) => {
    if (container && isActive()) {
      if (prevIsActive) return;

      const elements = getAllFocusableElements(container);
      const firstElement = elements[0] as HTMLElement;
      const lastElement = elements[elements.length - 1] as HTMLElement;

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key !== 'Tab') return;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }

      function handleMouseDown(event: MouseEvent) {
        if (
          container.contains(document.activeElement) &&
          !container.contains(event.target as Element)
        ) {
          event.preventDefault();
        }
      }

      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('keydown', handleKeyDown);

      onCleanup(() => {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('keydown', handleKeyDown);
      });

      return isActive();
    }
  });
}
