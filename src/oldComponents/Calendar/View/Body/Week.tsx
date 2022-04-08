import dayjs from 'dayjs';
import { JSXElement, mergeProps, splitProps, untrack } from 'solid-js';
import { Dynamic, For } from 'solid-js/web';
import {
  DateContext,
  DayComponentContext,
  useCalendarState,
  useWeekContext,
} from '~/oldComponents/Calendar/context';
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
  children: (context: DateContext) => JSXElement;
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

          const context: DateContext = {
            date: () => date,
            isInCurrentMonth: () => dayjs(date).month() === state.visibleMonth,
            isSelected: () => date === state.selectedDate,
            isActive: () => date === state.activeDate,
            isInDateRange: () => false, // TODO: implement this
            isToday: () => date === dayjs().format('YYYY-MM-DD'),
          };

          return (
            <DayComponentContext.Provider value={context}>
              {untrack(() => localProps.children(context))}
            </DayComponentContext.Provider>
          );
        }}
      </For>
    </Dynamic>
  );
};

export default Week;
