import { mergeProps, splitProps } from 'solid-js';
import { ListProps } from '~/components/List';
import { ListOrientation, useListState } from '~/components/List/context';
import { MenuItems } from '~/components/Menu';
import { BaseComponent } from '~/types';

type ListboxOptionsDataAttributeProp =
  | { 'data-solid-listbox-options': '' }
  | { 'data-solid-combobox-listbox': '' };

export type OptionsProps = {
  as?: string | BaseComponent<Omit<ListProps, 'dataAttribute'> & ListboxOptionsDataAttributeProp>;
  'aria-orientation'?: ListOrientation;
  dataAttribute?: 'data-solid-listbox-options' | 'data-solid-combobox-listbox';
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
