import dayjs from 'dayjs';
import ArraySupport from 'dayjs/plugin/arraySupport';
import Weekday from 'dayjs/plugin/weekday';
import { JSXElement, mergeProps, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import { BaseComponent, BaseComponentProps } from '~/types';
import { Cancel, Save } from './CancelSave';
import {
  CalendarActions,
  CalendarContext,
  CalendarState,
  ExternalState,
  externalState
} from './context';
import NextMonth from './NextMonth';
import NextYear from './NextYear';
import PreviousMonth from './PreviousMonth';
import PreviousYear from './PreviousYear';
import SelectMonth from './SelectMonth';
import SelectYear from './SelectYear';
import Today from './Today';
import View from './View';

dayjs.extend(ArraySupport);
dayjs.extend(Weekday);

const dataAttribute = {
  'data-solid-calendar-container': '' as const,
};

type ContainerProps = {
  as?: string | BaseComponent<{}, typeof dataAttribute>;
  'aria-modal'?: boolean | 'false' | 'true';
  role?: string;
  value?: string;
  onChange?: (selectedDate: string) => void;
  onCancel?: () => void;
};

export const Container: BaseComponent<ContainerProps> = (props) => {
  props = mergeProps(
    {
      as: 'div',
      'aria-modal': true,
      role: 'dialog',
      value: dayjs().format(),
    },
    props
  );

  const selectedDate = dayjs(props.value).format('YYYY-MM-DD');

  const [state, setState] = createStore<CalendarState>({
    selectedDate,
    activeDate: selectedDate,
    visibleMonth: dayjs(props.value).month() ?? null,
    visibleYear: dayjs(props.value).year() ?? null,
    ariaLabel: dayjs(props.value).format('MMMM YYYY'),
    isActiveDateFromKeyboardMove: false,
  });

  const actions: CalendarActions = {
    selectDate(dayjsObject) {
      setState({
        activeDate: dayjsObject.format('YYYY-MM-DD'),
        visibleMonth: dayjsObject.month(),
        visibleYear: dayjsObject.year(),
        ariaLabel: dayjsObject.format('MMMM YYYY'),
        isActiveDateFromKeyboardMove: true,
      });
    },
    viewCalendarMonth(dayjsObject) {
      setState((state) => ({
        activeDate: dayjs(state.activeDate)
          .month(dayjsObject.month())
          .year(dayjsObject.year())
          .format('YYYY-MM-DD'),
        visibleMonth: dayjsObject.month(),
        visibleYear: dayjsObject.year(),
        ariaLabel: dayjsObject.format('MMMM YYYY'),
        isActiveDateFromKeyboardMove: false,
      }));
    },
    goToNextDay() {
      actions.selectDate(dayjs(state.activeDate).add(1, 'day'));
    },
    goToNextWeek() {
      actions.selectDate(dayjs(state.activeDate).add(1, 'week'));
    },
    goToPreviousDay() {
      actions.selectDate(dayjs(state.activeDate).subtract(1, 'day'));
    },
    goToPreviousWeek() {
      actions.selectDate(dayjs(state.activeDate).subtract(1, 'week'));
    },
    viewNextMonth() {
      actions.viewCalendarMonth(dayjs([state.visibleYear, state.visibleMonth]).add(1, 'month'));
    },
    viewNextYear() {
      actions.viewCalendarMonth(dayjs([state.visibleYear, state.visibleMonth]).add(1, 'year'));
    },
    viewPreviousMonth() {
      actions.viewCalendarMonth(
        dayjs([state.visibleYear, state.visibleMonth]).subtract(1, 'month')
      );
    },
    viewPreviousYear() {
      actions.viewCalendarMonth(dayjs([state.visibleYear, state.visibleMonth]).subtract(1, 'year'));
    },
    selectVisibleMonth(month) {
      actions.viewCalendarMonth(dayjs(state.activeDate).month(month));
    },
    selectVisibleYear(year) {
      actions.viewCalendarMonth(dayjs(state.activeDate).year(year));
    },
    onCancel() {
      props.onCancel();
    },
    onDateConfirm() {
      props.onChange(state.activeDate);
    },
    onDateClick(date) {
      actions.selectDate(dayjs(date));
      actions.onDateConfirm();
    },
  };

  const [localProps, otherProps] = splitProps(props, ['as', 'aria-modal']);

  return (
    <CalendarContext.Provider value={[state, actions]}>
      <Dynamic
        {...otherProps}
        component={localProps.as}
        aria-label={state.ariaLabel}
        aria-modal={localProps['aria-modal']}
        {...dataAttribute}
      />
    </CalendarContext.Provider>
  );
};

type CalendarComponentType = {
  (props: BaseComponentProps<ContainerProps>): JSXElement;
  PreviousYear: typeof PreviousYear;
  PreviousMonth: typeof PreviousMonth;
  NextMonth: typeof NextMonth;
  NextYear: typeof NextYear;
  SelectMonth: typeof SelectMonth;
  SelectYear: typeof SelectYear;
  Today: typeof Today;
  View: typeof View;
  Cancel: typeof Cancel;
  Save: typeof Save;
  state: ExternalState;
};

const CalendarComponent: CalendarComponentType = Object.assign(Container, {
  PreviousYear,
  PreviousMonth,
  NextMonth,
  NextYear,
  SelectMonth,
  SelectYear,
  Today,
  View,
  Cancel,
  Save,
  state: externalState,
});

export default CalendarComponent;
