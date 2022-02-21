import dayjs from 'dayjs';
import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useDateContext } from '~/components/Calendar/context';
import { BaseComponent } from '~/types';

const dataAttribute = {
  'data-solid-calendar-view-header-day': '' as const,
};

export type HeaderDateProps = {
  as?:
    | string
    | BaseComponent<
        {
          abbr: HeaderDateProps['abbr'];
          scope: HeaderDateProps['scope'];
        },
        typeof dataAttribute
      >;
  abbr?: string;
  scope?: string;
};

const Day: BaseComponent<HeaderDateProps> = (props) => {
  const context = useDateContext();
  props = mergeProps({ as: 'th', abbr: dayjs(context().date).format('dddd'), scope: 'col' }, props);

  const [localProps, otherProps] = splitProps(props, ['as', 'abbr', 'scope']);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      abbr={localProps.abbr}
      {...dataAttribute}
      scope={localProps.scope}
    >
      {props.children}
    </Dynamic>
  );
};

export default Day;
