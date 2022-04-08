import { mergeProps, onMount, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useId } from '~/utils/componentUtils';
import { BaseComponent } from '~/types';
import { useComboboxActions } from './context';

const dataAttribute = {
  'data-solid-combobox-dropdown': '' as const,
};

export type DropdownProps = {
  'aria-label'?: string;
  as?:
    | string
    | BaseComponent<
        {
          onClick: DropdownProps['onClick'];
          onMouseDown: DropdownProps['onMouseDown'];
          id: string;
          role: 'button';
        },
        typeof dataAttribute
      >;
  onClick?: (event: MouseEvent) => void;
  onMouseDown?: (event: MouseEvent) => void;
};

const Dropdown: BaseComponent<DropdownProps> = (props) => {
  props = mergeProps({ 'aria-label': 'Show options', as: 'div' }, props);

  const ComboboxActions = useComboboxActions();

  const dropdownId = useId('combobox-dropdown');

  onMount(() => {
    ComboboxActions.onDropdownMount(dropdownId);
  });

  function handleClick() {
    ComboboxActions.onDropdownOpen();
  }

  function handleMouseDown(event: MouseEvent) {
    event.preventDefault();
  }

  const [localProps, otherProps] = splitProps(props, ['as', 'aria-label']);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      aria-label={localProps['aria-label']}
      {...dataAttribute}
      id={dropdownId}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      role="button"
    />
  );
};

export default Dropdown;
