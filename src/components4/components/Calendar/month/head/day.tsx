import { Accessor } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarContext } from '../../context';

export type CreateMonthHeadDayConfig = {
  idPrefix?: string;
  date: Accessor<Date>;
};

export function createMonthHeadDay(config: CreateMonthHeadDayConfig) {
  const props = createMonthHeadDayProps(config);

  return {
    props,
    context: useCalendarContext(),
  } as const;
}

export function createMonthHeadDayProps(config: CreateMonthHeadDayConfig) {
  const { idPrefix = 'solid-ui-calendar-month-head-day' } = config;
  const id = useId(idPrefix);

  return {
    abbr: new Intl.DateTimeFormat([], { weekday: 'long' }).format(config.date()),
    ...getDataProp(idPrefix),
    id,
    scope: 'col',
  } as const;
}
