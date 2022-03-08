import {
  Accessor,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  PropsWithChildren,
  Show,
  splitProps,
} from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';
import { BaseComponentProps, DynamicComponent, ListOrientation } from '~/types';
import { createComponentContext, getDataProp, useId } from '~/utils/componentUtils';
import {
  ActiveDescendentProvider,
  createActiveDescendentContainerOnKeyDown,
  createActiveDescendentProps,
  useActiveDescendentActions,
  useActiveDescendentSelectors,
  useActiveDescendentState,
} from './base/ActiveDescendent';
import { LabelProvider } from './base/Label';
import {
  createListboxValueContainerProps,
  createListboxValueContext,
  createListboxValueItemProps,
  ListboxValueProvider,
  useListboxValueActions,
  useListboxValueSelectors,
  useListboxValueState,
} from './base/ListboxValue';
import {
  createPanelButtonProps,
  createPanelContext,
  createPanelProps,
  PanelProvider,
  usePanelActions,
  usePanelState,
} from './base/Panel';
import Popper from './Popper';

export type ComboboxContext<Value> = Readonly<{
  isActive: Accessor<boolean>;
  isSelected: (value?: Value) => boolean;
  isOpen: Accessor<boolean>;
  open: () => void;
  close: () => void;
}>;

function createExternalContext<Value>(
  config: { id?: string; value?: Value } = {}
): ComboboxContext<Value> {
  const activeDescendentSelectors = useActiveDescendentSelectors();
  const panelState = usePanelState();
  const panelActions = usePanelActions();
  const listboxValueSelectors = useListboxValueSelectors<Value>();

  return {
    isActive: () => activeDescendentSelectors.isDescendentActive(config.id),
    isSelected: (value?: Value) => listboxValueSelectors.isSelected(value ?? config.value),
    isOpen: () => panelState.isPanelOpen,
    open: () => panelActions.openPanel,
    close: () => panelActions.closePanel,
  } as const;
}

type ComboboxContextProp<Value> = {
  context?: (ctx: ComboboxContext<Value>) => void;
};

export function createComboboxContext<Value>() {
  return createComponentContext<ComboboxContext<Value>>();
}

function useComboboxValue<Value>() {
  return () => useListboxValueState<Value>().selectedValue;
}

export type ComboboxProviderProps<Value> = PropsWithChildren<
  {
    onChange?: (newValue: Value) => void;
    orientation?: ListOrientation;
    popper?: boolean;
    value?: Value;
  } & ComboboxContextProp<Value>
>;

export function ComboboxProvider<Value>(props: ComboboxProviderProps<Value>) {
  props = mergeProps<typeof props[]>({ orientation: 'vertical' }, props);
  const [localProps, otherProps] = splitProps(props, [
    'children',
    'context',
    'onChange',
    'orientation',
    'popper',
    'value',
  ]);

  const [value, setValue] = createSignal<Value>(localProps.value);

  createEffect(() => {
    setValue(() => localProps.value);
  });

  const panelContext = createPanelContext();
  const listboxValueContext = createListboxValueContext<Value>();

  const provider = () => (
    <LabelProvider>
      <PanelProvider {...otherProps} context={panelContext}>
        <ListboxValueProvider<Value>
          context={listboxValueContext}
          value={value()}
          onChange={(newValue) => {
            panelContext.close();
            setValue(() => newValue);
            localProps.onChange?.(newValue);
          }}
        >
          <ActiveDescendentProvider
            orientation={localProps.orientation}
            shouldHaveInitialFocus={(id) =>
              listboxValueContext.values()[id] === listboxValueContext.selectedValue()
            }
          >
            {(() => {
              localProps.context?.(createExternalContext());
              return localProps.children;
            })()}
          </ActiveDescendentProvider>
        </ListboxValueProvider>
      </PanelProvider>
    </LabelProvider>
  );

  return (
    <Show when={localProps.popper} fallback={provider()}>
      <Popper>{provider()}</Popper>
    </Show>
  );
}

export type ComboboxInputProps<
  Value,
  ComboboxInputElement extends HTMLElement = HTMLInputElement
> = BaseComponentProps<
  {
    component?: DynamicComponent<{
      'aria-autocomplete': 'list';
      id: string;
      onInput: JSX.EventHandler<ComboboxInputElement, InputEvent>;
      role: 'combobox';
      type: 'text';
      value: string;
    }>;
    getInputValue?: (value: Value) => string;
    idPrefix?: string;
    onInput?: JSX.EventHandler<ComboboxInputElement, InputEvent>;
  } & ComboboxContextProp<Value>
>;

export function ComboboxInput<
  Value,
  ComboboxInputElement extends HTMLInputElement = HTMLInputElement
