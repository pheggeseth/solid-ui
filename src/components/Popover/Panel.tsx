import { Accessor, createContext, mergeProps, splitProps, useContext } from 'solid-js';
import { Dynamic, Portal, Show } from 'solid-js/web';
import { BaseComponent } from '~/types';
import { useId } from '~/utils/componentUtils';
import { useOnClickAway } from '~/utils/eventUtils';
import { getFirstFocusableElement, useFocusOnOpen, useFocusTrap } from '~/utils/focusUtils';
import { usePopoverActions, usePopoverState } from './context';

export const PopoverPanelConfigContext =
  createContext<{ clickAwayExceptions?: Accessor<HTMLElement[]>; disableFocus?: boolean }>();

export function usePopoverPanelConfigContext() {
  return (
    useContext(PopoverPanelConfigContext) || {
      clickAwayExceptions: () => [],
      disableFocus: false,
    }
  );
}

type PopoverPanelDataAttributeProp =
  | { 'data-solid-popover-panel': '' }
  | { 'data-solid-menu-panel': '' }
  | { 'data-solid-listbox-panel': '' }
  | { 'data-solid-combobox-panel': '' };

export type PanelProps = {
  as?:
    | string
    | BaseComponent<
        {
          'aria-modal'?: PanelProps['aria-modal'];
          id: string;
          onKeyDown: PanelProps['onKeyDown'];
          role: PanelProps['role'];
          tabIndex: string | number;
        } & PopoverPanelDataAttributeProp
      >;
  'aria-modal'?: boolean;
  dataAttribute?:
    | 'data-solid-popover-panel'
    | 'data-solid-menu-panel'
    | 'data-solid-listbox-panel'
    | 'data-solid-combobox-panel';
  onKeyDown?: (event: KeyboardEvent) => void;
  ref?: (element: HTMLElement) => void;
  role?: string;
};

const Panel: BaseComponent<PanelProps> = function Panel(props) {
  props = mergeProps({ as: 'div', dataAttribute: 'data-solid-popover-panel' }, props);

  const state = usePopoverState();
  const actions = usePopoverActions();

  const panelId = useId('popover-panel');

  actions.registerPanel(panelId);

  const { clickAwayExceptions, disableFocus = false } = usePopoverPanelConfigContext();

  function ref(element: HTMLElement) {
    actions.setPopperReference(element);
    if (!disableFocus) {
      useFocusTrap(element, () => state.isOpen);
      useFocusOnOpen(getFirstFocusableElement(element), () => state.isOpen);
    }

    const exceptions = clickAwayExceptions() || [];
    const trigger = document.getElementById(state.triggerId);
    if (trigger) exceptions.push(trigger);
    useOnClickAway(element, () => actions.closePopover(), {
      exceptions,
      shouldContainActiveElement: !disableFocus,
    });
    props.ref?.(element);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      actions.closePopover();
    }
    props.onKeyDown?.(event);
  }

  const [localProps, otherProps] = splitProps(props, ['as', 'dataAttribute', 'role']);

  return (
    <Show when={state.isPanelOpen}>
      <Portal>
        <Dynamic
          {...otherProps}
          component={localProps.as}
          {...({ [localProps.dataAttribute]: '' } as PopoverPanelDataAttributeProp)}
          id={state.panelId}
          onKeyDown={handleKeyDown}
          ref={ref}
          role={localProps.role}
          tabIndex={disableFocus ? -1 : 0}
        />
      </Portal>
    </Show>
  );
};

export default Panel;
