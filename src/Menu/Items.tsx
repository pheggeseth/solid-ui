import { mergeProps, onMount, splitProps } from 'solid-js';
import { List, ListProps } from '~/List';
import { ListOrientation, useListActions } from '~/List/context';
import { usePopoverState } from '~/Popover/context';
import { BaseComponent } from '~/types';
import Panel from './Panel';

type ItemsProps = {
  as?: string | BaseComponent<ListProps>;
  'aria-labelledby'?: string;
  'aria-orientation'?: ListOrientation;
  dataAttribute?:
    | 'data-solid-menu-items'
    | 'data-solid-listbox-options'
    | 'data-solid-combobox-listbox';
  role?: 'menu' | 'listbox';
};

const Items: BaseComponent<ItemsProps> = (props) => {
  props = mergeProps({ as: 'div', dataAttribute: 'data-solid-menu-items', role: 'menu' }, props);

  const ListActions = useListActions();

  onMount(() => {
    if (props['aria-orientation']) {
      ListActions.registerOrientation(props['aria-orientation']);
    }
  });

  const [localProps, otherProps] = splitProps(props, [
    'as',
    'aria-labelledby',
    'aria-orientation',
    'dataAttribute',
    'role',
  ]);

  const PopoverState = usePopoverState();

  const renderList = () => (
    <List
      {...otherProps}
      as={localProps.as}
      aria-labelledby={localProps['aria-labelledby']}
      aria-orientation={localProps['aria-orientation']}
      dataAttribute={localProps.dataAttribute}
      role={localProps.role}
    />
  );

  return PopoverState.panelId ? renderList() : <Panel>{renderList()}</Panel>;
};

export default Items;
