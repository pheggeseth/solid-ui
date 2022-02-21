import dayjs from 'dayjs';
import { Accessor, createMemo, For, JSXElement, mergeProps, splitProps, untrack } from 'solid-js';
import { DeepReadonly } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import { BaseComponent, BaseComponentProps } from '~/types';
import { DateContext, DayComponentContext } from '../../context';

const dataAttribute = {
  'data-solid-calendar-view-header-week': '' as const,
};

type WeekContext = DeepReadonly<{ date: Accessor<string> }>;

type WeekProps = Omit<
  BaseComponentProps<{
    as?: string | BaseComponent<{}, typeof dataAttribute>;
  }>,
  'children'
> & { children: (context: WeekContext) => JSXElement };

const Week = (props: WeekProps) => {
  props = mergeProps({ as: 'tr' }, props);

  const dates = getHeaderDates();

  const [localProps, otherProps] = splitProps(props, ['as', 'children']);

  return (
    <Dynamic component={localProps.as} {...otherProps} {...dataAttribute}>
      <For each={dates}>
        {(date) => {
          const context: WeekContext = { date: createMemo(() => date) };

          return (
            <DayComponentContext.Provider value={context as DateContext}>
              {untrack(() => localProps.children(context))}
            </DayComponentContext.Provider>
          );
        }}
      </For>
    </Dynamic>
  );
};

export default Week;

function getHeaderDates() {
  const dates: string[] = [];
  const now = dayjs().weekday(0).startOf('day');
  for (let i = 0; i < 7; i++) {
    dates.push(now.add(i, 'days').format());
  }

  return dates;
}
