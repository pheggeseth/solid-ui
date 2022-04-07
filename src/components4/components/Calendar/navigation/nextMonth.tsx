import { JSX, mergeProps } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarActions, useCalendarContext } from '../context';

export type CreateNextMonthConfig<NextMonthElement extends HTMLButtonElement = HTMLButtonElement> =
  {
    'aria-label'?: string;
    idPrefix?: string;
    onClick?: JSX.EventHandler<NextMonthElement, MouseEvent>;
  };

export function createNextMonth<NextMonthElement extends HTMLButtonElement = HTMLButtonElement>(
  config: CreateNextMonthConfig<NextMonthElement> = {}
) {
  const props = createNextMonthProps(config);
  const handlers = createNextMonthHandlers(config);

  return {
    props: mergeProps(props, handlers),
    context: useCalendarContext(),
  } as const;
}

export function createNextMonthProps<
  NextMonthElement extends HTMLButtonElement = HTMLButtonElement
>(config: CreateNextMonthConfig<NextMonthElement> = {}) {
  const { 'aria-label': ariaLabel = 'next month', idPrefix = 'solid-ui-calendar-next-month' } =
    config;
  const id = useId(idPrefix);

  return {
    'aria-label': ariaLabel,
    ...getDataProp(idPrefix),
    'data-solid-ui-button': '',
    id,
  } as const;
}

export function createNextMonthHandlers<
  NextMonthElement extends HTMLButtonElement = HTMLButtonElement
>(config: CreateNextMonthConfig<NextMonthElement>) {
  const actions = useCalendarActions();

  const onClick: JSX.EventHandler<NextMonthElement, MouseEvent> = (event) => {
    actions.view('next', 'month');
    config.onClick?.(event);
  };

  return {
    onClick,
  } as const;
}
