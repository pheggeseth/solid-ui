import { JSXElement } from 'solid-js';
import { createCancel } from './actions/cancel';
import { createSave } from './actions/save';
import { createRoot } from './calendar';
import { createNextMonth } from './navigation/nextMonth';
import { createNextYear } from './navigation/nextYear';
import { createPreviousMonth } from './navigation/previousMonth';
import { createPreviousYear } from './navigation/previousYear';
import { createSelectMonth } from './navigation/selectMonth';
import { createSelectYear } from './navigation/selectYear';
import { createToday } from './navigation/today';
import CalendarProvider, { CalendarProviderProps } from './provider';
import { createMonthHead } from './month/head/head';
import { createMonth } from './month/month';
import { createMonthHeadWeek } from './month/head/week';
import { createMonthHeadDay } from './month/head/day';
import { createMonthBody } from './month/body/body';
import { createMonthBodyWeek } from './month/body/week';
import { createMonthBodyDay } from './month/body/day';

export * from './calendar';

export type CalendarComponentType = {
  (props: CalendarProviderProps): JSXElement;
  createRoot: typeof createRoot;
  Actions: {
    createCancel: typeof createCancel;
    createSave: typeof createSave;
  };
  Navigation: {
    createNextMonth: typeof createNextMonth;
    createNextYear: typeof createNextYear;
    createPreviousMonth: typeof createPreviousMonth;
    createPreviousYear: typeof createPreviousYear;
    createSelectMonth: typeof createSelectMonth;
    createSelectYear: typeof createSelectYear;
    createToday: typeof createToday;
  };
  Month: {
    createMonth: typeof createMonth;
    Head: {
      createHead: typeof createMonthHead;
      createWeek: typeof createMonthHeadWeek;
      createDay: typeof createMonthHeadDay;
    };
    Body: {
      createBody: typeof createMonthBody;
      createWeek: typeof createMonthBodyWeek;
      createDay: typeof createMonthBodyDay;
    };
  };
};

const CalendarComponent: CalendarComponentType = Object.assign(CalendarProvider, {
  createRoot,
  Actions: {
    createCancel,
    createSave,
  },
  Navigation: {
    createNextMonth,
    createNextYear,
    createPreviousMonth,
    createPreviousYear,
    createSelectMonth,
    createSelectYear,
    createToday,
  },
  Month: {
    createMonth,
    Head: {
      createHead: createMonthHead,
      createWeek: createMonthHeadWeek,
      createDay: createMonthHeadDay,
    },
    Body: {
      createBody: createMonthBody,
      createWeek: createMonthBodyWeek,
      createDay: createMonthBodyDay,
    },
  },
});

export default CalendarComponent;
