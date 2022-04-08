import { createMemo, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useId } from '~/utils/componentUtils';
import { usePopoverState } from '~/oldComponents/Popover/context';
import { PopoverPanelConfigContext } from '~/oldComponents/Popover/Panel';
import { BaseComponent } from '~/types';
import { useComboboxState } from './context';

const dataAttribute = {
  'data-solid-combobox-container': '' as const,
};

export type ContainerProps = {
  as?:
    | string
    | BaseComponent<
        {
          'aria-expanded': boolean;
          'aria-haspopup': ContainerProps['aria-haspopup'];
          'aria-owns': string;
          id: string;
          role: string;
        },
        typeof dataAttribute
      >;
  'aria-haspopup'?: boolean | string;
};

const Container: BaseComponent<ContainerProps> = (props) => {
  props = mergeProps({ 'aria-haspopup': 'listbox', as: 'div' }, props);

  const popoverState = usePopoverState();
  const state = useComboboxState();

  const comboboxId = useId('combobox');

  const clickAwayExceptions = createMemo(() =>
    state.textboxId ? [document.getElementById(state.textboxId)] : []
  );

  const [localProps, otherProps] = splitProps(props, ['as', 'aria-haspopup']);

  return (
    <PopoverPanelConfigContext.Provider value={{ clickAwayExceptions, disableFocus: true }}>
      <Dynamic
        {...otherProps}
        component={localProps.as}
        aria-expanded={popoverState.isOpen}
        aria-haspopup={localProps['aria-haspopup']}
        aria-owns={state.listboxId}
        {...dataAttribute}
        id={comboboxId}
        role="combobox"
      />
    </PopoverPanelConfigContext.Provider>
  );
};

export default Container;
