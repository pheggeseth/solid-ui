import { mergeProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarActions, useCalendarContext } from '../context';

export type CreateNavConfig<NavElement extends HTMLElement = HTMLElement> = {
  'aria-label'?: string;
  direction: 'previous' | 'next';
  idPrefix?: string;
  onClick?: JSX.EventHandler<NavElement, MouseEvent>;
  unit: 'year' | 'month';
};

export function createNav<NavElement extends HTMLElement = HTMLElement>(
  config: CreateNavConfig<NavElement>
) {
  const props = createNavProps(config);
  const handlers = createNavHandlers(config);

  return {
    props: mergeProps(props, handlers),
    context: useCalendarContext(),
  } as const;
}

export function createNavProps<NavElement extends HTMLElement = HTMLElement>(
  config: CreateNavConfig<NavElement>
) {
  const {
    'aria-label': ariaLabel = `view ${config.direction} ${config.unit}`,
    idPrefix = `solid-ui-calendar-${config.direction}-${config.unit}`,
  } = config;
  const id = useId(idPrefix);

  return {
    'aria-label': ariaLabel,
    ...getDataProp(idPrefix),
    'data-solid-ui-button': '',
    id,
  } as const;
}

export function createNavHandlers<NavElement extends HTMLElement = HTMLElement>(
  config: CreateNavConfig<NavElement>
) {
  const actions = useCalendarActions();

  const onClick: JSX.EventHandler<NavElement, MouseEvent> = (event) => {
    actions.view(config.direction, config.unit);
    config.onClick?.(event);
  };

  return {
    onClick,
  } as const;
}
