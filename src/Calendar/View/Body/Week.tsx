import { mergeProps, splitProps } from 'solid-js';
import { Dynamic, For } from 'solid-js/web';
import { DateContext, useWeekContext } from '~/Calendar/context';
import { BaseComponent } from '~/types';

const dataAttribute = {
  'data-solid-calendar-view-body-week': '' as const,
};

type WeekProps = {
  as?: string | BaseComponent<{}, typeof dataAttribute>;
};

const Week: BaseComponent<WeekProps> = (props) => {
  props = mergeProps({ as: 'tr' }, props);

  const week = useWeekContext();

  const [localProps, otherProps] = splitProps(props, ['as']);

  return (
    <Dynamic {...otherProps} component={localProps.as} {...dataAttribute}>
      <For each={week}>
        {(date) => <DateContext.Provider value={date}>{otherProps.children}</DateContext.Provider>}
      </For>
    </Dynamic>
  );
};

export default Week;
