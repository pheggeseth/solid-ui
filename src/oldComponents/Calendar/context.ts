import { Dayjs } from 'dayjs';
import { Accessor, createContext, useContext } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';

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

export type DateContext = DeepReadonly<{
  date: Accessor<string>;
  isInCurrentMonth: Accessor<boolean>;
  isSelected: Accessor<boolean>;
  isActive: Accessor<boolean>;
  isInDateRange: Accessor<boolean>;
  isToday: Accessor<boolean>;
}>;

export const DayComponentContext = createContext<DateContext>();
export function useDayComponentContext() {
  return useContext(DayComponentContext);
}
