import { mergeProps, onMount, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useId } from '~/utils/componentUtils';
import { useKeyEventHandlers } from "~/utils/useKeyEventHandlers";
import { Position, useListActions, useListState } from '~/oldComponents/List/context';
import { PopoverAnchorRef } from '~/oldComponents/Popover';
import { usePopoverState } from '~/oldComponents/Popover/context';
import { BaseComponent } from '~/types';
import { useComboboxActions, useComboboxState } from './context';

const dataAttribute = {
  'data-solid-combobox-textbox': '' as const,
};

export type TextboxProps = {
  as?:
    | 'input'
    | BaseComponent<
        {
          id: string;
          onBlur: TextboxProps['onBlur'];
          onFocus: TextboxProps['onFocus'];
          onInput: TextboxProps['onInput'];
          onKeyDown: TextboxProps['onKeyDown'];
          type: string;
          value: any;
        },
        typeof dataAttribute
      >;
  onBlur?: (event: FocusEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onInput?: (event: InputEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
};

export const Textbox: BaseComponent<TextboxProps> = function Textbox(props) {
  props = mergeProps({ as: 'input' }, props);

  const PopoverState = usePopoverState();
  const ListState = useListState();
  const ListActions = useListActions();
  const ComboboxState = useComboboxState();
  const ComboboxActions = useComboboxActions();

  const textboxId = useId('combobox-textbox');

  onMount(() => {
    ComboboxActions.onTextboxMount(textboxId);
    ListActions.registerLabel(textboxId, 'Textbox');
  });

  function handleFocus(event: FocusEvent) {
    ComboboxActions.onTextboxFocus(event);
    props.onFocus?.(event);
  }

  function handleBlur(event: FocusEvent) {
    ComboboxActions.onTextboxBlur(event);
    props.onBlur?.(event);
  }

  function handleInput(event: InputEvent) {
    ComboboxActions.onTextboxInput((event.target as HTMLInputElement).value);
    props.onInput?.(event);
  }

  const handleKeyDown = useKeyEventHandlers({
    ArrowDown(event) {
      event.preventDefault();

      if (ComboboxState.dropdownId && !PopoverState.isOpen) {
        ComboboxActions.onDropdownOpen();
        if (ComboboxState.selection === 'manual') {
          ListActions.onItemFocus({ position: Position.Next });
        }
      } else {
        ListActions.onItemFocus({ position: Position.Next });
      }
    },
    ArrowUp(event) {
      event.preventDefault();

      if (ComboboxState.dropdownId && !PopoverState.isOpen) {
        ComboboxActions.onDropdownOpen();
      }

      ListActions.onItemFocus({ position: Position.Previous });
    },
    Enter(event) {
      event.preventDefault();
      ListActions.selectActiveItem();
    },
    Escape() {
      ComboboxActions.onTextboxClear();
    },
  });

  const [localProps, otherProps] = splitProps(props, ['as']);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      {...dataAttribute}
      id={textboxId}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      ref={PopoverAnchorRef}
      type="text"
      value={ListState.valueSelected}
    />
  );
};

export default Textbox;
