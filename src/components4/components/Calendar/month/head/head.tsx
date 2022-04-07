import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarContext } from '../../context';

export type CreateMonthHeadConfig = {
  idPrefix?: string;
};

export function createMonthHead(config: CreateMonthHeadConfig = {}) {
  const props = createMonthHeadProps(config);

  return {
    props,
    context: useCalendarContext(),
  } as const;
}

export function createMonthHeadProps(config: CreateMonthHeadConfig = {}) {
  const { idPrefix = 'solid-ui-calendar-month-head' } = config;
  const id = useId(idPrefix);

  return {
    ...getDataProp(idPrefix),
    id,
  } as const;
}
