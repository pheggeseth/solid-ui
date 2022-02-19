import dayjs from 'dayjs';
import { createEffect, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  externalState,
  useCalendarActions,
  useCalendarState,
  useDateContext,
} from '~/components/Calendar/context';
import { useKeyEventHandlers } from '~/utils/eventUtils';
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
          disabled: boolean;
          onClick(event: MouseEvent): void;
          onKeyDown(event: KeyboardEvent): void;
          onFocus(event: FocusEvent): void;
          tabIndex: DayProps['tabIndex'];
        },
        typeof dataAttributeDayButton
      >;
  cellProps?: StyleProps & {
    as?: string | BaseComponent<{}, typeof dataAttributeDayCell>;
  };
  disabled?: boolean;
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
    if (date === state.activeDate) {
      actions.onDateClick(date);
    }
  }

  const handleKeyDown = useKeyEventHandlers({
    ArrowUp: actions.goToPreviousWeek,
    ArrowDown: actions.goToNextWeek,
    ArrowLeft: actions.goToPreviousDay,
    ArrowRight: actions.goToNextDay,
  });

  function handleFocus() {
    if (date !== state.activeDate) {
      actions.selectDate(dayjs(date));
    }
  }

  let buttonRef;

  createEffect(() => {
    if (date === state.activeDate && state.isActiveDateFromKeyboardMove) {
      buttonRef.focus();
    }
  });

  const [localProps, otherProps] = splitProps(props, ['as', 'cellProps', 'disabled', 'tabIndex']);
  const [localCellProps, otherCellProps] = splitProps(localProps.cellProps, ['as']);

  return (
    <Dynamic {...otherCellProps} component={localCellProps.as} {...dataAttributeDayCell}>
      <Dynamic
        {...otherProps}
        component={localProps.as}
        {...dataAttributeDayButton}
        data-active={externalState.isDateActive ? '' : undefined}
        data-current-month={externalState.isDateInCurrentMonth ? '' : undefined}
        data-date-range={externalState.isDateInRange ? '' : undefined}
        data-selected={externalState.isDateSelected ? '' : undefined}
        data-today={externalState.isDateToday ? '' : undefined}
        disabled={localProps.disabled}
        onClick={handleClick}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        ref={buttonRef}
        tabIndex={localProps.tabIndex}
      />
    </Dynamic>
  );
};

export default Day;
