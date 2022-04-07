import { JSX, mergeProps } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarActions, useCalendarContext } from '../context';

export type CreateTodayConfig<TodayElement extends HTMLButtonElement = HTMLButtonElement> = {
  'aria-label'?: string;
  idPrefix?: string;
  onClick?: JSX.EventHandler<TodayElement, MouseEvent>;
};

export function createToday<TodayElement extends HTMLButtonElement = HTMLButtonElement>(
  config: CreateTodayConfig<TodayElement>
) {
  const props = createTodayProps(config);
  const handlers = createTodayHandlers(config);

  return {
    props: mergeProps(props, handlers),
    context: useCalendarContext(),
  } as const;
}

export function createTodayProps<TodayElement extends HTMLButtonElement = HTMLButtonElement>(
  config: CreateTodayConfig<TodayElement>
) {
  const { 'aria-label': ariaLabel = 'go to today', idPrefix = 'solid-ui-calendar-view-today' } =
    config;
  const id = useId(idPrefix);

  return {
    'aria-label': ariaLabel,
    ...getDataProp(idPrefix),
    'data-solid-ui-button': '',
    id,
  } as const;
}

export function createTodayHandlers<TodayElement extends HTMLButtonElement = HTMLButtonElement>(
  config: CreateTodayConfig<TodayElement>
) {
  const actions = useCalendarActions();

  const onClick: JSX.EventHandler<TodayElement, MouseEvent> = (event) => {
    actions.selectDate(new Date());
    config.onClick?.(event);
  };

  return {
    onClick,
  } as const;
}