>(props: ComboboxInputProps<Value>) {
  props = mergeProps<typeof props[]>(
    {
      component: 'input',
      idPrefix: 'solid-ui-combobox-input',
      getInputValue: (value) => String(value),
    },
    props
  );

  const value = useComboboxValue<Value>();

  const [localProps, otherProps] = splitProps(props, [
    'component',
    'context',
    'getInputValue',
    'idPrefix',
    'onInput',
  ]);

  const [inputValue, setInputValue] = createSignal(localProps.getInputValue(value()));

  createEffect(() => {
    setInputValue(value() ? localProps.getInputValue(value()) : '');
  });

  const id = useId(localProps.idPrefix);

  const activeDescendentOnKeyDown = createActiveDescendentContainerOnKeyDown({
    disableTypeahead: true,
  });
  const panelActions = usePanelActions();
  const activeDescendentState = useActiveDescendentState();
  const activeDescendentActions = useActiveDescendentActions();
  const listboxValueActions = useListboxValueActions<Value>();

  const closeList = () => {
    panelActions.closePanel();
    activeDescendentActions.hoverDescendentClear();
  };

  const listboxValueState = useListboxValueState<Value>();

  const onBlur: JSX.EventHandler<ComboboxInputElement, FocusEvent> = (event) => {
    closeList();
    // TODO: give user the option of reselected selected option on blur
    // setInputValue(
    //   listboxValueState.selectedValue
    //     ? localProps.getInputValue(listboxValueState.selectedValue)
    //     : ''
    // );
  };

  const onInput: JSX.EventHandler<ComboboxInputElement, InputEvent> = (event) => {
    setInputValue(event.currentTarget.value);
    localProps.onInput?.(event);
  };

  const onKeyDown: JSX.EventHandler<ComboboxInputElement, KeyboardEvent> = (event) => {
    activeDescendentOnKeyDown(event);
    if (event.key === 'ArrowUp') {
      panelActions.openPanel();
      if (!activeDescendentState.activeDescendentId) {
        activeDescendentActions.focusLastDescendent();
      }
    } else if (event.key === 'ArrowDown') {
      panelActions.openPanel();
      if (!activeDescendentState.activeDescendentId) {
        activeDescendentActions.focusFirstDescendent();
      }
    } else if (event.key === 'Enter') {
      if (activeDescendentState.activeDescendentId) {
        listboxValueActions.chooseValue(activeDescendentState.activeDescendentId);
        closeList();
      }
    } else if (event.key === 'Escape') {
      closeList();
    } else if (
      (event.key.length === 1 && !event.shiftKey && !event.ctrlKey && !event.metaKey) ||
      (inputValue() && event.key === 'Backspace')
    ) {
      panelActions.openPanel();
    }
  };

  const finalProps = mergeProps(
    otherProps,
    { onBlur, onInput, onKeyDown },
    getDataProp(localProps.idPrefix)
  );

  localProps.context?.(createComboboxContext());

  return (
    <Dynamic
      {...finalProps}
      aria-activedescendent={activeDescendentState.activeDescendentId}
      aria-autocomplete="list"
      component={localProps.component}
      id={id}
      role="combobox"
      type="text"
      value={inputValue()}
    />
  );
}

export type ComboboxButtonProps<Value> = BaseComponentProps<
  {
    component?: DynamicComponent<{ id: string; tabIndex: string | number }>;
    idPrefix?: string;
  } & ComboboxContextProp<Value>
>;

export function ComboboxButton<
  Value,
  ComboboxButtonElement extends HTMLElement = HTMLButtonElement
