export function createControl() {
  const props = createControlProps();

  return {
    props,
  } as const;
}

export function createControlProps() {
  return {
    'data-solid-ui-form-control': '',
    role: 'group',
  } as const;
}
