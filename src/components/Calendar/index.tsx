import { JSXElement } from 'solid-js';
import { createCancel } from './actions/cancel';
import { createSave } from './actions/save';
import { createRoot } from './calendar';
import { createMonthBody } from './month/body/body';
import { createMonthBodyDay } from './month/body/day';
import { createMonthBodyWeek } from './month/body/week';
import { createMonthHeadDay } from './month/head/day';
import { createMonthHead } from './month/head/head';
import { createMonthHeadWeek } from './month/head/week';
import { createMonth } from './month/month';
import { createNav } from './navigation/navigation';
import { createSelect } from './navigation/select';
import { createToday } from './navigation/today';
import CalendarProvider, { CalendarProviderProps } from './provider';

export * from './calendar';

export type CalendarComponentType = {
  (props: CalendarProviderProps): JSXElement;
  createRoot: typeof createRoot;
  Actions: {
    createCancel: typeof createCancel;
    createSave: typeof createSave;
  };
  Navigation: {
    createNav: typeof createNav;
    createSelect: typeof createSelect;
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
    createNav,
    createSelect,
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
