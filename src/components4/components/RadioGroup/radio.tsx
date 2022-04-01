import { Accessor, JSX, mergeProps, onCleanup, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import {
  useRadioGroupActions,
  useRadioGroupContext,
  useRadioGroupSelectors,
  useRadioGroupState,
} from './context';

export type RadioConfig<Value, RadioElement extends HTMLElement> = {
  idPrefix?: string;
  onClick?: JSX.EventHandler<RadioElement, MouseEvent>;
  onMouseEnter?: JSX.EventHandler<RadioElement, MouseEvent>;
  onMouseLeave?: JSX.EventHandler<RadioElement, MouseEvent>;
  value?: Accessor<Value>;
};

export function createRadio<Value, RadioElement extends HTMLElement = HTMLElement>(
  config: RadioConfig<Value, RadioElement> = {}
) {
  const props = createRadioProps(config);
  const handlers = createRadioHandlers({ id: props.id, ...config });

  const selectors = useRadioGroupSelectors<Value>();

  const context = {
    ...useRadioGroupContext(),
    isActive: () => selectors.isActive(props.id),
    isSelected: () => selectors.isSelected(config.value?.()),
  } as const;

  return {
    props: mergeProps(props, handlers),
    effects: () => createRadioEffects({ id: props.id, value: config.value }),
    context,
  } as const;
}

export function createRadioProps<Value, RadioElement extends HTMLElement = HTMLElement>(
  config: RadioConfig<Value, RadioElement>
) {
  const { idPrefix = 'solid-ui-radiogroup-radio' } = config;
  const id = useId(idPrefix);

  const selectors = useRadioGroupSelectors<Value>();

  return {
    get ['aria-checked']() {
      return selectors.isSelected(config.value?.());
    },
    get ['data-active']() {
      return selectors.isActive(id) ? '' : undefined;
    },
    get ['data-checked']() {
      return selectors.isSelected(config.value?.()) ? '' : undefined;
    },
    ...getDataProp(idPrefix),
    id,
    role: 'radio',
    tabIndex: -1,
  } as const;
}

export function createRadioHandlers<RadioElement extends HTMLElement = HTMLElement>(config: {
  id: string;
  onClick?: JSX.EventHandler<RadioElement, MouseEvent>;
  onMouseEnter?: JSX.EventHandler<RadioElement, MouseEvent>;
  onMouseLeave?: JSX.EventHandler<RadioElement, MouseEvent>;
}) {
  const actions = useRadioGroupActions();

  const onClick: JSX.EventHandler<RadioElement, MouseEvent> = (event) => {
    actions.chooseValue(config.id);
    config.onClick?.(event);
  };

  const onMouseEnter: JSX.EventHandler<RadioElement, MouseEvent> = (event) => {
    actions.focusItem(config.id);
    config.onMouseEnter?.(event);
  };

  const onMouseLeave: JSX.EventHandler<RadioElement, MouseEvent> = (event) => {
    actions.clearItemFocus();
    config.onMouseLeave?.(event);
  };

  return {
    onClick,
    onMouseEnter,
    onMouseLeave,
  } as const;
}

export type CreateRadioEffectsConfig<Value> = { id: string; value: Accessor<Value> };

export function createRadioEffects<Value>(config: CreateRadioEffectsConfig<Value>) {
  addRadioOnMount(config);
  removeRadioOnCleanup(config);
  addValueOnMount(config);
  removeValueOnCleanup(config);
}

export function addRadioOnMount(config: { id: string }) {
  const actions = useRadioGroupActions();
  onMount(() => {
    actions.addItem(config.id);
  });
}

export function removeRadioOnCleanup(config: { id: string }) {
  const actions = useRadioGroupActions();
  onCleanup(() => {
    actions.removeItem(config.id);
  });
}

export function addValueOnMount<Value>(config: CreateRadioEffectsConfig<Value>) {
  const actions = useRadioGroupActions<Value>();
  onMount(() => {
    actions.addValue(config.id, config.value());
  });
}

export function removeValueOnCleanup<Value>(config: CreateRadioEffectsConfig<Value>) {
  const actions = useRadioGroupActions<Value>();
  onCleanup(() => {
    actions.removeValue(config.id);
  });
}
