import { mergeProps } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarActions, useCalendarContext, useCalendarState } from '../context';

export type CreateSelectConfig = {
  'aria-label'?: string;
  idPrefix?: string;
  onChange?: (newValue: number) => void;
  unit: 'year' | 'month';
};

export function createSelect(config: CreateSelectConfig) {
  const props = createSelectProps(config);
  const handlers = createSelectHandlers(config);
  const state = useCalendarState();

  return {
    props: mergeProps(props, handlers),
    context: {
      ...useCalendarContext(),
      value: () => (config.unit === 'month' ? state.visibleMonth : state.visibleYear),
      options: () =>
        config.unit === 'month'
          ? [...Array(12).keys()]
          : [...Array(101).keys()].map((n) => n + state.visibleYear - 50),
    },
  } as const;
}

export function createSelectProps(config: CreateSelectConfig) {
  const {
    'aria-label': ariaLabel = `view calendar ${config.unit}`,
    idPrefix = `solid-ui-calendar-select-${config.unit}`,
  } = config;
  const id = useId(idPrefix);

  return {
    'aria-label': ariaLabel,
    ...getDataProp(idPrefix),
    'data-solid-ui-select': '',
    id,
  } as const;
}

export function createSelectHandlers(config: CreateSelectConfig) {
  const actions = useCalendarActions();

  const onChange = (newValue: number) => {
    const action = config.unit === 'year' ? actions.selectVisibleYear : actions.selectVisibleMonth;
    action(newValue);
    config.onChange?.(newValue);
  };

  return {
    onChange,
  } as const;
}
