import { mergeProps } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarActions, useCalendarContext, useCalendarState } from '../context';

export type CreateSelectYearConfig = {
  'aria-label'?: string;
  idPrefix?: string;
  onChange?: (newYear: number) => void;
};

export function createSelectYear(config: CreateSelectYearConfig = {}) {
  const props = createSelectYearProps(config);
  const handlers = createSelectYearHandlers(config);

  return {
    props: mergeProps(props, handlers),
    context: useCalendarContext(),
  } as const;
}

export function createSelectYearProps(config: CreateSelectYearConfig = {}) {
  const { 'aria-label': ariaLabel = 'select year', idPrefix = 'solid-ui-calendar-select-year' } =
    config;
  const id = useId(idPrefix);

  const state = useCalendarState();

  return {
    'aria-label': ariaLabel,
    ...getDataProp(idPrefix),
    'data-solid-ui-select': '',
    id,
    get value() {
      return state.visibleYear;
    },
  } as const;
}

export function createSelectYearHandlers(config: CreateSelectYearConfig = {}) {
  const actions = useCalendarActions();

  const onChange = (newYear: number) => {
    actions.selectVisibleYear(newYear);
    config.onChange?.(newYear);
  };

  return {
    onChange,
  } as const;
}
