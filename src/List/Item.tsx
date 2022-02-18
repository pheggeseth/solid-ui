import {
  Accessor,
  createContext,
  createEffect,
  createMemo,
  JSXElement,
  mergeProps,
  onCleanup,
  onMount,
  splitProps,
  useContext,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useId } from '~/componentUtils';
import { BaseComponent, BaseComponentProps } from '~/types';
import { Position, useListActions, useListState } from './context';

type ListItemDataAttributeProp =
  | { 'data-solid-list-item': '' }
  | { 'data-solid-menu-item': '' }
  | { 'data-solid-listbox-option': '' }
  | { 'data-solid-combobox-option': '' };

export type ItemProps = {
  as?:
    | BaseComponent<
        {
          disabled: ItemProps['disabled'];
          id?: string;
          onBlur(event?: FocusEvent): void;
          onClick: ItemProps['onClick'];
          onFocus(event?: FocusEvent): void;
          onMouseEnter(event?: MouseEvent): void;
          role?: ItemProps['role'];
          tabIndex: string | number;
        } & ListItemDataAttributeProp
      >
    | string;
  dataAttribute?:
    | 'data-solid-list-item'
    | 'data-solid-menu-item'
    | 'data-solid-listbox-option'
    | 'data-solid-combobox-option'
    | 'data-solid-radio-group-option';
  disabled?: boolean;
  idPrefix?: string;
  onClick?: (event?: MouseEvent) => void;
  role?: 'menuitem' | 'option' | 'radio';
  value?: any;
};

type ItemState = {
  isActive: Accessor<boolean>;
  isSelected: Accessor<boolean>;
  value: any;
};

const ItemContext = createContext<ItemState>();
export function useItemContext() {
  return useContext(ItemContext);
}

export const Item: BaseComponent<ItemProps> = function Item(props) {
  props = mergeProps({ as: 'li', dataAttribute: 'data-solid-list-item', disabled: false }, props);

  const state = useListState();
  const actions = useListActions();

  const itemId = useId(props.idPrefix || 'item');

  onMount(() =>
    actions.onItemMount({ id: itemId, value: props.value, isDisabled: props.disabled })
  );

  createEffect(() => {
    actions.onItemDisabledChange(itemId, props.disabled);
  });

  onCleanup(() => {
    actions.onItemCleanup(itemId);
  });

  const isActive = createMemo(() => !!state.items.find((item) => item.id === itemId)?.isActive);
  const isSelected = createMemo(() => state.valueSelected === props.value);

  function handleClick(event: MouseEvent) {
    if (props.disabled) return;
    props.onClick?.(event);
    actions.onItemSelect(props.value);
  }

  function handleMouseEnter() {
    if (props.disabled) return;
    actions.onItemFocus({ position: Position.Specific, id: itemId });
  }

  function handleFocus() {
    if (state.useRovingTabIndex && !isActive()) {
      actions.onItemFocus({ position: Position.Specific, id: itemId });
    }
  }

  function handleBlur() {
    if (state.useRovingTabIndex && isActive()) {
      actions.onItemFocus({ position: Position.None });
    }
  }

  const [localProps, otherProps] = splitProps(props, ['as', 'dataAttribute', 'idPrefix', 'value']);

  return (
    <ItemContext.Provider value={{ isActive, isSelected, value: props.value }}>
      <Dynamic
        {...otherProps}
        component={localProps.as}
        aria-checked={state.isRadioList && isSelected() ? true : false}
        aria-selected={!state.isRadioList && isSelected() ? true : undefined}
        {...({ [localProps.dataAttribute]: '' } as ListItemDataAttributeProp)}
        data-active={isActive() ? '' : undefined}
        data-selected={isSelected() ? '' : undefined}
        disabled={props.disabled}
        id={itemId}
        onBlur={handleBlur}
        onClick={handleClick}
        onFocus={handleFocus}
        onMouseEnter={handleMouseEnter}
        tabIndex={state.useRovingTabIndex && isSelected() ? 0 : -1}
      />
    </ItemContext.Provider>
  );
};

type ItemComponentType = {
  (props: BaseComponentProps<ItemProps>): JSXElement;
  state: {
    isActive: Accessor<boolean>;
    isSelected: Accessor<boolean>;
  };
};

const ItemComponent: ItemComponentType = Object.assign(Item, {
  state: {
    isActive() {
      return useItemContext().isActive();
    },
    isSelected() {
      return useItemContext().isSelected();
    },
  },
});

export default ItemComponent;
