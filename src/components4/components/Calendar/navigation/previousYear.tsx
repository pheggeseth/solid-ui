import { JSX, mergeProps } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarActions, useCalendarContext } from '../context';

export type CreatePreviousYearConfig<
  PreviousYearElement extends HTMLButtonElement = HTMLButtonElement
> = {
  'aria-label'?: string;
  idPrefix?: string;
  onClick?: JSX.EventHandler<PreviousYearElement, MouseEvent>;
};

export function createPreviousYear<
  PreviousYearElement extends HTMLButtonElement = HTMLButtonElement
>(config: CreatePreviousYearConfig<PreviousYearElement> = {}) {
  const props = createPreviousYearProps(config);
  const handlers = createPreviousYearHandlers(config);

  return {
    props: mergeProps(props, handlers),
    context: useCalendarContext(),
  } as const;
}

export function createPreviousYearProps<
  PreviousYearElement extends HTMLButtonElement = HTMLButtonElement
>(config: CreatePreviousYearConfig<PreviousYearElement> = {}) {
  const {
    'aria-label': ariaLabel = 'previous year',
    idPrefix = 'solid-ui-calendar-previous-year',
  } = config;
  const id = useId(idPrefix);

  return {
    'aria-label': ariaLabel,
    ...getDataProp(idPrefix),
    'data-solid-ui-button': '',
    id,
  } as const;
}

export function createPreviousYearHandlers<
  PreviousYearElement extends HTMLButtonElement = HTMLButtonElement
>(config: CreatePreviousYearConfig<PreviousYearElement>) {
  const actions = useCalendarActions();

  const onClick: JSX.EventHandler<PreviousYearElement, MouseEvent> = (event) => {
    actions.view('previous', 'year');
    config.onClick?.(event);
  };

  return {
    onClick,
  } as const;
}
