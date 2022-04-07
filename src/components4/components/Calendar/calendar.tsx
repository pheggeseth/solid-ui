import { getDataProp, useId } from '~/utils/componentUtils';
import { useCalendarState } from './context';

export type CreateRootConfig = {
  'aria-modal'?: boolean | 'false' | 'true';
  idPrefix?: string;
  role?: string;
};

export function createRoot(config: CreateRootConfig = {}) {
  const props = createRootProps(config);

  return {
    props,
  } as const;
}

export function createRootProps(config: CreateRootConfig = {}) {
  const {
    idPrefix = 'solid-ui-calendar-root',
    'aria-modal': ariaModal = true,
    role = 'dialog',
  } = config;
  const id = useId(idPrefix);

  const state = useCalendarState();

  return {
    get ['aria-label']() {
      return state.ariaLabel;
    },
    'aria-modal': ariaModal,
    ...getDataProp(idPrefix),
    'solid-ui-calendar-root': '',
    id,
    role,
  } as const;
}
