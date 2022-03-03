import { Accessor, mergeProps, PropsWithChildren, Show, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Dynamic, Portal } from 'solid-js/web';
import { ComponentRef, DynamicComponent } from '~/types';

export type PanelProps<T extends HTMLElement> = {
  as?: DynamicComponent<{
    'aria-modal'?: PanelProps<T>['aria-modal'];
    onKeyDown: PanelProps<T>['onKeyDown'];
    role: PanelProps<T>['role'];
    tabIndex: PanelProps<T>['tabIndex'];
  }>;
  'aria-modal'?: boolean;
  isOpen?: Accessor<boolean>;
  onKeyDown: JSX.EventHandler<T, KeyboardEvent>;
  portal?: boolean;
  ref: ComponentRef<T>;
  role?: string;
  tabIndex?: string | number;
};

export default function Panel<T extends HTMLElement = HTMLDivElement>(
  props: PropsWithChildren<PanelProps<T>>
) {
  props = mergeProps({ as: 'div', portal: true }, props);

  const [localProps, otherProps] = splitProps(props, [
    'as',
    'isOpen',
    'portal',
    'role',
    'tabIndex',
  ]);

  const panel = () => (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      data-solid-ui-panel=""
      role={localProps.role}
      tabIndex={localProps.tabIndex}
    />
  );

  return (
    <Show when={localProps.isOpen()}>
      {localProps.portal ? <Portal>{panel()}</Portal> : panel()}
    </Show>
  );
}
