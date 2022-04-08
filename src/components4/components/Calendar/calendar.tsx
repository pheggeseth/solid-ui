import { JSX } from 'solid-js';
import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarState } from './context';

export type CreateRootConfig = {
  'aria-modal'?: boolean | 'false' | 'true';
  idPrefix?: string;
  modal?: boolean;
  role?: JSX.HTMLAttributes<HTMLElement>['role'];
};

export function createRoot(config: CreateRootConfig = {}) {
  const props = createRootProps(config);

  return {
    props,
  } as const;
}

export function createRootProps(config: CreateRootConfig = {}) {
  const { idPrefix = 'solid-ui-calendar-root' } = config;
  const id = useId(idPrefix);

  const state = useCalendarState();

  return {
    get ['aria-label']() {
      return state.ariaLabel;
    },
    'aria-modal': config['aria-modal'],
    ...getDataProp(idPrefix),
    'solid-ui-calendar-root': '',
    id,
    role: config.role,
    ...(config.modal
      ? { 'aria-modal': true, role: 'dialog' as JSX.HTMLAttributes<HTMLElement>['role'] }
      : {}),
  } as const;
}
