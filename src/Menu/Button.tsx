import { mergeProps } from 'solid-js';
import { useKeyEventHandlers } from '~/eventUtils';
import { InitialMountFocus, useListActions, useListState } from '~/List/context';
import { PopoverTrigger } from '~/Popover';
import { usePopoverActions } from '~/Popover/context';
import { TriggerProps } from '~/Popover/Trigger';
import { BaseComponent } from '~/types';

export type ButtonProps = Omit<TriggerProps, 'dataAttribute'> & {
  dataAttribute?: 'data-solid-menu-button' | 'data-solid-listbox-button';
};

export const Button: BaseComponent<ButtonProps> = function Button(props) {
  props = mergeProps({ idPrefix: 'menu-button', dataAttribute: 'data-solid-menu-button' }, props);

  const PopoverActions = usePopoverActions();
  const ListState = useListState();
  const ListActions = useListActions();

  function handleClick(event: MouseEvent) {
    ListActions.onInitialMountFocusChange(InitialMountFocus.First);
    props.onClick?.(event);
  }

  const handleKeyDown = useKeyEventHandlers({
    Enter() {
      ListActions.onInitialMountFocusChange(InitialMountFocus.First);
    },
    [' ']() {
      ListActions.onInitialMountFocusChange(InitialMountFocus.First);
    },
    ArrowDown() {
      if (ListState.orientation !== 'vertical') return;

      ListActions.onInitialMountFocusChange(InitialMountFocus.First);
      PopoverActions.openPopover();
    },
    ArrowUp() {
      if (ListState.orientation !== 'vertical') return;

      ListActions.onInitialMountFocusChange(InitialMountFocus.Last);
      PopoverActions.openPopover();
    },
    ArrowLeft() {
      if (ListState.orientation !== 'horizontal') return;

      ListActions.onInitialMountFocusChange(InitialMountFocus.Last);
      PopoverActions.openPopover();
    },
    ArrowRight() {
      if (ListState.orientation !== 'horizontal') return;

      ListActions.onInitialMountFocusChange(InitialMountFocus.First);
      PopoverActions.openPopover();
    },
  });

  return (
    <PopoverTrigger {...props} onClick={handleClick} onKeyDown={handleKeyDown}>
      {props.children}
    </PopoverTrigger>
  );
};

export default Button;
