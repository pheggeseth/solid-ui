import { PropsWithChildren } from 'solid-js';
import {
  CalendarContextProp,
  CalendarStoreContext,
  createCalendarStore,
  useCalendarContext,
} from './context';

export type CalendarProviderProps = PropsWithChildren<
  {
    onCancel?: () => void;
    onChange?: (newDate: Date) => void;
    value?: string | number | Date;
  } & CalendarContextProp
>;

export default function CalendarProvider(props: CalendarProviderProps) {
  const store = createCalendarStore({
    value: () => props.value,
    onCancel: props.onCancel,
    onChange: props.onChange,
  });

  return (
    <CalendarStoreContext.Provider value={store}>
      {(() => {
        props.context?.(useCalendarContext());
        return props.children;
      })()}
    </CalendarStoreContext.Provider>
  );
}
