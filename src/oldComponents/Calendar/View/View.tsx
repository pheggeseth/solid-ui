import { JSXElement, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponent, BaseComponentProps } from '~/types';
import { useCalendarState } from '../context';
import Body from './Body';
import Header from './Header';

const dataAttribute = {
  'data-solid-calendar-view': '' as const,
};

type ViewProps = {
  as?:
    | string
    | BaseComponent<
        {
          'aria-label': string;
          'aria-labelledby'?: string;
          role: ViewProps['role'];
        },
        typeof dataAttribute
      >;
  'aria-labelledby'?: string;
  role?: string;
};

export const View: BaseComponent<ViewProps> = (props) => {
  props = mergeProps({ as: 'table', role: 'grid' }, props);

  const state = useCalendarState();

  const [localProps, otherProps] = splitProps(props, ['as', 'aria-labelledby', 'role']);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      aria-label={state.ariaLabel}
      aria-labelledby={localProps['aria-labelledby']}
      {...dataAttribute}
      role={localProps.role}
    >
      {props.children}
    </Dynamic>
  );
};

type ViewComponentType = {
  (props: BaseComponentProps<ViewProps>): JSXElement;
  Header: typeof Header;
  Body: typeof Body;
};

const ViewComponent: ViewComponentType = Object.assign(View, {
  Header,
  Body,
});

export default ViewComponent;
