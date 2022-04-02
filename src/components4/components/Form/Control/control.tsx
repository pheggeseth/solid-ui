export function createFormControl() {
  const props = createFormControlProps();

  return {
    props,
  } as const;
}

export function createFormControlProps() {
  return {
    role: 'group',
  } as const;
}
