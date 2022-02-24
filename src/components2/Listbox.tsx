import {
  Accessor,
  createContext,
  createEffect,
  createMemo,
  createSelector,
  JSX,
  mergeProps,
  on,
  onCleanup,
  onMount,
  PropsWithChildren,
  splitProps,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import {
  DynamicComponent,
  ItemPosition,
  ListboxFocusManagement,
  ListboxOrientation,
} from '~/types';
import { useId } from '~/utils/componentUtils';
import { useKeyEventHandlers } from '~/utils/eventUtils';

type ListboxOptionType<T> = {
  id: string;
  active: boolean;
  disabled: boolean;
  value?: T;
};

type ListboxOptionWithIndex<T> = { option: ListboxOptionType<T>; index: number };

type ActiveOption<T> = ListboxOptionWithIndex<T> & { element?: HTMLElement; clickable?: boolean };

type ListboxState<T = any> = {
  'aria-orientation'?: ListboxOrientation;
  focusManagement?: ListboxFocusManagement;
  options: ListboxOptionType<T>[];
  isActiveOption(optionId: string): boolean;
  isSelectedOption(value: T): boolean;
  activeOption: ActiveOption<T>;
  isRadioGroup: boolean;
};

type ListboxActions<T = any> = {
  addOption(option: { id: ListboxOptionType<T>['id']; disabled: boolean; value?: T }): void;
  updateOption(id: ListboxOptionType<T>['id'], option: { disabled?: boolean; value?: T }): void;
  removeOption(id: ListboxOptionType<T>['id']): void;
  clearActiveOption(): void;
  setActiveOption(props: { position: ItemPosition } | { id: ListboxOptionType<T>['id'] }): void;
  selectActiveOption(): void;
  focusActiveOption(): void;
};

const ListboxContext = createContext<{ state: ListboxState; actions: ListboxActions }>();
function useListboxState<T>() {
  return useContext(ListboxContext).state as ListboxState<T>;
}
export function useListboxActions<T>() {
  return useContext(ListboxContext).actions as ListboxActions<T>;
}

type FocusManagementConfigProps = {
  focusManagement?: ListboxFocusManagement;
};

type RadioGroupConfigProps = {
  radio?: boolean;
};

type ListProviderProps<T> = PropsWithChildren<
  {
    'aria-orientation'?: ListboxOrientation;
    value?: T;
    onChange?: (value: T) => void;
  } & FocusManagementConfigProps &
    RadioGroupConfigProps
>;

export function ListboxProvider<T = any>(props: ListProviderProps<T>) {
  props = mergeProps<typeof props[]>({ focusManagement: 'roving tabindex' }, props);

  const [state, setState] = createStore<ListboxState<T>>({
    options: [],
    get activeOption(): ActiveOption<T> {
      return activeOption();
    },
    get isActiveOption(): (optionId: string) => boolean {
      return isActiveOption;
    },
    get isSelectedOption(): (value: T) => boolean {
      return isSelectedOption;
    },
    get isRadioGroup(): boolean {
      return props.radio;
    },
    get ['aria-orientation'](): ListboxOrientation {
      return props['aria-orientation'];
    },
    get focusManagement(): ListboxFocusManagement {
      return props.focusManagement;
    },
  });

  const optionsWithIndex = createMemo(() =>
    state.options.map((option, index) => ({ option: option as ListboxOptionType<T>, index }))
  );
  const activeOption = createMemo<ActiveOption<T>>(() => {
    const value = optionsWithIndex().find(({ option }) => option.active);

    if (value) {
      const element = document.getElementById(value.option.id);
      const clickable = ['BUTTON', 'A'].includes(element?.tagName);

      return {
        ...value,
        element,
        clickable,
      };
    }
  });
  const selectedOption = createMemo(() =>
    optionsWithIndex().find(({ option }) => props.value ?? option.value === props.value)
  );
  const isActiveOption = createSelector<string, string>(() => activeOption()?.option.id);
  const isSelectedOption = createSelector<T, T>(() => props.value);

  const isNotDisabled = (optionWithIndex: { option: ListboxOptionType<T>; index: number }) =>
    !optionWithIndex.option.disabled;
  const getOptionPositinIndex: { [key in ItemPosition]: Accessor<number> } = {
    first: () => optionsWithIndex().find(isNotDisabled)?.index,
    last: () => optionsWithIndex().slice().reverse().find(isNotDisabled)?.index,
    next: () =>
      optionsWithIndex()
        .slice((activeOption()?.index || 0) + 1)
        .find(isNotDisabled)?.index,
    previous: () =>
      optionsWithIndex()
        .slice(0, activeOption()?.index || optionsWithIndex().length)
        .reverse()
        .find(isNotDisabled)?.index,
  };

  const actions: ListboxActions<T> = {
    addOption(option) {
      setState('options', (options) => [...options, { ...option, active: false }]);
    },
    updateOption(id, option) {
      setState('options', (option) => option.id === id, option);
    },
    removeOption(id) {
      setState('options', (options) => options.filter((option) => option.id !== id));
    },
    clearActiveOption() {
      setState('options', ({ active }) => active, 'active', false);
    },
    selectActiveOption() {
      if (!state.activeOption) {
        return;
      }

      const activeElement = document.getElementById(state.activeOption.option.id);

      if (['BUTTON', 'A'].includes(activeElement?.tagName)) {
        activeElement.click();
      } else {
        props.onChange?.(state.activeOption.option.value as T);
      }
    },
    setActiveOption(option) {
      if ('id' in option && state.isActiveOption(option.id)) {
        return;
      }

      const optionIndex =
        'position' in option
          ? getOptionPositinIndex[option.position]() ?? -1
          : state.options.findIndex((item) => item.id === option.id);

      if (optionIndex >= 0) {
        setState('options', (options) =>
          options.map((o, index) =>
            state.isActiveOption(o.id)
              ? { ...o, active: false }
              : index === optionIndex
              ? { ...o, active: true }
              : o
          )
        );

        if ('position' in option) {
          actions.focusActiveOption();

          if (!state.activeOption.clickable) {
            props.onChange?.(state.activeOption.option.value as T);
          }
        }
      }
    },
    focusActiveOption() {
      document.getElementById(state.activeOption?.option.id)?.focus();
    },
  };

  return (
    <ListboxContext.Provider value={{ state: state as unknown as ListboxState, actions }}>
      {props.children}
    </ListboxContext.Provider>
  );
}

export type ListboxProps<T extends HTMLElement> = PropsWithChildren<{
  as?: DynamicComponent<{
    'aria-activedescendent': string;
    'aria-labelledby': string;
    'aria-orientation': ListboxProps<T>['aria-orientation'];
    onKeyDown: ListboxProps<T>['onKeyDown'];
    onMouseLeave: ListboxProps<T>['onMouseLeave'];
    role: 'listbox' | 'radiogroup';
    tabIndex: string | number;
  }>;
  'aria-orientation'?: ListboxOrientation;
  onKeyDown?: JSX.EventHandler<T, KeyboardEvent>;
  onMouseLeave?: JSX.EventHandler<T, MouseEvent>;
  value?: any;
}>;

export function Listbox<T extends HTMLElement = HTMLUListElement>(props: ListboxProps<T>) {
  const listboxState = useListboxState<T>();

  props = mergeProps<typeof props[]>(
    {
      'aria-orientation': listboxState['aria-orientation'] || 'vertical',
      as: listboxState.isRadioGroup ? 'div' : 'ul',
    },
    props
  );

  const listboxActions = useListboxActions<T>();

  const onKeyDown = useKeyEventHandlers<T>({
    ArrowUp(event) {
      event.preventDefault();
      if (props['aria-orientation'] === 'vertical' || listboxState.isRadioGroup) {
        listboxActions.setActiveOption({ position: 'previous' });
      }
    },
    ArrowDown(event) {
      event.preventDefault();
      if (props['aria-orientation'] === 'vertical' || listboxState.isRadioGroup) {
        listboxActions.setActiveOption({ position: 'next' });
      }
    },
    ArrowLeft(event) {
      event.preventDefault();
      if (props['aria-orientation'] === 'horizontal' || listboxState.isRadioGroup) {
        listboxActions.setActiveOption({ position: 'previous' });
      }
    },
    ArrowRight(event) {
      event.preventDefault();
      if (props['aria-orientation'] === 'horizontal' || listboxState.isRadioGroup) {
        listboxActions.setActiveOption({ position: 'next' });
      }
    },
    Home(event) {
      if (!listboxState.isRadioGroup) {
        event.preventDefault();
        listboxActions.setActiveOption({ position: 'first' });
      }
    },
    End(event) {
      if (!listboxState.isRadioGroup) {
        event.preventDefault();
        listboxActions.setActiveOption({ position: 'last' });
      }
    },
    Enter(event) {
      event.preventDefault();
      listboxActions.selectActiveOption();
    },
    [' '](event) {
      event.preventDefault();
      listboxActions.selectActiveOption();
    },
    Tab() {
      listboxActions.clearActiveOption();
      // onTabOut();
    },
  });

  const onMouseLeave: JSX.EventHandler<T, MouseEvent> = () => {
    listboxActions.clearActiveOption();
  };

  const [localProps, otherProps] = splitProps(props, [
    'aria-orientation',
    'as',
    'onKeyDown',
    'onMouseLeave',
  ]);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      aria-activedescendent={
        listboxState.focusManagement === 'aria-activedescendent'
          ? listboxState.activeOption.option.id
          : undefined
      }
      aria-labelledby={'TODO: add listbox label component'}
      aria-orientation={localProps['aria-orientation']}
      data-solid-ui-listbox={listboxState.isRadioGroup ? undefined : ''}
      data-solid-ui-radiogroup={listboxState.isRadioGroup ? '' : undefined}
      onKeyDown={onKeyDown}
      onMouseLeave={onMouseLeave}
      role={listboxState.isRadioGroup ? 'radiogroup' : 'listbox'}
      tabIndex={
        listboxState.isRadioGroup || listboxState.focusManagement === 'roving tabindex' ? -1 : 0
      }
    />
  );
}

