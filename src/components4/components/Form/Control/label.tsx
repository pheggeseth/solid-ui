import { onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useFormControlActions, useFormControlContext, useFormControlState } from './context';

export type CreateFormControlLabelConfig = {
  idPrefix?: string;
};

export function createFormControlLabel(config: CreateFormControlLabelConfig) {
  const props = createFormControlLabelProps(config);

  return {
    props,
    effects: () => createFormControlLabelEffects({ id: props.id }),
    context: useFormControlContext(),
  } as const;
}

export function createFormControlLabelProps(config: CreateFormControlLabelConfig) {
  const { idPrefix = 'solid-ui-form-control-label' } = config;
  const id = useId(idPrefix);
  const state = useFormControlState();

  return {
    ...getDataProp(idPrefix),
    get for() {
      return state.fieldId;
    },
    id,
  } as const;
}

export function createFormControlLabelEffects(config: { id: string }) {
  registerLabelIdOnMount(config);
}

export function registerLabelIdOnMount(config: { id: string }) {
  const actions = useFormControlActions();
  onMount(() => {
    actions.setElementId('labelId', config.id);
  });
}
