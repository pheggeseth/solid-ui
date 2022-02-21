import dayjs from 'dayjs';
import { createMemo, JSXElement, mergeProps, splitProps, untrack } from 'solid-js';
import { Dynamic, For } from 'solid-js/web';
import {
  DateContext,
  DateContextMemo,
  useCalendarState,
  useWeekContext,
} from '~/components/Calendar/context';
import { BaseComponent, BaseComponentProps } from '~/types';

const dataAttribute = {
  'data-solid-calendar-view-body-week': '' as const,
};

type WeekProps = Omit<
  BaseComponentProps<{
    as?: string | BaseComponent<{}, typeof dataAttribute>;
  }>,
  'children'
> & {
  children: (context: DateContextMemo) => JSXElement;
};

const Week = (props: WeekProps) => {
  props = mergeProps({ as: 'tr' }, props);

  const week = useWeekContext();

  const [localProps, otherProps] = splitProps(props, ['as', 'children']);

  return (
    <Dynamic {...otherProps} component={localProps.as} {...dataAttribute}>
      <For each={week}>
        {(date) => {
          const state = useCalendarState();

          const context = createMemo(() => ({
            date,
            isInCurrentMonth: dayjs(date).month() === state.visibleMonth,
            isSelected: date === state.selectedDate,
            isActive: date === state.activeDate,
            isInDateRange: false, // TODO: implement this
            isToday: date === dayjs().format('YYYY-MM-DD'),
          }));

          return (
            <DateContext.Provider value={context}>
              {untrack(() => localProps.children(context))}
            </DateContext.Provider>
          );
        }}
      </For>
    </Dynamic>
  );
};

export default Week;
