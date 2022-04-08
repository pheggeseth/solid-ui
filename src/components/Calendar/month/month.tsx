import { JSX } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarContext, useCalendarState } from '../context';

export type CreateMonthConfig = {
  idPrefix?: string;
  role?: JSX.IntrinsicElements['table']['role'];
};

export function createMonth(config: CreateMonthConfig = {}) {
  const props = createMonthProps(config);

  return {
    props,
    context: useCalendarContext(),
  } as const;
}

export function createMonthProps(config: CreateMonthConfig = {}) {
  const { idPrefix = 'solid-ui-calendar-month', role = 'grid' } = config;
  const id = useId(idPrefix);
  const state = useCalendarState();

  return {
    get ['aria-label']() {
      return state.ariaLabel;
    },
    ...getDataProp(idPrefix),
    id,
    role,
  } as const;
}
