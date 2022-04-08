import { mergeProps, splitProps } from 'solid-js';
import { ListProps } from '~/oldComponents/List';
import { ListOrientation, useListState } from '~/oldComponents/List/context';
import { MenuItems } from '~/oldComponents/Menu';
import { BaseComponent } from '~/types';

type ListboxOptionsDataAttributeProp =
  | { 'data-solid-listbox-options': '' }
  | { 'data-solid-combobox-options': '' };

export type OptionsProps = {
  as?: string | BaseComponent<Omit<ListProps, 'dataAttribute'> & ListboxOptionsDataAttributeProp>;
  'aria-orientation'?: ListOrientation;
  dataAttribute?: 'data-solid-listbox-options' | 'data-solid-combobox-options';
  dataAttributePanel?: 'data-solid-listbox-panel' | 'data-solid-combobox-panel';
};

const Options: BaseComponent<OptionsProps> = (props) => {
  props = mergeProps(
    {
      as: 'ul',
      dataAttribute: 'data-solid-listbox-options',
      dataAttributePanel: 'data-solid-listbox-panel',
    },
    props
  );

  const ListState = useListState();

  const [localProps, otherProps] = splitProps(props, [
    'as',
    'aria-orientation',
    'dataAttribute',
    'dataAttributePanel',
  ]);

  return (
    <MenuItems
      {...otherProps}
      as={localProps.as}
      aria-labelledby={ListState.labelId}
      aria-orientation={localProps['aria-orientation']}
      dataAttribute={localProps.dataAttribute}
      dataAttributePanel={localProps.dataAttributePanel}
      role="listbox"
    />
  );
};

export default Options;
