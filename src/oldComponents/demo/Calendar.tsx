import dayjs from 'dayjs';
import { createSignal } from 'solid-js';
import Calendar from '~/oldComponents/Calendar';
import Popover, { PopoverContext } from '~/oldComponents/Popover';

export default function CalendarDemo() {
  const [date, setDate] = createSignal(dayjs().format('YYYY-MM-DD'));

  const isDisabled = (date: string) => dayjs(date).date() % 2 === 1;

  let popover: PopoverContext;

  return (
    <section>
      <h2>Calendar</h2>
      <Popover context={(ctx) => (popover = ctx)}>
        <Popover.Trigger>{date()}</Popover.Trigger>
        <Popover.Panel class="popover">
          <Calendar
            class={'calendar-root'}
            value={date()}
            onChange={(date) => {
              setDate(date);
              popover.close();
            }}
            onCancel={() => {
              popover.close();
            }}
          >
            <div style={{ display: 'flex' }}>
              <Calendar.PreviousYear>{'<<'}</Calendar.PreviousYear>
              <Calendar.PreviousMonth>{'<'}</Calendar.PreviousMonth>
              <span style={{ flex: '1 0 auto', 'text-align': 'center' }}>
                {/* TODO: create label element for dialog and add id to state, use as 'aria-labelledby' for container */}
                {/* {dayjs(Calendar.state.visibleMonth).format('MMMM YYYY')} */}
                <Calendar.SelectMonth />
                <Calendar.SelectYear />
              </span>
              <Calendar.NextMonth>{'>'}</Calendar.NextMonth>
              <Calendar.NextYear>{'>>'}</Calendar.NextYear>
            </div>
            <Calendar.View>
              <Calendar.View.Header>
                <Calendar.View.Header.Week>
                  {(context) => (
                    <Calendar.View.Header.Day>
                      {dayjs(context.date()).format('dd')}
                    </Calendar.View.Header.Day>
                  )}
                </Calendar.View.Header.Week>
              </Calendar.View.Header>
              <Calendar.View.Body>
                <Calendar.View.Body.Week>
                  {({ date, isInCurrentMonth, isSelected, isActive }) => (
                    <Calendar.View.Body.Day
                      classList={{
                        'calendar-outside-month': !isInCurrentMonth(),
                        'calendar-is-selected': isSelected(),
                        'calendar-is-active': isActive(),
                      }}
                      // disabled={isDisabled()}
                      tabIndex={isActive() ? 0 : -1}
                    >
                      {dayjs(date()).format('DD')}
                    </Calendar.View.Body.Day>
                  )}
                </Calendar.View.Body.Week>
              </Calendar.View.Body>
            </Calendar.View>
            <div>
              <Calendar.Cancel>Cancel</Calendar.Cancel>
              <Calendar.Save>Save</Calendar.Save>
              <Calendar.Today>Today</Calendar.Today>
            </div>
          </Calendar>
        </Popover.Panel>
      </Popover>
    </section>
  );
}
