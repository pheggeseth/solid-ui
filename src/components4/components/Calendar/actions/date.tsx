import { Accessor, createEffect, JSX, mergeProps } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useKeyEventHandlers } from '~/utils/eventUtils';
import {
  useCalendarActions,
  useCalendarContext,
  useCalendarSelectors,
  useCalendarState,
} from '../context';

export type CreateDateConfig<DateElement extends HTMLElement = HTMLElement> = {
  idPrefix?: string;
  date: Accessor<Date>;
  onClick?: JSX.EventHandler<DateElement, MouseEvent>;
  onKeyDown?: JSX.EventHandler<DateElement, KeyboardEvent>;
};

export function createDate<DateElement extends HTMLElement = HTMLElement>(
  config: CreateDateConfig
) {
  const props = createDateProps<DateElement>(config);
  const handlers = createDateHandlers<DateElement>(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createDateEffects({ ...config, id: props.id }),
    context: useCalendarContext(),
  } as const;
}

export function createDateProps<DateElement extends HTMLElement = HTMLElement>(
  config: CreateDateConfig<DateElement>
) {
  const { idPrefix = 'solid-ui-calendar-date' } = config;
  const id = useId(idPrefix);
  const selectors = useCalendarSelectors();

  return {
    ...getDataProp(idPrefix),
    id,
    get tabIndex() {
      return selectors.isActive(config.date()) ? 0 : -1;
    },
  } as const;
}

export function createDateHandlers<DateElement extends HTMLElement = HTMLElement>(
  config: CreateDateConfig
) {
  const actions = useCalendarActions();
  const selectors = useCalendarSelectors();

  const onClick: JSX.EventHandler<DateElement, MouseEvent> = (event) => {
    if (selectors.isActive(config.date())) {
      actions.onDateClick(config.date());
    }
    config.onClick?.(event);
  };

  const onFocus: JSX.EventHandler<DateElement, FocusEvent> = () => {
    if (!selectors.isActive(config.date())) {
      actions.selectDate(config.date());
    }
  };

  const keyDownHandlers = useKeyEventHandlers<DateElement>({
    ArrowUp(event) {
      event.preventDefault();
      actions.goTo('previous', 'week');
    },
    ArrowDown(event) {
      event.preventDefault();
      actions.goTo('next', 'week');
    },
    ArrowLeft() {
      actions.goTo('previous', 'day');
    },
    ArrowRight() {
      actions.goTo('next', 'day');
    },
  });

  const onKeyDown: JSX.EventHandler<DateElement, KeyboardEvent> = (event) => {
    keyDownHandlers(event);
    config.onKeyDown?.(event);
  };

  return {
    onClick,
    onFocus,
    onKeyDown,
  } as const;
}

export function createDateEffects(config: CreateDateConfig & { id: string }) {
  const state = useCalendarState();
  const selectors = useCalendarSelectors();

  createEffect(() => {
    if (selectors.isActive(config.date()) && state.isActiveDateFromKeyboardMove) {
      document.getElementById(config.id)?.focus();
    }
  });
}
