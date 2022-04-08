import { createEffect, createMemo, JSXElement, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useKeyEventHandlers } from "~/utils/useKeyEventHandlers";
import { BaseComponent, BaseComponentProps } from '~/types';
import { ListOrientation, Position, useListActions, useListState } from './context';
import Item from './Item';
import Label from './Label';

export type ListDataAttributeProp =
  | { 'data-solid-list': '' }
  | { 'data-solid-menu-items': '' }
  | { 'data-solid-listbox-options': '' }
  | { 'data-solid-combobox-listbox': '' };

export type ListProps = {
  as?:
    | string
    | BaseComponent<
        {
          'aria-activedescendent': string;
          'aria-labelledby'?: ListProps['aria-labelledby'];
          'aria-orientation': ListProps['aria-orientation'];
          onKeyDown: (event?: KeyboardEvent) => void;
          onMouseDown: (event: MouseEvent) => void;
          onMouseLeave: (event?: MouseEvent) => void;
          role?: ListProps['role'];
          tabIndex: string | number;
        } & ListDataAttributeProp
      >;
  'aria-labelledby'?: string;
  'aria-orientation'?: ListOrientation;
  dataAttribute?:
    | 'data-solid-list'
    | 'data-solid-menu-items'
    | 'data-solid-listbox-options'
    | 'data-solid-combobox-options'
    | 'data-solid-radio-group';
  role?: 'menu' | 'listbox' | 'none';
  value?: any;
};

export const List: BaseComponent<ListProps> = (props) => {
  props = mergeProps(
    { 'aria-orientation': 'vertical', as: 'ul', dataAttribute: 'data-solid-list' },
    props
  );

  const state = useListState();
  const actions = useListActions();

  // search text effect
  createEffect(() => {
    if (!state.searchText) return;

    const item = state.items.find((item) =>
      document
        .getElementById(item.id)
        ?.textContent?.toLocaleLowerCase()
        ?.startsWith(state.searchText)
    );
    if (item && !item.isDisabled) {
      actions.onItemFocus({ position: Position.Specific, id: item.id });
    }
  });

  let searchTimeout;

  function addKeyToSearchText(key) {
    actions.onSearchTextChange(state.searchText + key.toLocaleLowerCase());
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      actions.onSearchTextChange('');
    }, 500);
  }

  function clickActiveItem() {
    const activeItem = state.items.find((item) => item.isActive);
    if (!activeItem) return;

    const activeElement = document.getElementById(activeItem.id);

    if (['BUTTON', 'A'].includes(activeElement.tagName)) {
      activeElement.click();
    } else {
      actions.onItemSelect(activeItem.value);
    }
  }

  const handleKeyDown = useKeyEventHandlers({
    default(event: KeyboardEvent) {
      if (event.key.length !== 1) return;
      addKeyToSearchText(event.key);
    },
    Tab() {
      actions.onListTabOut();
    },
    ArrowUp() {
      if (props['aria-orientation'] === 'vertical' || state.isRadioList) {
        if (state.isRadioList) {
          actions.onItemPositionSelect({ position: Position.Previous });
        } else {
          actions.onItemFocus({ position: Position.Previous });
        }
      }
    },
    ArrowDown() {
      if (props['aria-orientation'] === 'vertical' || state.isRadioList) {
        if (state.isRadioList) {
          actions.onItemPositionSelect({ position: Position.Next });
        } else {
          actions.onItemFocus({ position: Position.Next });
        }
      }
    },
    ArrowLeft() {
      if (props['aria-orientation'] === 'horizontal' || state.isRadioList) {
        if (state.isRadioList) {
          actions.onItemPositionSelect({ position: Position.Previous });
        } else {
          actions.onItemFocus({ position: Position.Previous });
        }
      }
    },
    ArrowRight() {
      if (props['aria-orientation'] === 'horizontal' || state.isRadioList) {
        if (state.isRadioList) {
          actions.onItemPositionSelect({ position: Position.Next });
        } else {
          actions.onItemFocus({ position: Position.Next });
        }
      }
    },
    Home() {
      if (!state.isRadioList) {
        actions.onItemFocus({ position: Position.First });
      }
    },
    End() {
      if (!state.isRadioList) {
        actions.onItemFocus({ position: Position.Last });
      }
    },
    Enter(event) {
      event.preventDefault();
      clickActiveItem();
    },
    [' '](event) {
      event.preventDefault();

      // if we are currently searching item text, add a space to it instead of selecting the focused item
      if (state.searchText.length > 0) {
        addKeyToSearchText(event.key);
        return;
      }

      clickActiveItem();
    },
  });

  function handleMouseDown(event: MouseEvent) {
    if (state.preventMouseDownDefault) event.preventDefault();
  }

  function handleMouseLeave() {
    actions.onItemFocus({ position: Position.None });
  }

  const activeId = createMemo(() => state.items.find((item) => item.isActive)?.id);

  const [localProps, otherProps] = splitProps(props, [
    'as',
    'aria-labelledby',
    'aria-orientation',
    'dataAttribute',
  ]);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      aria-activedescendent={activeId()}
      aria-labelledby={localProps['aria-labelledby']}
      aria-orientation={localProps['aria-orientation']}
      {...({ [localProps.dataAttribute]: '' } as ListDataAttributeProp)}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      tabIndex={state.useRovingTabIndex ? -1 : 0}
    />
  );
};

type ListComponentType = {
  (props: BaseComponentProps<ListProps>): JSXElement;
  Label: typeof Label;
  Items: typeof List;
  Item: typeof Item;
};

const ListComponent: ListComponentType = Object.assign(List, {
  Label,
  Items: List,
  Item,
});

export default ListComponent;
