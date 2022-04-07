import { mergeProps } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarActions, useCalendarContext, useCalendarState } from '../context';

export type CreateSelectMonthConfig = {
  'aria-label'?: string;
  idPrefix?: string;
  onChange?: (newMonth: number) => void;
};

const monthFormatter = new Intl.DateTimeFormat([], { month: 'long' });
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
  const date = new Date();
  date.setMonth(month);

  return {
    displayValue: monthFormatter.format(date),
    value: month,
  };
});

export function createSelectMonth(config: CreateSelectMonthConfig = {}) {
  const props = createSelectMonthProps(config);
  const handlers = createSelectMonthHandlers(config);

  return {
    props: mergeProps(props, handlers),
    context: {
      ...useCalendarContext(),
      monthOptions: () => months,
    },
  } as const;
}

export function createSelectMonthProps(config: CreateSelectMonthConfig = {}) {
  const { 'aria-label': ariaLabel = 'select month', idPrefix = 'solid-ui-calendar-select-month' } =
    config;
  const id = useId(idPrefix);

  const state = useCalendarState();

  return {
    'aria-label': ariaLabel,
    ...getDataProp(idPrefix),
    'data-solid-ui-select': '',
    id,
    get value() {
      return state.visibleMonth;
    },
  } as const;
}

export function createSelectMonthHandlers(config: CreateSelectMonthConfig = {}) {
  const actions = useCalendarActions();

  const onChange = (newMonth: number) => {
    actions.selectVisibleMonth(newMonth);
    config.onChange?.(newMonth);
  };

  return {
    onChange,
  } as const;
}
