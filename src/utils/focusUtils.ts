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

export function getAllFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableElementsQuery)).filter(
    (element) => element.tabIndex !== -1
  );
}

export function getFirstFocusableElement(container: HTMLElement): HTMLElement {
  return container.querySelector(focusableElementsQuery) || container;
}

export function useFocusTrap(
  container: HTMLElement,
  isActive: Accessor<boolean>,
  initialFocusRef?: HTMLElement
) {
  createEffect((prevIsActive) => {
    if (container && isActive()) {
      if (prevIsActive) return;

      const elements = getAllFocusableElements(container);
      if (initialFocusRef && !elements.includes(initialFocusRef)) {
        elements.unshift(initialFocusRef);
      }

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key !== 'Tab' || !elements.includes(document.activeElement as HTMLElement))
          return;

        const activeIndex = elements.findIndex((el) => el === document.activeElement);

        if (event.shiftKey) {
          elements[activeIndex <= 0 ? elements.length - 1 : activeIndex - 1]?.focus();
          event.preventDefault();
        } else {
          elements[activeIndex < elements.length - 1 ? activeIndex + 1 : 0]?.focus();
          event.preventDefault();
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
