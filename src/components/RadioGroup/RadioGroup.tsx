import { JSX, mergeProps, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useKeyEventHandlers } from "~/utils/useKeyEventHandlers";
import { useRadioGroupActions, useRadioGroupContext, useRadioGroupState } from './context';

export type RadioGroupConfig<RadioGroupElement extends HTMLElement> = {
  idPrefix?: string;
  onBlur?: JSX.EventHandler<RadioGroupElement, FocusEvent>;
  onFocus?: JSX.EventHandler<RadioGroupElement, FocusEvent>;
  onKeyDown?: JSX.EventHandler<RadioGroupElement, KeyboardEvent>;
};

export function createRadioGroup<RadioGroupElement extends HTMLElement = HTMLElement>(
  config: RadioGroupConfig<RadioGroupElement> = {}
) {
  const props = createRadioGroupProps(config);
  const handlers = createRadioGroupHandlers(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createRadioGroupEffects(),
    context: useRadioGroupContext(),
  } as const;
}

function createRadioGroupProps<RadioGroupElement extends HTMLElement = HTMLElement>(
  config: RadioGroupConfig<RadioGroupElement> = {}
) {
  const { idPrefix = 'solid-ui-radiogroup' } = config;
  const id = useId(idPrefix);

  const state = useRadioGroupState();

  return {
    get ['aria-activedescendent']() {
      return state.activeItemId;
    },
    get ['aria-labelledby']() {
      return state.labelId;
    },
    ...getDataProp(idPrefix),
    id,
    role: 'radiogroup',
    tabIndex: 0,
  } as const;
}

export function createRadioGroupHandlers<RadioGroupElement extends HTMLElement = HTMLElement>(
  config: RadioGroupConfig<RadioGroupElement> = {}
) {
  const state = useRadioGroupState();
  const actions = useRadioGroupActions();

  const onBlur: JSX.EventHandler<RadioGroupElement, FocusEvent> = (event) => {
    actions.clearItemFocus();
    config.onBlur?.(event);
  };

  const onFocus: JSX.EventHandler<RadioGroupElement, FocusEvent> = (event) => {
    actions.initializeItemFocus();
    config.onFocus?.(event);
  };

  const keydownHandlers = useKeyEventHandlers<RadioGroupElement>({
    ArrowUp(event) {
      event.preventDefault();
      actions.focusPreviousItem();
      actions.chooseValue(state.activeItemId);
    },
    ArrowDown(event) {
      event.preventDefault();
      actions.focusNextItem();
      actions.chooseValue(state.activeItemId);
    },
    ArrowLeft(event) {
      event.preventDefault();
      actions.focusPreviousItem();
      actions.chooseValue(state.activeItemId);
    },
    ArrowRight(event) {
      event.preventDefault();
      actions.focusNextItem();
      actions.chooseValue(state.activeItemId);
    },
    [' '](event) {
      event.preventDefault();
      actions.chooseValue(state.activeItemId);
    },
  });

  const onKeyDown: JSX.EventHandler<RadioGroupElement, KeyboardEvent> = (event) => {
    keydownHandlers(event);
    config.onKeyDown?.(event);
  };

  return {
    onBlur,
    onFocus,
    onKeyDown,
  } as const;
}

export function createRadioGroupEffects() {
  // initializeActiveItemOnMount();
}

export function initializeActiveItemOnMount() {
  const actions = useRadioGroupActions();
  onMount(() => {
    actions.initializeItemFocus();
  });
}
