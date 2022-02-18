const ids = new Map<string, number>();

export function useId(prefix: string) {
  ids.set(prefix, ids.has(prefix) ? ids.get(prefix) + 1 : 1);

  return `${prefix}-${ids.get(prefix)}`;
}
