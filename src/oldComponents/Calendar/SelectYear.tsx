import { createMemo, JSX, mergeProps, splitProps } from 'solid-js';
import { Dynamic, For } from 'solid-js/web';
import { BaseComponent } from '~/types';
import { useCalendarActions, useCalendarState } from './context';

const dataAttribute = {
  'data-solid-calendar-select-year': '' as const,
};

type SelectYearProps = {
  as?:
    | string
    | BaseComponent<
        { value: number; onChange: JSX.EventHandler<HTMLSelectElement, Event> },
        typeof dataAttribute
      >;
};

export const SelectYear: BaseComponent<SelectYearProps> = (props) => {
  props = mergeProps({ as: 'select' });

  const state = useCalendarState();
  const actions = useCalendarActions();

  const years = createMemo(() => getYears(state.visibleYear));

  const [localProps, otherProps] = splitProps(props, ['as']);

  const handleChange: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
    event.stopPropagation();
    actions.selectVisibleYear(Number(event.currentTarget.value));
  };

  return (
    <Dynamic
      component={localProps.as}
      {...dataAttribute}
      value={state.visibleYear}
      onChange={handleChange}
    >
      {otherProps.children || (
        <For each={years()}>{(year) => <option value={year}>{year}</option>}</For>
      )}
    </Dynamic>
  );
};

export default SelectYear;

function getYears(year: number) {
  const years: number[] = [];
  for (let i = year - 100; i <= year + 100; i++) {
    years.push(i);
  }

  return years;
}
