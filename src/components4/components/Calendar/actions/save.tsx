import { JSX, mergeProps } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarActions } from '../context';

export type CreateSaveConfig<SaveElement extends HTMLButtonElement = HTMLButtonElement> = {
  idPrefix?: string;
  onClick?: JSX.EventHandler<SaveElement, MouseEvent>;
};

export function createSave<SaveElement extends HTMLButtonElement = HTMLButtonElement>(
  config: CreateSaveConfig<SaveElement> = {}
) {
  const props = createSaveProps(config);
  const handlers = createSaveHandlers(config);

  return {
    props: mergeProps(props, handlers),
  } as const;
}

export function createSaveProps<SaveElement extends HTMLButtonElement = HTMLButtonElement>(
  config: CreateSaveConfig<SaveElement> = {}
) {
  const { idPrefix = 'solid-ui-calendar-save' } = config;
  const id = useId(idPrefix);

  return {
    ...getDataProp(idPrefix),
    'data-solid-ui-button': '',
    id,
  } as const;
}

export function createSaveHandlers<SaveElement extends HTMLButtonElement = HTMLButtonElement>(
  config: CreateSaveConfig<SaveElement> = {}
) {
  const actions = useCalendarActions();

  const onClick: JSX.EventHandler<SaveElement, MouseEvent> = (event) => {
    actions.onDateConfirm();
    config.onClick?.(event);
  };

  return {
    onClick,
  } as const;
}
