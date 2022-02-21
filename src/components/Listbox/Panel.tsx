import { mergeProps } from 'solid-js';
import { PopoverPanel } from '~/components/Popover';
import { PanelProps } from '~/components/Popover/Panel';
import { BaseComponent } from '~/types';

const Panel: BaseComponent<
  Omit<PanelProps, 'dataAttribute'> & {
    dataAttribute?: 'data-solid-listbox-panel' | 'data-solid-combobox-panel';
  }
> = (props) => {
  props = mergeProps({ dataAttribute: 'data-solid-listbox-panel' }, props);
  return <PopoverPanel {...props} />;
};

export default Panel;