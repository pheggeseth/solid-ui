import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponent } from '~/types';
import { useCalendarActions } from './context';

const dataAttribute = {
  'data-solid-calendar-next-month': '' as const,
};

type NextMonthProps = {
  as?: string | BaseComponent<{ onClick(event?: MouseEvent): void }, typeof dataAttribute>;
  'aria-label'?: string;
  onClick?: (event?: MouseEvent) => void;
};

export const NextMonth: BaseComponent<NextMonthProps> = (props) => {
  props = mergeProps({ as: 'button', 'aria-label': 'next month' }, props);

  const actions = useCalendarActions();

  function handleClick(event: MouseEvent) {
    actions.viewNextMonth();
    props.onClick?.(event);
  }

  const [localProps, otherProps] = splitProps(props, ['as', 'aria-label']);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      aria-label={localProps['aria-label']}
      {...dataAttribute}
      onClick={handleClick}
    />
  );
};

export default NextMonth;
