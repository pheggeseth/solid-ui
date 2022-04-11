import { Component, createSignal, For, JSX, splitProps } from 'solid-js';
import Calendar from '../../components/Calendar';
import { CalendarContextProp, useCalendarContext } from '../../components/Calendar/context';
import { CodeBlock } from '../utils';

const CalendarRoot: Component<
  { value: Date; onChange: (newDate: Date) => void } & CalendarContextProp
> = (props) => {
  return (
    <Calendar {...props}>
      {(() => {
        const { props: rootProps } = Calendar.createRoot();
        props.context?.(useCalendarContext());
        return (
          <div
            {...rootProps}
            style={{
              display: 'inline-flex',
              'flex-direction': 'column',
              border: 'var(--border)',
              'border-radius': 'var(--border-radius)',
              padding: '1rem',
              'margin-top': '1rem',
            }}
          >
            {props.children}
          </div>
        );
      })()}
    </Calendar>
  );
};

const CalendarNav: Component = () => {
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
      <button {...previousYearProps}>{'<<'}</button>
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
      <button {...nextYearProps}>{'>>'}</button>
    </div>
  );
};

const CalendarMonth: Component = () => {
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
};

const headerDateFormatter = new Intl.DateTimeFormat([], { weekday: 'narrow' });
const CalendarHeaderDate: Component<{ date: Date }> = (props) => {
  const { props: dateProps } = Calendar.Month.Head.createDay({ date: () => props.date });

  return <th {...dateProps}>{headerDateFormatter.format(props.date)}</th>;
};

const CalendarWeek: Component<{ week: Date[] }> = (props) => {
  const { props: weekProps } = Calendar.Month.Body.createWeek();
  return (
    <tr {...weekProps}>
      <For each={props.week}>{(date) => <CalendarDay date={date} />}</For>
    </tr>
  );
};

const CalendarDay: Component<{ date: Date }> = (props) => {
  const { props: dayProps, effects } = Calendar.Month.Body.createDay({
    date: () => props.date,
  });

  effects();

  return <td {...dayProps}>{props.date.getDate()}</td>;
};

const CalendarActions: Component = () => {
  const { props: todayProps } = Calendar.Navigation.createToday();
  const { props: cancelProps } = Calendar.Actions.createCancel();
  const { props: saveProps } = Calendar.Actions.createSave();

  return (
    <div style={{ display: 'flex', 'justify-content': 'space-between', 'margin-top': '0.5rem' }}>
      <button {...todayProps}>Today</button>
      <span style={{ display: 'flex', gap: '0.25rem' }}>
        <button {...cancelProps}>Cancel</button>
        <button {...saveProps}>Save</button>
      </span>
    </div>
  );
};

export const MyCalendar: Component = () => {
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
};

export function CalendarDemo() {
  return (
    <section>
      <h1 id="Calendar">Calendar</h1>
      <p>
        That's right, Solid UI comes with hooks for creating a completely composable calendar date
        picker! It comes with hooks for creating a table-based calendar widget, including navigation
        and action components.
      </p>
      <h3>Example</h3>
      <MyCalendar />
      <h3>Code</h3>
      <CodeBlock>{exampleCode}</CodeBlock>
    </section>
  );
}

CalendarDemo.Link = () => <a href="#Calendar">Calendar</a>;

const exampleCode = `import { Component, createSignal, For, JSX, splitProps } from 'solid-js';
import Calendar, { CalendarContextProp, useCalendarContext } from '@solid-ui/calendar';

const CalendarRoot: Component<
  { value: Date; onChange: (newDate: Date) => void } & CalendarContextProp
> = (props) => {
  return (
    <Calendar {...props}>
      {(() => {
        const { props: rootProps } = Calendar.createRoot();
        props.context?.(useCalendarContext());
        return (
          <div
            {...rootProps}
            style={{
              display: 'inline-flex',
              'flex-direction': 'column',
              border: 'var(--border)',
              'border-radius': 'var(--border-radius)',
              padding: '1rem',
              'margin-top': '1rem',
            }}
          >
            {props.children}
          </div>;
      })()}
    </Calendar>
  );
};

const CalendarNav: Component = () => {
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
      <button {...previousYearProps}>{'<<'}</button>
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
      <button {...nextYearProps}>{'>>'}</button>
    </div>
  );
};

const CalendarMonth: Component = () => {
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
};

const headerDateFormatter = new Intl.DateTimeFormat([], { weekday: 'narrow' });
const CalendarHeaderDate: Component<{ date: Date }> = (props) => {
  const { props: dateProps } = Calendar.Month.Head.createDay({ date: () => props.date });

  return <th {...dateProps}>{headerDateFormatter.format(props.date)}</th>;
};

const CalendarWeek: Component<{ week: Date[] }> = (props) => {
  const { props: weekProps } = Calendar.Month.Body.createWeek();
  return (
    <tr {...weekProps}>
      <For each={props.week}>{(date) => <CalendarDay date={date} />}</For>
    </tr>
  );
};

const CalendarDay: Component<{ date: Date }> = (props) => {
  const { props: dayProps, effects } = Calendar.Month.Body.createDay({
    date: () => props.date,
  });

  effects();

  return <td {...dayProps}>{props.date.getDate()}</td>;
};

const CalendarActions: Component = () => {
  const { props: todayProps } = Calendar.Navigation.createToday();
  const { props: cancelProps } = Calendar.Actions.createCancel();
  const { props: saveProps } = Calendar.Actions.createSave();

  return (
    <div style={{ display: 'flex', 'justify-content': 'space-between', 'margin-top': '0.5rem' }}>
      <button {...todayProps}>Today</button>
      <span style={{ display: 'flex', gap: '0.25rem' }}>
        <button {...cancelProps}>Cancel</button>
        <button {...saveProps}>Save</button>
      </span>
    </div>
  );
};

export const MyCalendar: Component = () => {
  const [date, setDate] = createSignal(new Date());

  function handleChange(newDate: Date) {
    setDate(newDate);
  }

  return (
    <div style={{ border: '2px solid #888' }}>
      <div>Selected date: {date().toDateString()}</div>
      <CalendarRoot value={date()} onChange={handleChange}>
        <CalendarNav />
        <CalendarMonth />
        <CalendarActions />
      </CalendarRoot>
    </div>
  );
};`;
