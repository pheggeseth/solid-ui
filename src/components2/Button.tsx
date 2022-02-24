import { PropsWithChildren, mergeProps, splitProps } from 'solid-js';
import { JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { DynamicComponent } from '~/types';

export type ButtonProps<T extends HTMLElement> = {
  as?: DynamicComponent<{
    'aria-haspopup': ButtonProps<T>['aria-haspopup'];
    onClick: ButtonProps<T>['onClick'];
    onKeyDown: ButtonProps<T>['onKeyDown'];
  }>;
  'aria-haspopup'?: boolean | string;
  onClick: JSX.EventHandler<T, MouseEvent>;
  onKeyDown?: JSX.EventHandler<T, KeyboardEvent>;
  ref?: (element: T) => void;
};

export function Button<T extends HTMLElement = HTMLButtonElement>(
  props: PropsWithChildren<ButtonProps<T>>
) {
  props = mergeProps({ as: 'button' }, props);

  const [localProps, otherProps] = splitProps(props, [
    'as',
    'aria-haspopup',
    'onClick',
    'onKeyDown',
  ]);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      aria-haspopup={localProps['aria-haspopup']}
      data-solid-ui-button=""
      onClick={localProps.onClick}
      onKeyDown={localProps.onKeyDown}
    />
  );
}

export default Button;
