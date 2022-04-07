import { Accessor } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarContext, useCalendarSelectors } from '../../context';

export type CreateMonthBodyDayConfig = {
  idPrefix?: string;
  date: Accessor<Date>;
};

export function createMonthBodyDay(config: CreateMonthBodyDayConfig) {
  const props = createMonthBodyDayProps(config);

  return {
    props,
    context: useCalendarContext(),
  } as const;
}

export function createMonthBodyDayProps(config: CreateMonthBodyDayConfig) {
  const { idPrefix = 'solid-ui-calendar-month-body-day' } = config;
  const id = useId(idPrefix);
  const selectors = useCalendarSelectors();

  return {
    ...getDataProp(idPrefix),
    get ['data-active']() {
      return selectors.isActive(config.date()) ? '' : undefined;
    },
    get ['data-date-range']() {
      return selectors.isInDateRange(config.date()) ? '' : undefined;
    },
    get ['data-selected']() {
      return selectors.isSelected(config.date()) ? '' : undefined;
    },
    get ['data-today']() {
      return selectors.isToday(config.date()) ? '' : undefined;
    },
    get ['data-visible-month']() {
      return selectors.isInVisibleMonth(config.date()) ? '' : undefined;
    },
    id,
  } as const;
}
