import { mergeProps } from 'solid-js';
import { PopoverPanel } from '~/oldComponents/Popover';
import { PanelProps } from '~/oldComponents/Popover/Panel';
import { BaseComponent } from '~/types';

const Panel: BaseComponent<
  Omit<PanelProps, 'dataAttribute'> & {
    dataAttribute?:
      | 'data-solid-menu-panel'
      | 'data-solid-listbox-panel'
      | 'data-solid-combobox-panel';
  }
> = (props) => {
  props = mergeProps({ dataAttribute: 'data-solid-menu-panel' }, props);

  return <PopoverPanel {...props} />;
};

export default Panel;
