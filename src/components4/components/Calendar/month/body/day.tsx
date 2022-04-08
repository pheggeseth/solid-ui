import { Accessor, createEffect, JSX, mergeProps } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useKeyEventHandlers } from '~/utils/eventUtils';
import {
  useCalendarActions,
  useCalendarContext,
  useCalendarSelectors,
  useCalendarState,
} from '../../context';

export type CreateDayConfig<DayElement extends HTMLElement = HTMLElement> = {
  idPrefix?: string;
  date: Accessor<Date>;
  onClick?: JSX.EventHandler<DayElement, MouseEvent>;
  onKeyDown?: JSX.EventHandler<DayElement, KeyboardEvent>;
  onMouseDown?: JSX.EventHandler<DayElement, MouseEvent>;
};

export function createMonthBodyDay<DayElement extends HTMLElement = HTMLElement>(
  config: CreateDayConfig
) {
  const props = createMonthBodyDayProps<DayElement>(config);
  const handlers = createMonthBodyDayHandlers<DayElement>(config);

  return {
    props: mergeProps(props, handlers),
    effects: () => createMonthBodyDayEffects({ ...config, id: props.id }),
    context: useCalendarContext(),
  } as const;
}

export function createMonthBodyDayProps<DayElement extends HTMLElement = HTMLElement>(
  config: CreateDayConfig<DayElement>
) {
  const { idPrefix = 'solid-ui-calendar-month-body-day' } = config;
  const id = useId(idPrefix);
  const selectors = useCalendarSelectors();

  return {
    ...getDataProp(idPrefix),
    get ['data-active']() {
      return selectors.isActive(config.date()) ? '' : undefined;
    },
    get ['data-date-range']() {
      return selectors.isInDateRange(config.date()) ? '' : undefined;
    },
    get ['data-selected']() {
      return selectors.isSelected(config.date()) ? '' : undefined;
    },
    get ['data-today']() {
      return selectors.isToday(config.date()) ? '' : undefined;
    },
    get ['data-visible-month']() {
      return selectors.isInVisibleMonth(config.date()) ? '' : undefined;
    },
    id,
    get tabIndex() {
      return selectors.isActive(config.date()) ? 0 : -1;
    },
  } as const;
}

export function createMonthBodyDayHandlers<DayElement extends HTMLElement = HTMLElement>(
  config: CreateDayConfig
) {
  const actions = useCalendarActions();
  const selectors = useCalendarSelectors();

  const onMouseDown: JSX.EventHandler<DayElement, MouseEvent> = (event) => {
    if (!selectors.isInVisibleMonth(config.date())) {
      actions.onDeferredDateClick(config.date());
    }
    config.onMouseDown?.(event);
  };

  const onClick: JSX.EventHandler<DayElement, MouseEvent> = (event) => {
    if (selectors.isActive(config.date())) {
      actions.onDateClick(config.date());
    }
    config.onClick?.(event);
  };

  const onFocus: JSX.EventHandler<DayElement, FocusEvent> = () => {
    if (!selectors.isActive(config.date())) {
      actions.selectDate(config.date());
    }
  };

  const keyDownHandlers = useKeyEventHandlers<DayElement>({
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
    Enter() {
      actions.onDateClick(config.date());
    },
    [' '](event) {
      event.preventDefault();
      actions.onDateClick(config.date());
    },
  });

  const onKeyDown: JSX.EventHandler<DayElement, KeyboardEvent> = (event) => {
    keyDownHandlers(event);
    config.onKeyDown?.(event);
  };

  return {
    onClick,
    onFocus,
    onKeyDown,
    onMouseDown,
  } as const;
}

export function createMonthBodyDayEffects(config: CreateDayConfig & { id: string }) {
  const state = useCalendarState();
  const actions = useCalendarActions();
  const selectors = useCalendarSelectors();

  createEffect(() => {
    if (selectors.isActive(config.date()) && state.isActiveDateFromUserInteraction) {
      document.getElementById(config.id)?.focus();

      if (state.deferredDateClick?.getTime() === config.date().getTime()) {
        actions.onDateClick(state.deferredDateClick);
      }
    }
  });
}
