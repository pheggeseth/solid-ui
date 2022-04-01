import { Accessor, createEffect, JSX, mergeProps, onMount } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useKeyEventHandlers } from '~/utils/eventUtils';
import {
  useComboboxActions,
  useComboboxContext,
  useComboboxSelectors,
  useComboboxState,
} from './context';

export type CreateInputConfig<Value, InputElement extends HTMLInputElement = HTMLInputElement> = {
  idPrefix?: string;
  onBlur?: JSX.EventHandler<InputElement, FocusEvent>;
  onInput?: JSX.EventHandler<InputElement, InputEvent>;
  onKeyDown?: JSX.EventHandler<InputElement, KeyboardEvent>;
  value?: Accessor<string>;
  getDisplayValue?: Accessor<(value: Value) => string>;
};

export function createInput<Value = any, InputElement extends HTMLInputElement = HTMLInputElement>(
  config: CreateInputConfig<Value, InputElement> = {}
) {
  const props = createInputProps(config);
  const handlers = createInputHandlers(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createInputEffects({ id: props.id, ...config }),
    context: useComboboxContext(),
  } as const;
}

export function createInputProps<
  Value = any,
  InputElement extends HTMLInputElement = HTMLInputElement
>(config: CreateInputConfig<Value, InputElement> = {}) {
  const { idPrefix = 'solid-ui-combobox-input' } = config;
  const id = useId(idPrefix);

  const state = useComboboxState();

  return {
    get ['aria-activedescendent']() {
      return state.activeItemId;
    },
    'aria-autocomplete': 'list',
    get ['aria-controls']() {
      return state.panelId || state.listId;
    },
    get ['aria-labelledby']() {
      return state.labelId;
    },
    'data-solid-ui-input': '',
    ...getDataProp(idPrefix),
    id,
    role: 'combobox',
    type: 'text',
    get value() {
      return config.value ? config.value() : state.inputValue;
    },
  } as const;
}

export function createInputHandlers<
  Value = any,
  InputElement extends HTMLInputElement = HTMLInputElement
>(config: CreateInputConfig<Value, InputElement> = {}) {
  const state = useComboboxState();
  const actions = useComboboxActions();

  const closeList = () => {
    actions.closePopover();
    actions.clearItemFocus();
  };

  const onInput: JSX.EventHandler<InputElement, InputEvent> = (event) => {
    actions.setInputValue(event.currentTarget.value);
    config.onInput?.(event);

    if (state.inputValue && !state.isPanelOpen) {
      actions.openPopover();
    }
  };

  const keyDownHandlers = useKeyEventHandlers<InputElement>({
    ArrowUp(event) {
      event.preventDefault();

      if (!state.isPanelOpen) {
        actions.openPopover();
        if (!state.activeItemId) {
          actions.focusLastItem();
        }
      } else {
        actions.focusPreviousItem();
      }
    },
    ArrowDown(event) {
      event.preventDefault();

      if (!state.isPanelOpen) {
        actions.openPopover();
        if (!state.activeItemId) {
          actions.focusFirstItem();
        }
      } else {
        actions.focusNextItem();
      }
    },
    End(event) {
      if (state.isPanelOpen) {
        event.preventDefault();
        actions.focusLastItem();
      }
    },
    Enter() {
      actions.chooseValue(state.activeItemId);
      closeList();
    },
    Escape() {
      closeList();
    },
    Home(event) {
      if (state.isPanelOpen) {
        event.preventDefault();
        actions.focusFirstItem();
      }
    },
    Tab() {
      closeList();
    },
    default(event) {
      if (event.key.length === 1 && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
        actions.openPopover();
      }
    },
  });

  const selectors = useComboboxSelectors<Value>();

  const onBlur: JSX.EventHandler<InputElement, FocusEvent> = (event) => {
    actions.setInputValue(state.getInputDisplayValue(selectors.selectedValue));
    config.onBlur?.(event);
  };

  const onKeyDown: JSX.EventHandler<InputElement, KeyboardEvent> = (event) => {
    keyDownHandlers(event);
    config.onKeyDown?.(event);
  };

  return {
    onBlur,
    onInput,
    onKeyDown,
  } as const;
}

export function createInputEffects<
  Value = any,
  InputElement extends HTMLInputElement = HTMLInputElement
>(config: CreateInputConfig<Value, InputElement> & { id: string }) {
  registerInputIdOnMount(config);
  registerGetInputDisplayValue(config);
}

export function registerInputIdOnMount(config: { id: string }) {
  const actions = useComboboxActions();
  onMount(() => {
    actions.setElementId('inputId', config.id);
  });
}

export function registerGetInputDisplayValue<Value>(config: CreateInputConfig<Value>) {
  const actions = useComboboxActions();
  createEffect(() => {
    if (config.getDisplayValue?.()) {
      actions.registerGetInputDisplayValue(config.getDisplayValue());
    }
  });
}
