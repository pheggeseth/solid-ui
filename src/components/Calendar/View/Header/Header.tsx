import dayjs from 'dayjs';
import Weekday from 'dayjs/plugin/weekday';
import { JSXElement, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponent, BaseComponentProps } from '~/types';
import Day from './Day';
import Week from './Week';

dayjs.extend(Weekday);

const dataAttribute = {
  'data-solid-calendar-view-header': '' as const,
};

type HeaderProps = {
  as?: string | BaseComponent<{}, typeof dataAttribute>;
};

export const Header: BaseComponent<HeaderProps> = (props) => {
  props = mergeProps({ as: 'thead' }, props);

  const [localProps, otherProps] = splitProps(props, ['as', 'children']);

  return (
    <Dynamic {...otherProps} component={localProps.as} {...dataAttribute}>
      {localProps.children}
    </Dynamic>
  );
};

type HeaderComponentType = {
  (props: BaseComponentProps): JSXElement;
  Week: typeof Week;
  Day: typeof Day;
};

const HeaderComponent: HeaderComponentType = Object.assign(Header, {
  Week,
  Day,
});

export default HeaderComponent;
