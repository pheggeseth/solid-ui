import dayjs from 'dayjs';
import { JSX, mergeProps, splitProps } from 'solid-js';
import { Dynamic, For } from 'solid-js/web';
import { BaseComponent } from '~/types';
import { useCalendarActions, useCalendarState } from './context';

const dataAttribute = {
  'data-solid-calendar-select-month': '' as const,
};

type SelectMonthProps = {
  as?:
    | string
    | BaseComponent<
        { value: number; onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> },
        typeof dataAttribute
      >;
};

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) =>
  dayjs().month(month).format('MMMM')
);

export const SelectMonth: BaseComponent<SelectMonthProps> = (props) => {
  props = mergeProps({ as: 'select' });

  const state = useCalendarState();
  const actions = useCalendarActions();

  const [localProps, otherProps] = splitProps(props, ['as']);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      {...dataAttribute}
      value={state.visibleMonth}
      onChange={(event) => {
        actions.selectVisibleMonth(Number(event.target.value));
      }}
    >
      {otherProps.children || (
        <For each={months}>{(month, index) => <option value={index()}>{month}</option>}</For>
      )}
    </Dynamic>
  );
};

export default SelectMonth;
