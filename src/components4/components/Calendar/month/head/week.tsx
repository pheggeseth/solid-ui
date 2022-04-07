import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarContext } from '../../context';

export type CreateMonthHeadWeekConfig = {
  idPrefix?: string;
};

export function createMonthHeadWeek(config: CreateMonthHeadWeekConfig = {}) {
  const props = createMonthHeadWeekProps(config);

  const date = new Date();
  const dates = [0, 1, 2, 3, 4, 5, 6].map((n) => {
    date.setDate(date.getDate() - date.getDay() + n);
    return date;
  });

  return {
    props,
    context: {
      ...useCalendarContext(),
      headerDates: () => dates,
    },
  } as const;
}

export function createMonthHeadWeekProps(config: CreateMonthHeadWeekConfig = {}) {
  const { idPrefix = 'solid-ui-calendar-month-head-week' } = config;
  const id = useId(idPrefix);

  return {
    ...getDataProp(idPrefix),
    id,
  } as const;
}
