import { onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useFormControlActions, useFormControlContext, useFormControlState } from './context';

export type CreateFormControlLabelConfig = {
  idPrefix?: string;
};

export function createLabel(config: CreateFormControlLabelConfig = {}) {
  const props = createLabelProps(config);

  return {
    props,
    effects: () => createLabelEffects({ id: props.id }),
    context: useFormControlContext(),
  } as const;
}

export function createLabelProps(config: CreateFormControlLabelConfig) {
  const { idPrefix = 'solid-ui-form-control-label' } = config;
  const id = useId(idPrefix);
  const state = useFormControlState();

  return {
    get ['data-focused']() {
      return state.hasFocus ? '' : undefined;
    },
    ...getDataProp(idPrefix),
    get for() {
      return state.fieldId;
    },
    id,
  } as const;
}

export function createLabelEffects(config: { id: string }) {
  registerLabelIdOnMount(config);
}

export function registerLabelIdOnMount(config: { id: string }) {
  const actions = useFormControlActions();
  onMount(() => {
    actions.setElementId('labelId', config.id);
  });
}
