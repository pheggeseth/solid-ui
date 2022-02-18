import { createEffect, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useCalendarActions, useCalendarState, useDateContext } from '~/Calendar/context';
import { useKeyEventHandlers } from '~/eventUtils';
import { BaseComponent, StyleProps } from '~/types';

const dataAttributeDayButton = {
  'data-solid-calendar-view-body-day-button': '' as const,
};

const dataAttributeDayCell = {
  'data-solid-calendar-view-body-day-cell': '' as const,
};

type DayProps = {
  as?:
    | string
    | BaseComponent<
        {
          onClick(event: MouseEvent): void;
          onKeyDown(event: KeyboardEvent): void;
          tabIndex: DayProps['tabIndex'];
        },
        typeof dataAttributeDayButton
      >;
  cellProps?: StyleProps & {
    as?: string | BaseComponent<{}, typeof dataAttributeDayCell>;
  };
  tabIndex?: number | string;
};

const Day: BaseComponent<DayProps> = (props) => {
  props = mergeProps(
    { as: 'button', cellProps: { as: props.cellProps?.as || 'td' }, tabIndex: 0 },
    props
  );

  const state = useCalendarState();
  const actions = useCalendarActions();

  const date = useDateContext();

  function handleClick() {
    actions.onDateClick(date);
  }

  const handleKeyDown = useKeyEventHandlers({
    ArrowUp: actions.goToPreviousWeek,
    ArrowDown: actions.goToNextWeek,
    ArrowLeft: actions.goToPreviousDay,
    ArrowRight: actions.goToNextDay,
  });

  let buttonRef;

  createEffect(() => {
    if (date === state.activeDate && state.isActiveDateFromKeyboardMove) {
      buttonRef.focus();
    }
  });

  const [localProps, otherProps] = splitProps(props, ['as', 'cellProps', 'tabIndex']);
  const [localCellProps, otherCellProps] = splitProps(localProps.cellProps, ['as']);

  return (
    <Dynamic {...otherCellProps} component={localCellProps.as} {...dataAttributeDayCell}>
      <Dynamic
        {...otherProps}
        component={localProps.as}
        {...dataAttributeDayButton}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={buttonRef}
        tabIndex={localProps.tabIndex}
      />
    </Dynamic>
  );
};

export default Day;
