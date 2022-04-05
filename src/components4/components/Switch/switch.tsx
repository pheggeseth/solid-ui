import { Accessor, JSX, mergeProps, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useSwitchActions, useSwitchState } from './context';

export type CreateSwitchConfig<SwitchElement extends HTMLElement = HTMLElement> = {
  checked?: Accessor<boolean>;
  idPrefix?: string;
  onChange?: (checked: boolean) => void;
  onClick?: JSX.EventHandler<SwitchElement, MouseEvent>;
  onKeyPress?: JSX.EventHandler<SwitchElement, KeyboardEvent>;
  onKeyUp?: JSX.EventHandler<SwitchElement, KeyboardEvent>;
};

export function createSwitch<SwitchElement extends HTMLElement = HTMLElement>(
  config: CreateSwitchConfig = {}
) {
  const props = createSwitchProps(config);
  const handlers = createSwitchHandlers<SwitchElement>(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createSwitchEffects({ id: props.id }),
  } as const;
}

export function createSwitchProps(config: CreateSwitchConfig) {
  const { idPrefix = 'solid-ui-switch' } = config;
  const id = useId(idPrefix);
  const state = useSwitchState();

  return {
    get ['aria-checked']() {
      return config.checked();
    },
    get ['aria-describedby']() {
      return state.descriptionId;
    },
    get ['aria-labelledby']() {
      return state.labelId;
    },
    ...getDataProp(idPrefix),
    get ['data-checked']() {
      return config.checked() ? '' : undefined;
    },
    id,
    role: 'switch',
    tabIndex: 0,
  } as const;
}

export function createSwitchHandlers<SwitchElement extends HTMLElement = HTMLElement>(
  config: CreateSwitchConfig = {}
) {
  const toggle = () => config.onChange?.(!config.checked?.());

  const onClick: JSX.EventHandler<SwitchElement, MouseEvent> = (event) => {
    toggle();
    config.onClick?.(event);
  };

  const onKeyPress: JSX.EventHandler<SwitchElement, KeyboardEvent> = (event) => {
    event.preventDefault();
    config.onKeyPress?.(event);
  };

  const onKeyUp: JSX.EventHandler<SwitchElement, KeyboardEvent> = (event) => {
    if (event.key !== 'Tab') {
      event.preventDefault();
    }

    if (event.key === ' ') {
      toggle();
    }

    config.onKeyUp?.(event);
  };

  return {
    onClick,
    onKeyPress,
    onKeyUp,
  } as const;
}

export function createSwitchEffects(config: { id: string }) {
  registerSwitchIdOnMount(config);
}

export function registerSwitchIdOnMount(config: { id: string }) {
  const actions = useSwitchActions();
  onMount(() => {
    actions.setElementId('switchId', config.id);
  });
}
