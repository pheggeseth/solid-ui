import dayjs from 'dayjs';
import Weekday from 'dayjs/plugin/weekday';
import { JSXElement } from 'solid-js';
import { For } from 'solid-js/web';
import { BaseComponent, BaseComponentProps } from '~/types';
import { DateContext } from '../../context';
import Day from './Day';

dayjs.extend(Weekday);

const dataAttribute = {
  'data-solid-calendar-view-header': '' as const,
};

export const Header: BaseComponent<{}, typeof dataAttribute> = (props) => {
  const dates = getHeaderDates();

  return (
    <thead {...dataAttribute}>
      <tr>
        <For each={dates}>
          {(date) => <DateContext.Provider value={date}>{props.children}</DateContext.Provider>}
        </For>
      </tr>
    </thead>
  );
};

type HeaderComponentType = {
  (props: BaseComponentProps): JSXElement;
  Day: typeof Day;
};

const HeaderComponent: HeaderComponentType = Object.assign(Header, {
  Day: Day,
});

export default HeaderComponent;

function getHeaderDates() {
  const dates: string[] = [];
  const now = dayjs().weekday(0).startOf('day');
  for (let i = 0; i < 7; i++) {
    dates.push(now.add(i, 'days').format());
  }

  return dates;
}
