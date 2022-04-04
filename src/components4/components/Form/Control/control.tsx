export function createControl() {
  const props = createControlProps();

  return {
    props,
  } as const;
}

export function createControlProps() {
  return {
    role: 'group',
  } as const;
}
