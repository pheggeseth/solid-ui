import { JSXElement, mergeProps } from 'solid-js';
import { ListItem } from '~/List';
import { ItemProps } from '~/List/Item';
import { BaseComponent, BaseComponentProps } from '~/types';

type MenuItemDataAttribute =
  | 'data-solid-menu-item'
  | 'data-solid-listbox-option'
  | 'data-solid-combobox-option';

type MenuItemProps = Omit<ItemProps, 'dataAttribute'> & { dataAttribute?: MenuItemDataAttribute };

const MenuItem: BaseComponent<MenuItemProps> = (props) => {
  props = mergeProps({ role: 'menuitem', dataAttribute: 'data-solid-menu-item' }, props);
  return <ListItem {...props} />;
};

type MenuItemComponent = {
  (props: BaseComponentProps<MenuItemProps>): JSXElement;
  state: typeof ListItem.state;
};

export const Item: MenuItemComponent = Object.assign(MenuItem, {
  state: ListItem.state,
});

export default Item;
