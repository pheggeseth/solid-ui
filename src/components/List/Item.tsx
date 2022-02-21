import { createEffect, createMemo, mergeProps, onCleanup, onMount, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponent, BaseComponentProps } from '~/types';
import { useId } from '~/utils/componentUtils';
import { ListItemExternalContext, Position, useListActions, useListState } from './context';

type ListItemDataAttributeProp =
  | { 'data-solid-list-item': '' }
  | { 'data-solid-menu-item': '' }
  | { 'data-solid-listbox-option': '' }
  | { 'data-solid-combobox-option': '' };

export type ItemProps<T> = {
  as?:
    | BaseComponent<
        {
          disabled: ItemProps<T>['disabled'];
          id?: string;
          onBlur(event?: FocusEvent): void;
          onClick: ItemProps<T>['onClick'];
          onFocus(event?: FocusEvent): void;
          onMouseEnter(event?: MouseEvent): void;
          role?: ItemProps<T>['role'];
          tabIndex: string | number;
        } & ListItemDataAttributeProp
      >
    | string;
  context?: (context: ListItemExternalContext<T>) => void;
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
  value?: T;
};

function Item<T = any>(props: BaseComponentProps<ItemProps<T>>) {
  props = mergeProps({ as: 'li', dataAttribute: 'data-solid-list-item', disabled: false }, props);

  const state = useListState<T>();
  const actions = useListActions<T>();

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
  const isSelected = createMemo(
    () => props.value !== undefined && props.value === state.valueSelected
  );

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

  const externalContext = {
    isActive,
    isSelected,
    value: createMemo(() => props.value),
  };

  props.context?.(externalContext);

  return (
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
  );
}

export default Item;
