import { Accessor, createContext, createMemo, createSelector, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getDaysInVisibleMonth } from './utils';

export type CalendarState = {
  selectedDate: Date;
  activeDate: Date;
  visibleMonth: number;
  visibleYear: number;
  ariaLabel: string;
  isActiveDateFromUserInteraction: boolean;
  deferredDateClick: Date;
};

export type CalendarActions = Readonly<{
  selectDate(date: Date): void;
  viewCalendarMonth(year: number, month: number): void;
  goTo(direction: 'previous' | 'next', unit: 'year' | 'month' | 'week' | 'day'): void;
  view(direction: 'previous' | 'next', unit: 'year' | 'month'): void;
  selectVisibleMonth(month: number): void;
  selectVisibleYear(year: number): void;
  onCancel(): void;
  onDateConfirm(): void;
  onDateClick(date: Date): void;
  onDeferredDateClick(date: Date): void;
}>;

export type CalendarSelectors = Readonly<{
  isActive: (date: Date) => boolean;
  isInDateRange: (date: Date) => boolean;
  isInVisibleMonth: (date: Date) => boolean;
  isSelected: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  visibleYear: Accessor<number>;
  visibleMonth: Accessor<number>;
  visibleWeeks: Accessor<Date[][]>;
}>;

export type CalendarStore = Readonly<
  [state: CalendarState, actions: CalendarActions, selectors: CalendarSelectors]
>;

export type CreateCalendarStoreConfig = {
  value?: Accessor<string | number | Date>;
  onCancel?: () => void;
  onChange?: (newDate: Date) => void;
};

export function createCalendarStore(config: CreateCalendarStoreConfig): CalendarStore {
  const selectedDate = new Date(config.value?.());
  const [state, setState] = createStore<CalendarState>({
    selectedDate,
    activeDate: selectedDate,
    visibleMonth: selectedDate.getMonth(),
    visibleYear: selectedDate.getFullYear(),
    ariaLabel: null,
    isActiveDateFromUserInteraction: false,
    deferredDateClick: null,
  });

  const ariaLabelFormatter = new Intl.DateTimeFormat([], { month: 'long', year: 'numeric' });

  const actions: CalendarActions = {
    selectDate(date) {
      setState({
        activeDate: date,
        visibleMonth: date.getMonth(),
        visibleYear: date.getFullYear(),
        ariaLabel: ariaLabelFormatter.format(date),
        isActiveDateFromUserInteraction: true,
      });
    },
    viewCalendarMonth(year, month) {
      const newDate = new Date(year, month);

      setState({
        activeDate: newDate,
        visibleMonth: month,
        visibleYear: year,
        ariaLabel: ariaLabelFormatter.format(newDate),
        isActiveDateFromUserInteraction: false,
      });
    },
    goTo(direction, unit) {
      const addition = direction === 'next' ? 1 : -1;
      const newDate = new Date(state.activeDate);

      if (unit === 'day') {
        newDate.setDate(state.activeDate.getDate() + addition);
      } else if (unit === 'month') {
        newDate.setMonth(state.activeDate.getMonth() + addition);
      } else if (unit === 'week') {
        newDate.setDate(state.activeDate.getDate() + addition * 7);
      } else if (unit === 'year') {
        newDate.setFullYear(state.activeDate.getFullYear() + addition);
      }

      actions.selectDate(newDate);
    },
    view(direction, unit) {
      const addition = direction === 'next' ? 1 : -1;

      actions.viewCalendarMonth(
        state.activeDate.getFullYear() + (unit === 'year' ? addition : 0),
        state.activeDate.getMonth() + (unit === 'month' ? addition : 0)
      );
    },
    selectVisibleMonth(month) {
      actions.viewCalendarMonth(state.activeDate.getFullYear(), month);
    },
    selectVisibleYear(year) {
      actions.viewCalendarMonth(year, state.activeDate.getMonth());
    },
    onCancel() {
      config.onCancel?.();
    },
    onDateConfirm() {
      config.onChange(state.activeDate);
    },
    onDateClick(date) {
      actions.selectDate(date);
      setState({ deferredDateClick: null });
      actions.onDateConfirm();
    },
    onDeferredDateClick(date) {
      setState({ deferredDateClick: date });
    },
  };

  const selectors: CalendarSelectors = {
    isActive: createSelector<Date, Date>(
      () => state.activeDate,
      (date, activeDate) => date.toDateString() === activeDate.toDateString()
    ),
    isInDateRange: () => false, // TODO: implement later
    isInVisibleMonth: createSelector<number, Date>(
      () => state.visibleMonth,
      (date, visibleMonth) => date.getMonth() === visibleMonth
    ),
    isSelected: createSelector<Date, Date>(
      () => state.selectedDate,
      (date, selectedDate) => date.toDateString() === selectedDate.toDateString()
    ),
    isToday: (date) => date.toDateString() === new Date().toDateString(),
    visibleYear: () => state.visibleYear,
    visibleMonth: () => state.visibleMonth,
    visibleWeeks: createMemo(() => getDaysInVisibleMonth(state.visibleYear, state.visibleMonth)),
  };

  return [state, actions, selectors] as const;
}

export const CalendarStoreContext = createContext<CalendarStore>();
export function useCalendarStore() {
  return useContext(CalendarStoreContext);
}
export function useCalendarState() {
  return useContext(CalendarStoreContext)[0];
}
export function useCalendarActions() {
  return useContext(CalendarStoreContext)[1];
}
export function useCalendarSelectors() {
  return useContext(CalendarStoreContext)[2];
}

export type CalendarContext = CalendarSelectors;

export function useCalendarContext(): CalendarContext {
  const selectors = useCalendarSelectors();

  return {
    ...selectors,
  } as const;
}

export type CalendarContextProp = {
  context?: (ctx: CalendarContext) => void;
};
