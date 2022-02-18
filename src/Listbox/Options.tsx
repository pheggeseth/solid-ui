import { mergeProps, splitProps } from 'solid-js';
import { ListProps } from '~/List';
import { ListOrientation, useListState } from '~/List/context';
import { MenuItems } from '~/Menu';
import { BaseComponent } from '~/types';

type ListboxOptionsDataAttributeProp =
  | { 'data-solid-listbox-options': '' }
  | { 'data-solid-combobox-listbox': '' };

type ListboxOptionsDataAttribute = 'data-solid-listbox-options' | 'data-solid-combobox-listbox';

export type OptionsProps = {
  as?: string | BaseComponent<Omit<ListProps, 'dataAttribute'> & ListboxOptionsDataAttributeProp>;
  'aria-orientation'?: ListOrientation;
  dataAttribute?: ListboxOptionsDataAttribute;
};

const Options: BaseComponent<OptionsProps> = (props) => {
  props = mergeProps({ as: 'ul', dataAttribute: 'data-solid-listbox-options' }, props);

  const ListState = useListState();

  const [localProps, otherProps] = splitProps(props, ['as', 'aria-orientation', 'dataAttribute']);

  return (
    <MenuItems
      {...otherProps}
      as={localProps.as}
      aria-labelledby={ListState.labelId}
      aria-orientation={localProps['aria-orientation']}
      dataAttribute={localProps.dataAttribute}
      role="listbox"
    />
  );
};

export default Options;
