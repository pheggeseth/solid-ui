import type { Accessor } from 'solid-js';
import { createEffect } from 'solid-js';

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
