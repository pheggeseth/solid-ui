import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponent } from '~/types';
import { useCalendarActions } from './context';

const dataAttribute = {
  'data-solid-calendar-previous-month': '' as const,
};

type PreviousMonthProps = {
  as?: string | BaseComponent<{ onClick(event?: MouseEvent): void }, typeof dataAttribute>;
  'aria-label'?: string;
  onClick?: (event?: MouseEvent) => void;
};

export const PreviousMonth: BaseComponent<PreviousMonthProps> = (props) => {
  props = mergeProps({ as: 'button', 'aria-label': 'previous month' }, props);

  const actions = useCalendarActions();

  function handleClick(event: MouseEvent) {
    actions.viewPreviousMonth();
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

export default PreviousMonth;
