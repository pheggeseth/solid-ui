import { mergeProps } from 'solid-js';
import { ItemProps } from '~/oldComponents/List/Item';
import { MenuItem } from '~/oldComponents/Menu';
import { BaseComponentProps } from '~/types';

type ListboxOptionDataAttribute = 'data-solid-listbox-option' | 'data-solid-combobox-option';

type OptionProps<T> = Omit<ItemProps<T>, 'dataAttribute'> & {
  dataAttribute?: ListboxOptionDataAttribute;
};

function Option<T = any>(props: BaseComponentProps<OptionProps<T>>) {
  props = mergeProps({ role: 'option', dataAttribute: 'data-solid-listbox-option' }, props);

  return <MenuItem<T> {...props} />;
}

export default Option;
