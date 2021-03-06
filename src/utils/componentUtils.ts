import { ComponentRef } from '~/types';

const ids = new Map<string, number>();

export function useId(prefix: string) {
  ids.set(prefix, ids.has(prefix) ? ids.get(prefix) + 1 : 1);

  return `${prefix}-${ids.get(prefix)}`;
}

export function setRef<T extends HTMLElement>(ref: ComponentRef<T>, element: T) {
  if (ref) {
    if (typeof ref === 'function') {
      ref(element);
    } else {
      ref = element;
    }
  }
}

export function createComponentContext<ComponentContext>() {
  const context = (ctx: ComponentContext) => {
    Object.entries(ctx).forEach(
      ([contextKey, contextValue]) => (context[contextKey] = contextValue)
    );
  };

  return context as {
    (ctx: ComponentContext): void;
  } & ComponentContext;
}

export const getDataProp = (prefix: string) => (prefix ? { [`data-${prefix}`]: '' } : {});
