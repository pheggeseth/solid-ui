import { JSX, mergeProps } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarActions } from '../context';

export type CreateCancelConfig<CancelElement extends HTMLButtonElement = HTMLButtonElement> = {
  idPrefix?: string;
  onClick?: JSX.EventHandler<CancelElement, MouseEvent>;
};

export function createCancel<CancelElement extends HTMLButtonElement = HTMLButtonElement>(
  config: CreateCancelConfig = {}
) {
  const props = createCancelProps(config);
  const handlers = createCancelHandlers<CancelElement>(config);

  return {
    props: mergeProps(props, handlers),
  } as const;
}

export function createCancelProps(config: CreateCancelConfig = {}) {
  const { idPrefix = 'solid-ui-calendar-cancel' } = config;
  const id = useId(idPrefix);

  return {
    'solid-ui-button': '',
    ...getDataProp(idPrefix),
    id,
  } as const;
}

export function createCancelHandlers<CancelElement extends HTMLButtonElement = HTMLButtonElement>(
  config: CreateCancelConfig = {}
) {
  const actions = useCalendarActions();

  const onClick: JSX.EventHandler<CancelElement, MouseEvent> = (event) => {
    actions.onCancel();
    config.onClick?.(event);
  };

  return {
    onClick,
  } as const;
}
