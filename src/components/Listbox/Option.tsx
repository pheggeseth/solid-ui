import { JSXElement, mergeProps } from 'solid-js';
import { ItemProps } from '~/components/List/Item';
import { MenuItem } from '~/components/Menu';
import { BaseComponent, BaseComponentProps } from '~/types';

type ListboxOptionDataAttribute = 'data-solid-listbox-option' | 'data-solid-combobox-option';

type OptionProps = Omit<ItemProps, 'dataAttribute'> & { dataAttribute?: ListboxOptionDataAttribute };

const OptionItem: BaseComponent<OptionProps> = (props) => {
  props = mergeProps({ role: 'option', dataAttribute: 'data-solid-listbox-option' }, props);

  return <MenuItem {...props} />;
};

type OptionItemComponent = {
  (props: BaseComponentProps<OptionProps>): JSXElement;
  state: typeof MenuItem.state;
};

export const Option: OptionItemComponent = Object.assign(OptionItem, {
  state: MenuItem.state,
});

export default Option;