export type ListboxOptionProps<V, E extends HTMLElement> = PropsWithChildren<{
  as?: DynamicComponent<{
    disabled: ListboxOptionProps<V, E>['disabled'];
    id: string;
    onClick: ListboxOptionProps<V, E>['onClick'];
    onFocus: ListboxOptionProps<V, E>['onFocus'];
    onMouseEnter: ListboxOptionProps<V, E>['onMouseEnter'];
    role: 'option' | 'radio';
    tabIndex: string | number;
  }>;
  disabled?: boolean;
  idPrefix?: string;
  onClick?: JSX.EventHandler<E, MouseEvent>;
  onFocus?: JSX.EventHandler<E, FocusEvent>;
  onMouseEnter?: JSX.EventHandler<E, MouseEvent>;
  value?: V;
}>;

export function ListboxOption<V, E extends HTMLElement = HTMLLIElement>(
  props: ListboxOptionProps<V, E>
) {
  const listboxState = useListboxState<V>();

  props = mergeProps<typeof props[]>(
    {
      as: listboxState.isRadioGroup ? 'div' : 'li',
      idPrefix: listboxState.isRadioGroup ? 'solid-ui-radiogroup-radio' : 'solid-ui-listbox-option',
    },
    props
  );

  const id = useId(props.idPrefix);

  const listActions = useListboxActions<V>();

  onMount(() => listActions.addOption({ id, value: props.value, disabled: props.disabled }));

  createEffect(
    on(
      [() => props.disabled, () => props.value],
      (_, [disabled, value]) => listActions.updateOption(id, { value, disabled }),
      {
        defer: true,
      }
    )
  );

  onCleanup(() => listActions.removeOption(id));

  const onClick: JSX.EventHandler<E, MouseEvent> = () => {
    listActions.setActiveOption({ id });

    if (!listboxState.isSelectedOption(props.value)) {
      listActions.selectActiveOption();
    }
  };

  const onFocus: JSX.EventHandler<E, FocusEvent> = () => {
    if (!listboxState.isActiveOption(id)) {
      listActions.setActiveOption({ id });
    }
  };

  const onMouseEnter: JSX.EventHandler<E, MouseEvent> = () => {
    console.log('mouseenter');
    if (!props.disabled) {
      listActions.setActiveOption({ id });
    }
  };

  const [localProps, otherProps] = splitProps(props, ['as', 'disabled', 'idPrefix']);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      aria-selected={listboxState.isActiveOption(id) ? true : undefined}
      data-active={listboxState.isActiveOption(id) ? '' : undefined}
      data-selected={listboxState.isSelectedOption(props.value) ? '' : undefined}
      data-solid-ui-listbox-option={listboxState.isRadioGroup ? undefined : ''}
      data-solid-ui-radiogroup-radio={listboxState.isRadioGroup ? '' : undefined}
      disabled={localProps.disabled}
      id={id}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      role={listboxState.isRadioGroup ? 'radio' : 'option'}
      tabIndex={
        listboxState.isActiveOption(id) ||
        (!listboxState.activeOption?.option && listboxState.isSelectedOption(props.value))
          ? 0
          : -1
      }
    />
  );
}
