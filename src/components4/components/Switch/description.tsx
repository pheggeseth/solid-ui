import { onMount } from 'solid-js';
import { useId } from '~/utils/componentUtils';
import { useSwitchActions } from './context';

export type CreateDescriptionConfig = {
  idPrefix?: string;
};

export function createDescription(config: CreateDescriptionConfig = {}) {
  const props = createDescriptionProps(config);

  return {
    props,
    effects: () => createDescriptionEffects({ id: props.id }),
  } as const;
}

export function createDescriptionProps(config: CreateDescriptionConfig = {}) {
  const { idPrefix = 'solid-ui-switch-description' } = config;
  const id = useId(idPrefix);

  return {
    id,
  } as const;
}

export function createDescriptionEffects(config: { id: string }) {
  registerDescriptionIdOnMount(config);
}

export function registerDescriptionIdOnMount(config: { id: string }) {
  const actions = useSwitchActions();
  onMount(() => {
    actions.setElementId('descriptionId', config.id);
  });
}