>(props: ComboboxButtonProps<Value>) {
  props = mergeProps<typeof props[]>(
    { component: 'button', idPrefix: 'solid-ui-combobox-button' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix']);

  const id = useId(localProps.idPrefix);

  const panelButtonProps = createPanelButtonProps();

  const onMouseDown: JSX.EventHandler<ComboboxButtonElement, MouseEvent> = (event) => {
    event.preventDefault();
  };

  const finalProps = mergeProps(
    otherProps,
    panelButtonProps,
    { onMouseDown },
    getDataProp(localProps.idPrefix)
  );

  localProps.context?.(createExternalContext());

  return <Dynamic {...finalProps} component={localProps.component} id={id} tabIndex={-1} />;
}

export type ComboboxPopupProps<Value> = BaseComponentProps<
  {
    component?: DynamicComponent<{ id: string; role: 'none' }>;
    idPrefix?: string;
    portal?: boolean;
  } & ComboboxContextProp<Value>
>;

export function ComboboxPopup<Value>(props: ComboboxPopupProps<Value>) {
  props = mergeProps<typeof props[]>(
    { component: 'div', idPrefix: 'solid-ui-combobox-popup', portal: true },
    props
  );

  const [localProps, otherProps] = splitProps(props, [
    'component',
    'context',
    'idPrefix',
    'portal',
  ]);

  const id = useId(localProps.idPrefix);

  const panelProps = createPanelProps({ id });

  const finalProps = mergeProps(otherProps, panelProps, getDataProp(localProps.idPrefix));

  const panel = () => (
    <Dynamic
      {...finalProps}
      component={localProps.component}
      id={id}
      // if we render this panel, we also need to render options,
      // so options need to have role="listbox", not the panel
      role="none"
    />
  );

  const panelState = usePanelState();

  localProps.context?.(createComboboxContext());

  return (
    <Show when={panelState.isPanelOpen}>
      <Show when={localProps.portal} fallback={panel}>
        <Portal>{panel()}</Portal>
      </Show>
    </Show>
  );
}

export type ComboboxListProps<Value> = BaseComponentProps<
  {
    component?: DynamicComponent<{ id: string; role: 'listbox' }>;
    idPrefix?: string;
    portal?: boolean;
  } & ComboboxContextProp<Value>
>;

export function ComboboxList<Value, ComboboxListElement extends HTMLElement = HTMLUListElement>(
  props: ComboboxListProps<Value>
) {
  props = mergeProps<typeof props[]>(
    { component: 'ul', idPrefix: 'solid-ui-combobox-list' },
    props
  );

  const [localProps, otherProps] = splitProps(props, [
    'component',
    'context',
    'idPrefix',
    'portal',
  ]);

  const id = useId(localProps.idPrefix);

  const activeDescendentState = useActiveDescendentState();
  const activeDescendentActions = useActiveDescendentActions();

  const listboxContainerProps = createListboxValueContainerProps<Value, ComboboxListElement>({
    activeId: () => activeDescendentState.activeDescendentId,
    search: () => activeDescendentState.search,
  });

  const panelState = usePanelState();

  const panelProps = !panelState.panelId
    ? createPanelProps<ComboboxListElement>({
        clickAway: true,
        id,
        manageFocus: false,
        tabIndex: -1,
      })
    : ({} as { onKeyDown: never });

  const onKeyDown: JSX.EventHandler<ComboboxListElement, KeyboardEvent> = (event) => {
    listboxContainerProps.onKeyDown(event);
    panelProps?.onKeyDown(event);
  };

  const finalProps = mergeProps(
    otherProps,
    listboxContainerProps,
    panelProps,
    { onKeyDown },
    getDataProp(localProps.idPrefix)
  );

  const comboboxList = () => (
    <Dynamic {...finalProps} component={localProps.component} id={id} role="listbox" />
  );

  createEffect(() => {
    if (panelState.isPanelOpen) {
      activeDescendentActions.initializeDescendentFocus();
    }
  });

  localProps.context?.(createExternalContext());

  return !panelState.panelId ? (
    <Show when={panelState.isPanelOpen}>
      <Show when={localProps.portal} fallback={comboboxList}>
        <Portal>{comboboxList}</Portal>
      </Show>
    </Show>
  ) : (
    comboboxList()
  );
}

export type ComboboxOptionProps<
  Value,
  ComboboxOptionElement extends HTMLElement = HTMLLIElement
> = BaseComponentProps<
  {
    component?: DynamicComponent<{
      id: string;
    }>;
    idPrefix?: string;
    value?: Value;
  } & ComboboxContextProp<Value>
>;

export function ComboboxOption<Value, ComboboxOptionElement extends HTMLElement = HTMLLIElement>(
  props: ComboboxOptionProps<Value>
) {
  props = mergeProps<typeof props[]>(
    { component: 'li', idPrefix: 'solid-ui-combobox-option' },
    props
  );

  const [localProps, otherProps] = splitProps(props, ['component', 'context', 'idPrefix', 'value']);

  const id = useId(localProps.idPrefix);

  const descendentProps = createActiveDescendentProps({ id });
  const listboxValueItemProps = createListboxValueItemProps<Value>({
    id,
    value: localProps.value,
  });

  const onMouseDown: JSX.EventHandler<ComboboxOptionElement, MouseEvent> = (event) => {
    event.preventDefault();
  };

  const finalProps = mergeProps(
    otherProps,
    descendentProps,
    listboxValueItemProps,
    { onMouseDown },
    getDataProp(localProps.idPrefix)
  );

  localProps.context?.(createExternalContext<Value>({ id, value: localProps.value }));

  return <Dynamic {...finalProps} component={localProps.component} id={id} />;
}
