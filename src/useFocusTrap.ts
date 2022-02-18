import { createEffect, Accessor, onCleanup } from 'solid-js';
import { getAllFocusableElements } from '~/focusUtils';

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

export default useFocusTrap;
