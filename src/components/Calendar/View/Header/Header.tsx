import dayjs from 'dayjs';
import Weekday from 'dayjs/plugin/weekday';
import { JSXElement, untrack } from 'solid-js';
import { For } from 'solid-js/web';
import { BaseComponentProps } from '~/types';
import { DateContext } from '../../context';
import Day from './Day';

dayjs.extend(Weekday);

const dataAttribute = {
  'data-solid-calendar-view-header': '' as const,
};

type HeaderProps = Omit<BaseComponentProps, 'children'> & {
  children: (date: string) => JSXElement;
};

export const Header = (props: HeaderProps) => {
  const dates = getHeaderDates();

  return (
    <thead {...props} {...dataAttribute}>
      <tr>
        <For each={dates}>
          {(date) => (
            <DateContext.Provider value={date}>
              {untrack(() => props.children(date))}
            </DateContext.Provider>
          )}
        </For>
      </tr>
    </thead>
  );
};

type HeaderComponentType = {
  (props: HeaderProps): JSXElement;
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
