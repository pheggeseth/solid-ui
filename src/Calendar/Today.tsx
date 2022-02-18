import dayjs from 'dayjs';
import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponent } from '~/types';
import { useCalendarActions } from './context';

const dataAttribute = {
  'data-solid-calendar-today': '' as const,
};

type TodayProps = {
  as?: string | BaseComponent<{ onClick: (event?: MouseEvent) => void }, typeof dataAttribute>;
  onClick?: (event?: MouseEvent) => void;
};

const Today: BaseComponent<TodayProps> = (props) => {
  props = mergeProps({ as: 'button' }, props);

  const actions = useCalendarActions();

  function handleClick(event: MouseEvent) {
    actions.selectDate(dayjs());
    props.onClick?.(event);
  }

  const [localProps, otherProps] = splitProps(props, ['as']);

  return (
    <Dynamic {...otherProps} component={localProps.as} {...dataAttribute} onClick={handleClick} />
  );
};

export default Today;
