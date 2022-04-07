import { JSX, mergeProps } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarActions, useCalendarContext } from '../context';

export type CreateNextYearConfig<NextYearElement extends HTMLButtonElement = HTMLButtonElement> = {
  'aria-label'?: string;
  idPrefix?: string;
  onClick?: JSX.EventHandler<NextYearElement, MouseEvent>;
};

export function createNextYear<NextYearElement extends HTMLButtonElement = HTMLButtonElement>(
  config: CreateNextYearConfig<NextYearElement> = {}
) {
  const props = createNextYearProps(config);
  const handlers = createNextYearHandlers(config);

  return {
    props: mergeProps(props, handlers),
    context: useCalendarContext(),
  } as const;
}

export function createNextYearProps<NextYearElement extends HTMLButtonElement = HTMLButtonElement>(
  config: CreateNextYearConfig<NextYearElement> = {}
) {
  const { 'aria-label': ariaLabel = 'next year', idPrefix = 'solid-ui-calendar-next-year' } =
    config;
  const id = useId(idPrefix);

  return {
    'aria-label': ariaLabel,
    ...getDataProp(idPrefix),
    'data-solid-ui-button': '',
    id,
  } as const;
}

export function createNextYearHandlers<
  NextYearElement extends HTMLButtonElement = HTMLButtonElement
>(config: CreateNextYearConfig<NextYearElement>) {
  const actions = useCalendarActions();

  const onClick: JSX.EventHandler<NextYearElement, MouseEvent> = (event) => {
    actions.view('next', 'year');
    config.onClick?.(event);
  };

  return {
    onClick,
  } as const;
}
