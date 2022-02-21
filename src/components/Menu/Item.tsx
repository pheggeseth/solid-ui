import { mergeProps } from 'solid-js';
import { ListItem } from '~/components/List';
import { ItemProps } from '~/components/List/Item';
import { BaseComponentProps } from '~/types';

type MenuItemDataAttribute =
  | 'data-solid-menu-item'
  | 'data-solid-listbox-option'
  | 'data-solid-combobox-option';

type MenuItemProps<T> = Omit<ItemProps<T>, 'dataAttribute'> & {
  dataAttribute?: MenuItemDataAttribute;
};

function MenuItem<T = any>(props: BaseComponentProps<MenuItemProps<T>>) {
  props = mergeProps({ role: 'menuitem', dataAttribute: 'data-solid-menu-item' }, props);
  return <ListItem<T> {...props} />;
}

export default MenuItem;
