import dayjs, { Dayjs } from 'dayjs';
import { createContext, useContext } from 'solid-js';

export type CalendarState = {
  selectedDate: string;
  activeDate: string;
  visibleMonth: number;
  visibleYear: number;
  ariaLabel: string;
  isActiveDateFromKeyboardMove: boolean;
};

export type CalendarActions = {
  selectDate(dayjsObject: Dayjs): void;
  viewCalendarMonth(dayjsObject: Dayjs): void;
  goToPreviousWeek(): void;
  goToNextWeek(): void;
  goToPreviousDay(): void;
  goToNextDay(): void;
  viewNextMonth(): void;
  viewNextYear(): void;
  viewPreviousMonth(): void;
  viewPreviousYear(): void;
  selectVisibleMonth(month: number): void;
  selectVisibleYear(year: number): void;
  onCancel(): void;
  onDateConfirm(): void;
  onDateClick(date: string): void;
};

export const CalendarContext = createContext<[state: CalendarState, actions: CalendarActions]>();

export function useCalendarContext() {
  return useContext(CalendarContext);
}

export function useCalendarState() {
  return useCalendarContext()[0];
}

export function useCalendarActions() {
  return useCalendarContext()[1];
}

export const WeekContext = createContext<string[]>();
export function useWeekContext() {
  return useContext(WeekContext);
}

export const DateContext = createContext<string>();
export function useDateContext() {
  return useContext(DateContext);
}

export type ExternalState = {
  date: string;
  isDateActive: boolean;
  isDateInCurrentMonth: boolean;
  isDateSelected: boolean;
  isDateToday: boolean;
  isDateInRange: boolean;
  visibleMonth: string;
};

export const externalState: ExternalState = {
  get date() {
    return useDateContext();
  },
  get isDateActive() {
    return useDateContext() === useCalendarState().activeDate;
  },
  get isDateInCurrentMonth() {
    return dayjs(useDateContext()).month() === useCalendarState().visibleMonth;
  },
  get isDateInRange() {
    return false; // TODO: implement this
  },
  get isDateSelected() {
    return useDateContext() === useCalendarState().selectedDate;
  },
  get isDateToday() {
    return useDateContext() === dayjs().format('YYYY-MM-DD');
  },
  get visibleMonth() {
    const state = useCalendarState();
    return dayjs([state.visibleYear, state.visibleMonth]).format('YYYY-MM-DD');
  },
};
