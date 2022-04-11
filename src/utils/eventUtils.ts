import { Accessor, createEffect, onCleanup, onMount } from 'solid-js';

export const focusableElementsQuery =
  ':is(button, [href], input, select, textarea, [tabindex]):not([tabindex="-1"])';

export function getAllFocusableElements(container: HTMLElement) {
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(focusableElementsQuery)
  ).filter((element) => element.tabIndex !== -1);

  if (elements.length === 0) {
    elements.push(container);
  }

  return elements;
}

export function getFirstFocusableElement(container: HTMLElement): HTMLElement {
  return container.querySelector(focusableElementsQuery) || container;
}

export function createFocusTrapEffect(config: {
  containerId?: string;
  initialFocusIds?: Accessor<string[]>;
  isEnabled?: Accessor<boolean>;
}) {
  createEffect(() => {
    const { isEnabled = () => true } = config;

    if (!isEnabled()) {
      return;
    }

    const container = document.getElementById(config.containerId);

    const elements = getAllFocusableElements(container);
    const initialElements =
      config.initialFocusIds?.()?.map((id) => document.getElementById(id)) || [];
    elements.unshift(...initialElements);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab' || !elements.includes(document.activeElement as HTMLElement)) {
        return;
      }

      const activeIndex = elements.findIndex((el) => el === document.activeElement);

      if (event.shiftKey) {
        elements[activeIndex > 0 ? activeIndex - 1 : elements.length - 1]?.focus();
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

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    });
  });
}

export function focusInitialChildOnMount(config: { containerId: string; initialFocusId?: string }) {
  onMount(() => {
    const container = document.getElementById(config.containerId);
    const initialFocusElement = document.getElementById(config.initialFocusId);

    (initialFocusElement || getFirstFocusableElement(container))?.focus({ preventScroll: true });
  });
}

export function createClickAwayEffect<Container extends HTMLElement>(config: {
  containerId: string;
  exceptionIds?: Accessor<string[]>;
  onClickAway: () => void;
  isEnabled?: Accessor<boolean>;
}) {
  createEffect(() => {
    const container = document.getElementById(config.containerId);

    function handleMouseUp(event: MouseEvent) {
      const { isEnabled = () => true } = config;
      if (!isEnabled()) {
        return;
      }

      if (
        !container.contains(event.target as HTMLElement) &&
        !config.exceptionIds().some((id) => document.getElementById(id) === event.target)
      ) {
        config.onClickAway();
      }
    }

    document.addEventListener('mouseup', handleMouseUp);

    onCleanup(() => {
      document.removeEventListener('mouseup', handleMouseUp);
    });
  });
}
