import { createSignal, For, JSX, PropsWithChildren, splitProps } from 'solid-js';
import Calendar from '../components/Calendar';
import { CalendarContextProp, useCalendarContext } from '../components/Calendar/context';

function CalendarRoot(
  props: PropsWithChildren<{ value: Date; onChange: (newDate: Date) => void } & CalendarContextProp>
) {
  return (
    <Calendar {...props}>
      {(() => {
        const { props: rootProps } = Calendar.createRoot();
        props.context?.(useCalendarContext());
        return <div {...rootProps}>{props.children}</div>;
      })()}
    </Calendar>
  );
}

function CalendarNav() {
  const { props: previousYearProps } = Calendar.Navigation.createNav({
    direction: 'previous',
    unit: 'year',
  });
  const { props: previousMonthProps } = Calendar.Navigation.createNav({
    direction: 'previous',
    unit: 'month',
  });

  const {
    props: selectMonthProps,
    context: { value: visibleMonth, options: monthOptions },
  } = Calendar.Navigation.createSelect({ unit: 'month' });
  const [localSelectMonthProps, otherSelectMonthProps] = splitProps(selectMonthProps, ['onChange']);
  const handleMonthChange: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
    localSelectMonthProps.onChange(Number(event.currentTarget.value));
  };

  const {
    props: selectYearProps,
    context: { value: visibleYear, options: yearOptions },
  } = Calendar.Navigation.createSelect({ unit: 'year' });
  const [localSelectYearProps, otherSelectYearProps] = splitProps(selectYearProps, ['onChange']);
  const handleYearChange: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
    localSelectYearProps.onChange(Number(event.currentTarget.value));
  };

  const { props: nextMonthProps } = Calendar.Navigation.createNav({
    direction: 'next',
    unit: 'month',
  });
  const { props: nextYearProps } = Calendar.Navigation.createNav({
    direction: 'next',
    unit: 'year',
  });

  const monthFormatter = new Intl.DateTimeFormat([], { month: 'long' });

  return (
    <div style={{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }}>
      {/* <button {...previousYearProps}>{'<<'}</button> */}
      <button {...previousMonthProps}>{'<'}</button>

      <span>
        <select {...otherSelectMonthProps} value={visibleMonth()} onChange={handleMonthChange}>
          <For each={monthOptions()}>
            {(month) => {
              const date = new Date();
              date.setMonth(month);
              return <option value={month}>{monthFormatter.format(date)}</option>;
            }}
          </For>
        </select>
        <select {...otherSelectYearProps} value={visibleYear()} onChange={handleYearChange}>
          <For each={yearOptions()}>{(year) => <option value={year}>{year}</option>}</For>
        </select>
      </span>
      <button {...nextMonthProps}>{'>'}</button>
      {/* <button {...nextYearProps}>{'>>'}</button> */}
    </div>
  );
}

function CalendarMonth() {
  const { props: monthProps } = Calendar.Month.createMonth();
  const { props: headerProps } = Calendar.Month.Head.createHead();
  const {
    props: headerWeekProps,
    context: { headerDates },
  } = Calendar.Month.Head.createWeek();

  const {
    props: bodyProps,
    context: { visibleWeeks },
  } = Calendar.Month.Body.createBody();

  return (
    <table {...monthProps}>
      <thead {...headerProps}>
        <tr {...headerWeekProps}>
          <For each={headerDates()}>{(date) => <CalendarHeaderDate date={date} />}</For>
        </tr>
      </thead>
      <tbody {...bodyProps}>
        <For each={visibleWeeks()}>{(week) => <CalendarWeek week={week} />}</For>
      </tbody>
    </table>
  );
}

const headerDateFormatter = new Intl.DateTimeFormat([], { weekday: 'narrow' });
function CalendarHeaderDate(props: { date: Date }) {
  const { props: dateProps } = Calendar.Month.Head.createDay({ date: () => props.date });

  return <th {...dateProps}>{headerDateFormatter.format(props.date)}</th>;
}

function CalendarWeek(props: { week: Date[] }) {
  const { props: weekProps } = Calendar.Month.Body.createWeek();
  return (
    <tr {...weekProps}>
      <For each={props.week}>{(date) => <CalendarDay date={date} />}</For>
    </tr>
  );
}

function CalendarDay(props: { date: Date }) {
  const { props: dayProps, effects } = Calendar.Month.Body.createDay({
    date: () => props.date,
  });

  effects();

  return <td {...dayProps}>{props.date.getDate()}</td>;
}

function CalendarActions() {
  const { props: cancelProps } = Calendar.Actions.createCancel();
  const { props: saveProps } = Calendar.Actions.createSave();

  return (
    <div>
      <button {...cancelProps}>Cancel</button>
      <button {...saveProps}>Save</button>
    </div>
  );
}

export function CalendarExample() {
  const [date, setDate] = createSignal(new Date());

  function handleChange(newDate: Date) {
    setDate(newDate);
  }

  return (
    <div>
      <div>Selected date: {date().toDateString()}</div>
      <CalendarRoot value={date()} onChange={handleChange}>
        <CalendarNav />
        <CalendarMonth />
        <CalendarActions />
      </CalendarRoot>
    </div>
  );
}
