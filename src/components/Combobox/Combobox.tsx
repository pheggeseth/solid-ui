import {
  Accessor,
  Component,
  createContext,
  createEffect,
  JSX,
  mergeProps,
  on,
  splitProps,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { Position, useListActions, useListState } from '~/components/List/context';
import { ListInPopoverProvider } from '~/components/List/ListProvider';
import { Listbox as ListboxProvider } from '~/components/Listbox';
import { Popover as PopoverProvider } from '~/components/Popover';
import { usePopoverActions } from '~/components/Popover/context';
import { BaseComponent, BaseComponentProps } from '~/types';
import Container, { ContainerProps } from './Container';
import { ComboboxActions, ComboboxContext, ComboboxState } from './context';
import Dropdown from './Dropdown';
import Label from './Label';
import Option from './Option';
import Options from './Options';
import Panel from './Panel';
import Textbox from './Textbox';

const ComboboxStateContext = createContext<{ options: Accessor<readonly string[]> }>();
function useComboboxStateContext() {
  return useContext(ComboboxStateContext);
}

type ComboboxProviderProps = {
  options: any[];
  selection?: 'manual' | 'automatic' | 'inline-automatic';
};

export const ComboboxProvider: Component<ComboboxProviderProps> = (props) => {
  props = mergeProps({ selection: 'manual' }, props);

  const [state, setState] = createStore<ComboboxState>({
    textboxId: null,
    dropdownId: null,
    listboxId: null,
    textboxValue: '',
    options: props.options,
    filteredOptions: props.options,
    selection: props.selection,
  });

  const ListState = useListState();
  const ListActions = useListActions();
  const PopoverActions = usePopoverActions();

  createEffect(
    on(
      () => ListState.valueSelected,
      (textboxValue) => {
        setState({ textboxValue });
      },
      { defer: true }
    )
  );

  createEffect(
    on(
      () => props.options,
      (options) => {
        setState({ options, filteredOptions: options });
      },
      { defer: true }
    )
  );

  ListActions.setShouldPreventMouseDownDefault(true);
  ListActions.setSortItems(
    (itemA, itemB) => props.options.indexOf(itemA.value) - props.options.indexOf(itemB.value)
  );

  const startsWith = (textboxValue: string) => (option: string) =>
    option.toLocaleLowerCase().startsWith(textboxValue.toLocaleLowerCase());

  function getFilteredOptions(textboxValue: string) {
    return state.options.filter(startsWith(textboxValue));
  }

  const actions: ComboboxActions = {
    onTextboxMount(textboxId) {
      setState({ textboxId });
    },
    onTextboxFocus() {
      if (state.textboxValue && state.filteredOptions.length > 0) {
        PopoverActions.openPopover();
      }
    },
    onTextboxBlur() {
      if (state.selection === 'automatic') {
        ListActions.selectActiveItem();
      } else {
        PopoverActions.closePopover();
      }
    },
    onTextboxInput(textboxValue) {
      const filteredOptions = textboxValue ? getFilteredOptions(textboxValue) : [];

      let originalTextboxValue;
      if (state.selection === 'inline-automatic' && textboxValue && filteredOptions.length > 0) {
        originalTextboxValue = textboxValue;
        textboxValue = filteredOptions[0];
      }

      setState({ textboxValue, filteredOptions });

      if (filteredOptions.length > 0) {
        PopoverActions.openPopover();
      } else {
        PopoverActions.closePopover();
      }

      ListState.onValueChangeCallback(textboxValue);

      if (originalTextboxValue) {
        (document.getElementById(state.textboxId) as HTMLInputElement).setSelectionRange(
          originalTextboxValue.length,
          textboxValue.length
        );
      }
    },
    onTextboxClear() {
      actions.onTextboxInput('');
    },
    onDropdownMount(dropdownId) {
      setState({ dropdownId });
    },
    onDropdownOpen() {
      document.getElementById(state.textboxId).focus();

      if (!state.textboxValue) {
        setState({ filteredOptions: state.options });
      } else {
        setState({ filteredOptions: getFilteredOptions(state.textboxValue) });
      }

      if (state.filteredOptions.length > 0) PopoverActions.openPopover();
    },
    onListboxMount(listboxId) {
      setState({ listboxId });
    },
    onListboxCleanup() {
      setState({ listboxId: null });
    },
  };

  createEffect(() => {
    if (
      (state.selection === 'automatic' || state.selection === 'inline-automatic') &&
      ListState.items.length > 0
    ) {
      const firstFilteredItemId = ListState.items.find(
        (item) => item.value === state.filteredOptions[0]
      )?.id;

      if (firstFilteredItemId) {
        ListActions.onItemFocus({
          position: Position.Specific,
          id: ListState.items.find((item) => item.value === state.filteredOptions[0])?.id,
        });
      }
    }
  });

  return (
    <ComboboxContext.Provider value={[state, actions]}>
      <ComboboxStateContext.Provider value={{ options: () => state.filteredOptions }}>
        {props.children}
      </ComboboxStateContext.Provider>
    </ComboboxContext.Provider>
  );
};

type ComboboxContainerProps = ComboboxProviderProps & {
  value?: any;
  onChange?: (value: any) => void;
} & ContainerProps;

export const ComboboxContainer: BaseComponent<ComboboxContainerProps> = (props) => {
  const [localProps, otherProps] = splitProps(props, [
    'value',
    'onChange',
    'options',
    'selection',
    'children',
  ]);

  return (
    <PopoverProvider>
      <ListInPopoverProvider value={localProps.value} onChange={localProps.onChange}>
        <ListboxProvider>
          <ComboboxProvider options={localProps.options} selection={localProps.selection}>
            <Container {...otherProps}>{localProps.children}</Container>
          </ComboboxProvider>
        </ListboxProvider>
      </ListInPopoverProvider>
    </PopoverProvider>
  );
};

type ComboboxComponentType = {
  (props: BaseComponentProps<ComboboxContainerProps>): JSX.Element;
  Label: typeof Label;
  Textbox: typeof Textbox;
  Dropdown: typeof Dropdown;
  Panel: typeof Panel;
  Options: typeof Options;
  Option: typeof Option;
  state: {
    options: readonly string[];
  };
};

const Combobox: ComboboxComponentType = Object.assign(ComboboxContainer, {
  Label,
  Textbox,
  Dropdown,
  Panel,
  Options,
  Option,
  state: {
    get options() {
      const { options } = useComboboxStateContext();
      return options();
    },
  },
});

export default Combobox;
