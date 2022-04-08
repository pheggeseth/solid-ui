import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarContext } from '../../context';

export type CreateMonthBodyWeekConfig = {
  idPrefix?: string;
};

export function createMonthBodyWeek(config: CreateMonthBodyWeekConfig = {}) {
  const props = createMonthBodyWeekProps(config);

  return {
    props,
    context: useCalendarContext(),
  } as const;
}

export function createMonthBodyWeekProps(config: CreateMonthBodyWeekConfig = {}) {
  const { idPrefix = 'solid-ui-calendar-month-body-week' } = config;
  const id = useId(idPrefix);

  return {
    ...getDataProp(idPrefix),
    id,
  } as const;
}
