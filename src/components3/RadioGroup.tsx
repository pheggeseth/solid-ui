import {
  batch,
  createContext,
  createEffect,
  createSelector,
  JSX,
  mergeProps,
  onCleanup,
  onMount,
  splitProps,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import { BaseComponentProps, DynamicComponent } from '~/types';
import { createComponentContext, getDataProp, useId } from '~/utils/componentUtils';
import { useKeyEventHandlers } from '~/utils/eventUtils';

type RadioOptionItem<Value> = {
  id: string;
  value: Value;
};

type State<Value> = {
  options: RadioOptionItem<Value>[];
  activeOptionId: string;
};

type Selectors<Value> = {
  isFirstOption: (id: string) => boolean;
  isOptionSelected: (value: Value) => boolean;
};

type Actions<Value> = {
  addOption(id: string, value: Value): void;
  removeOption(id: string): void;
  selectNextOption(): void;
  selectPreviousOption(): void;
  selectOption(id: string): void;
  setActiveOption(id: string): void;
  clearActiveOption(): void;
};

const RadioGroupComponentContext =
  createContext<{ state: State<any>; selectors: Selectors<any>; actions: Actions<any> }>();
function useRadioGroupState<Value>() {
  return useContext(RadioGroupComponentContext).state as State<Value>;
}
function useRadioGroupSelectors<Value>() {
  return useContext(RadioGroupComponentContext).selectors as Selectors<Value>;
}
function useRadioGroupActions<Value>() {
  return useContext(RadioGroupComponentContext).actions as Actions<Value>;
}

export type RadioGroupContext = {};

export function createRadioGroupContext() {
  return createComponentContext<RadioGroupContext>();
}

function createExternalContext() {
  return {};
}

type RadioGroupContextProp = {
  context?: (ctx: RadioGroupContext) => void;
};

export type RadioGroupProps<Value, RadioGroupElement extends HTMLElement> = BaseComponentProps<
  {
    component?: DynamicComponent<{
      id: string;
      onKeyDown: JSX.EventHandler<RadioGroupElement, KeyboardEvent>;
      role: 'radiogroup';
    }>;
    idPrefix?: string;
    onChange?: (newValue: Value) => void;
    value?: Value;
  } & RadioGroupContextProp
>;

export function RadioGroup<Value, RadioGroupElement extends HTMLElement = HTMLDivElement>(
  props: RadioGroupProps<Value, RadioGroupElement>
) {
  props = mergeProps<typeof props[]>({ component: 'div', idPrefix: 'solid-ui-radiogroup' }, props);

  const [state, setState] = createStore<State<Value>>({
    options: [],
    activeOptionId: null,
  });

  const selectors: Selectors<Value> = {
    isFirstOption: createSelector(
      () => state.options,
      (id, options) =>
        !props.value &&
        (props.value as unknown) !== 0 &&
        options.findIndex((option) => option.id === id) === 0
    ),
    isOptionSelected: createSelector(() => props.value),
  };

  const getActiveOptionIndex = () =>
    state.options.findIndex((option) => option.id === state.activeOptionId);

  const actions: Actions<Value> = {
    addOption(id, value) {
      setState('options', (options) => [...options, { id, value }]);
    },
    removeOption(id) {
      setState('options', (options) => options.filter((option) => option.id !== id));
    },
    selectNextOption() {
      let index = getActiveOptionIndex();
      if (index === state.options.length - 1) {
        index = -1;
      }

      setState({ activeOptionId: state.options[index + 1].id });
      props.onChange?.(state.options[index + 1].value as Value);
      document.getElementById(state.options[index + 1].id)?.focus();
    },
    selectPreviousOption() {
      let index = getActiveOptionIndex();
      if (index === 0) {
        index = state.options.length;
      }

      setState({ activeOptionId: state.options[index - 1].id });
      props.onChange?.(state.options[index - 1].value as Value);
      document.getElementById(state.options[index - 1].id)?.focus();
    },
    selectOption(id) {
      setState({
        activeOptionId: id,
      });
      props.onChange?.(state.options.find((option) => option.id === id).value as Value);
    },
    setActiveOption(id) {
      setState('activeOptionId', id);
    },
    clearActiveOption() {
      setState('activeOptionId', null);
    },
  };

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix']);

  const id = useId(localProps.idPrefix);

  const finalProps = mergeProps(otherProps, getDataProp(localProps.idPrefix));

  const onKeyDown = useKeyEventHandlers<RadioGroupElement>({
    ArrowUp() {
      actions.selectPreviousOption();
    },
    ArrowDown() {
      actions.selectNextOption();
    },
    ArrowLeft() {
      actions.selectPreviousOption();
    },
    ArrowRight() {
      actions.selectNextOption();
    },
  });

  localProps.context?.(createExternalContext());

  return (
    <RadioGroupComponentContext.Provider
      value={{ state: state as State<Value>, selectors, actions }}
    >
      <Dynamic
        {...finalProps}
        component={localProps.component}
        id={id}
        onKeyDown={onKeyDown}
        role="radiogroup"
      />
    </RadioGroupComponentContext.Provider>
  );
}

export type RadioOptionProps<Value, RadioOptionElement extends HTMLElement> = BaseComponentProps<
  {
    component?: DynamicComponent<{
      'aria-checked': boolean;
      id: string;
      onBlur: JSX.EventHandler<RadioOptionElement, FocusEvent>;
      onClick: JSX.EventHandler<RadioOptionElement, MouseEvent>;
      onFocus: JSX.EventHandler<RadioOptionElement, FocusEvent>;
      onKeyDown: JSX.EventHandler<RadioOptionElement, KeyboardEvent>;
      onMouseDown: JSX.EventHandler<RadioOptionElement, MouseEvent>;
      role: 'radio';
      tabIndex: string | number;
    }>;
    idPrefix?: string;
    value?: Value;
  } & RadioGroupContextProp
>;

export function RadioGroupOption<Value, RadioOptionElement extends HTMLElement = HTMLDivElement>(
  props: RadioOptionProps<Value, RadioOptionElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'div', idPrefix: 'solid-ui-radiogroup-option' },
    props
  );

  const radioGroupState = useRadioGroupState<Value>();
  const radioGroupSelectors = useRadioGroupSelectors<Value>();
  const radioGroupActions = useRadioGroupActions();

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix', 'value']);

  const id = useId(localProps.idPrefix);

  const finalProps = mergeProps(otherProps, getDataProp(localProps.idPrefix));

  const onBlur: JSX.EventHandler<RadioOptionElement, FocusEvent> = (event) => {
    radioGroupActions.clearActiveOption();
  };

  const onClick: JSX.EventHandler<RadioOptionElement, MouseEvent> = (event) => {
    radioGroupActions.selectOption(id);
  };

  const onFocus: JSX.EventHandler<RadioOptionElement, FocusEvent> = (event) => {
    radioGroupActions.setActiveOption(id);
  };

  const onKeyDown = useKeyEventHandlers<RadioOptionElement>({
    Enter() {
      radioGroupActions.selectOption(id);
    },
    [' '](event) {
      event.preventDefault();
      radioGroupActions.selectOption(id);
    },
  });

  const onMouseDown: JSX.EventHandler<RadioOptionElement, MouseEvent> = (event) => {
    radioGroupActions.setActiveOption(id);
  };

  onMount(() => {
    radioGroupActions.addOption(id, localProps.value);
  });

  onCleanup(() => {
    radioGroupActions.removeOption(id);
  });

  return (
    <Dynamic
      {...finalProps}
      aria-checked={radioGroupSelectors.isOptionSelected(localProps.value)}
      component={localProps.component}
      data-active={radioGroupState.activeOptionId === id ? '' : undefined}
      data-checked={radioGroupSelectors.isOptionSelected(localProps.value) ? '' : undefined}
      id={id}
      onBlur={onBlur}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      role="radio"
      tabIndex={
        radioGroupSelectors.isOptionSelected(localProps.value) ||
        radioGroupSelectors.isFirstOption(id)
          ? 0
          : -1
      }
    />
  );
}
