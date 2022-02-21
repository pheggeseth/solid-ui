import dayjs from 'dayjs';
import { createEffect, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  useCalendarActions,
  useCalendarState,
  useDayComponentContext,
} from '~/components/Calendar/context';
import { BaseComponent, StyleProps } from '~/types';
import { useKeyEventHandlers } from '~/utils/eventUtils';

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
          'data-active'?: '';
          'data-current-month'?: '';
          'data-date-range'?: '';
          'data-selected'?: '';
          'data-today'?: '';
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

  const context = useDayComponentContext();

  function handleClick() {
    if (context.date() === state.activeDate) {
      actions.onDateClick(context.date());
    }
  }

  const handleKeyDown = useKeyEventHandlers({
    ArrowUp: actions.goToPreviousWeek,
    ArrowDown: actions.goToNextWeek,
    ArrowLeft: actions.goToPreviousDay,
    ArrowRight: actions.goToNextDay,
  });

  function handleFocus() {
    if (context.date() !== state.activeDate) {
      actions.selectDate(dayjs(context.date()));
    }
  }

  let buttonRef;

  createEffect(() => {
    if (context.date() === state.activeDate && state.isActiveDateFromKeyboardMove) {
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
        data-active={context.isActive() ? '' : undefined}
        data-current-month={context.isInCurrentMonth() ? '' : undefined}
        data-date-range={context.isInDateRange() ? '' : undefined}
        data-selected={context.isSelected() ? '' : undefined}
        data-today={context.isToday() ? '' : undefined}
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
