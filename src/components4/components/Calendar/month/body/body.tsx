import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarContext } from '../../context';

export type CreateMonthBodyConfig = {
  idPrefix?: string;
};

export function createMonthBody(config: CreateMonthBodyConfig = {}) {
  const props = createMonthBodyProps(config);

  return {
    props,
    context: useCalendarContext(),
  } as const;
}

export function createMonthBodyProps(config: CreateMonthBodyConfig = {}) {
  const { idPrefix = 'solid-ui-calendar-month-body' } = config;
  const id = useId(idPrefix);

  return {
    ...getDataProp(idPrefix),
    id,
  } as const;
}
