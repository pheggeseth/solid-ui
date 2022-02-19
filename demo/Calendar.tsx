import dayjs from 'dayjs';
import { createSignal } from 'solid-js';
import Calendar from '~/Calendar';
import Popover from '~/Popover';

export default function CalendarDemo() {
  const [date, setDate] = createSignal(dayjs().format('YYYY-MM-DD'));

  const isDisabled = () => dayjs(Calendar.state.date).date() % 2 === 1;

  let triggerRef: HTMLButtonElement;

  return (
    <Popover>
      <Popover.Trigger ref={triggerRef}>{date()}</Popover.Trigger>
      <Popover.Panel class="popover">
        <Calendar
          class={'calendar-root'}
          value={date()}
          onChange={(date) => {
            setDate(date);
            // I wish this worked...
            // Popover.close();
            triggerRef.click();
          }}
          onCancel={() => {}}
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
              <Calendar.View.Header.Day>
                {dayjs(Calendar.state.date).format('dd')}
              </Calendar.View.Header.Day>
            </Calendar.View.Header>
            <Calendar.View.Body>
              <Calendar.View.Body.Week>
                <Calendar.View.Body.Day
                  classList={{
                    'calendar-outside-month': !Calendar.state.isDateInCurrentMonth,
                    'calendar-is-selected': Calendar.state.isDateSelected,
                    'calendar-is-active': Calendar.state.isDateActive,
                  }}
                  // disabled={isDisabled()}
                  tabIndex={Calendar.state.isDateActive ? 0 : -1}
                >
                  {dayjs(Calendar.state.date).format('DD')}
                </Calendar.View.Body.Day>
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
  );
}
