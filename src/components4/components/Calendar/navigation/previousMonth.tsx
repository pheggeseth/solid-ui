import { JSX, mergeProps } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarActions, useCalendarContext } from '../context';

export type CreatePreviousMonthConfig<
  PreviousMonthElement extends HTMLButtonElement = HTMLButtonElement
> = {
  'aria-label'?: string;
  idPrefix?: string;
  onClick?: JSX.EventHandler<PreviousMonthElement, MouseEvent>;
};

export function createPreviousMonth<
  PreviousMonthElement extends HTMLButtonElement = HTMLButtonElement
>(config: CreatePreviousMonthConfig<PreviousMonthElement> = {}) {
  const props = createPreviousMonthProps(config);
  const handlers = createPreviousMonthHandlers(config);

  return {
    props: mergeProps(props, handlers),
    context: useCalendarContext(),
  } as const;
}

export function createPreviousMonthProps<
  PreviousMonthElement extends HTMLButtonElement = HTMLButtonElement
>(config: CreatePreviousMonthConfig<PreviousMonthElement> = {}) {
  const {
    'aria-label': ariaLabel = 'previous month',
    idPrefix = 'solid-ui-calendar-previous-month',
  } = config;
  const id = useId(idPrefix);

  return {
    'aria-label': ariaLabel,
    ...getDataProp(idPrefix),
    'data-solid-ui-button': '',
    id,
  } as const;
}

export function createPreviousMonthHandlers<
  PreviousMonthElement extends HTMLButtonElement = HTMLButtonElement
>(config: CreatePreviousMonthConfig<PreviousMonthElement>) {
  const actions = useCalendarActions();

  const onClick: JSX.EventHandler<PreviousMonthElement, MouseEvent> = (event) => {
    actions.view('previous', 'month');
    config.onClick?.(event);
  };

  return {
    onClick,
  } as const;
}
