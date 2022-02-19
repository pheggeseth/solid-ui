import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { BaseComponent } from '~/types';
import { useCalendarActions } from './context';

const dataAttributeCancel = {
  'data-solid-calendar-cancel': '' as const,
};

type CancelProps = {
  as?:
    | string
    | BaseComponent<{ onClick: (event?: MouseEvent) => void }, typeof dataAttributeCancel>;
  onClick?: (event?: MouseEvent) => void;
};

export const Cancel: BaseComponent<CancelProps> = (props) => {
  props = mergeProps({ as: 'button' }, props);

  const actions = useCalendarActions();

  function handleClick(event: MouseEvent) {
    actions.onCancel();
    props.onClick?.(event);
  }

  const [localProps, otherProps] = splitProps(props, ['as']);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      {...dataAttributeCancel}
      onClick={handleClick}
    />
  );
};

const dataAttributeSave = {
  'data-solid-calendar-save': '' as const,
};

type SaveProps = {
  as?: string | BaseComponent<{ onClick: (event?: MouseEvent) => void }, typeof dataAttributeSave>;
  onClick?: (event?: MouseEvent) => void;
};

export const Save: BaseComponent<SaveProps> = (props) => {
  props = mergeProps({ as: 'button' }, props);

  const actions = useCalendarActions();

  function handleClick(event: MouseEvent) {
    actions.onDateConfirm();
    props.onClick?.(event);
  }

  const [localProps, otherProps] = splitProps(props, ['as']);

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      {...dataAttributeSave}
      onClick={handleClick}
    />
  );
};
