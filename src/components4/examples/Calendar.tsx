import { createSignal, For, JSX, splitProps } from 'solid-js';
import Calendar from '../components/Calendar';

function CalendarNav() {
  const { props: previousYearProps } = Calendar.Navigation.createPreviousYear();
  const { props: previousMonthProps } = Calendar.Navigation.createPreviousMonth();

  const {
    props: selectMonthProps,
    context: { monthOptions },
  } = Calendar.Navigation.createSelectMonth();
  const [localSelectMonthProps, otherSelectMonthProps] = splitProps(selectMonthProps, ['onChange']);
  const handleMonthChange: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
    localSelectMonthProps.onChange(Number(event.currentTarget.value));
  };

  const { props: selectYearProps } = Calendar.Navigation.createSelectYear();
  const [localSelectYearProps, otherSelectYearProps] = splitProps(selectYearProps, ['onChange']);
  const handleYearChange: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
    localSelectYearProps.onChange(Number(event.currentTarget.value));
  };

  const { props: nextMonthProps } = Calendar.Navigation.createNextMonth();
  const { props: nextYearProps } = Calendar.Navigation.createNextYear();

  return (
    <div>
      <button {...previousYearProps}>{'<<'}</button>
      <button {...previousMonthProps}>{'<'}</button>
      <select {...otherSelectMonthProps} onChange={handleMonthChange}>
        <For each={monthOptions()}>
          {(month) => <option value={month.value}>{month.displayValue}</option>}
        </For>
      </select>
      <select {...otherSelectYearProps} onChange={handleYearChange}>
        <For each={[1, 2, 3]}>{(year) => <option value={year}>{year}</option>}</For>
      </select>
      <button {...nextMonthProps}>{'>'}</button>
      <button {...nextYearProps}>{'>>'}</button>
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
    console.log(newDate);
    setDate(newDate);
  }

  return (
    <Calendar value={date()} onChange={handleChange}>
      <CalendarNav />
      <CalendarMonth />
      <CalendarActions />
    </Calendar>
  );
}
