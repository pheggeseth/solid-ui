import { useKeyEventHandlers } from '~/eventUtils';
import { InitialMountFocus, useListActions, useListState } from '~/List/context';
import { PopoverTrigger } from '~/Popover';
import { usePopoverActions } from '~/Popover/context';
import { BaseComponent } from '~/types';

export type ButtonProps = {
  idPrefix?: string;
};

export const Button: BaseComponent<ButtonProps> = function Button(props) {
  const PopoverActions = usePopoverActions();
  const ListState = useListState();
  const ListActions = useListActions();

  function handleClick() {
    ListActions.onInitialMountFocusChange(InitialMountFocus.First);
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
    <PopoverTrigger
      {...props}
      idPrefix={props.idPrefix || 'menu-button'}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {props.children}
    </PopoverTrigger>
  );
};

export default Button;
