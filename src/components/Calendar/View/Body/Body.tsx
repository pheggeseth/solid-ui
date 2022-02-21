import { createMemo, JSXElement, mergeProps, splitProps } from 'solid-js';
import { Dynamic, For } from 'solid-js/web';
import { BaseComponent, BaseComponentProps } from '~/types';
import { useCalendarState, WeekContext } from '../../context';
import { getDaysInVisibleMonth } from '../../utils';
import Day from './Day';
import Week from './Week';

const dataAttribute = {
  'data-solid-calendar-view-body': '' as const,
};

type BodyProps = {
  as?: string | BaseComponent<{}, typeof dataAttribute>;
};

export const Body: BaseComponent<BodyProps> = (props) => {
  props = mergeProps({ as: 'tbody' }, props);

  const state = useCalendarState();
  const weeks = createMemo(() => getDaysInVisibleMonth(state.visibleMonth, state.visibleYear));

  const [localProps, otherProps] = splitProps(props, ['as', 'children']);

  return (
    <Dynamic {...otherProps} component={localProps.as} {...dataAttribute}>
      <For each={weeks()}>
        {(week) => <WeekContext.Provider value={week}>{localProps.children}</WeekContext.Provider>}
      </For>
    </Dynamic>
  );
};

type BodyComponent = {
  (props: BaseComponentProps<BodyProps>): JSXElement;
  Week: typeof Week;
  Day: typeof Day;
};

export default Object.assign(Body, {
  Week: Week,
  Day: Day,
}) as BodyComponent;
