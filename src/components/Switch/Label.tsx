import { mergeProps, onMount, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useId } from '~/utils/componentUtils';
import { BaseComponent } from '~/types';
import { useSwitchActions, useSwitchState } from './context';

export type LabelProps = {
  as?: string | BaseComponent<{ id: string; onClick(): void }>;
  passive?: boolean;
};

export const Label: BaseComponent<LabelProps> = (props) => {
  props = mergeProps({ as: 'label' }, props);

  const state = useSwitchState();
  const actions = useSwitchActions();

  const id = useId('switch-label');

  onMount(() => {
    actions.registerLabelId(id);
  });

  const [localProps, otherProps] = splitProps(props, ['as', 'passive']);

  function handleClick() {
    if (!localProps.passive) {
      document.getElementById(state.switchId)?.click();
    }
  }

  return (
    <Dynamic
      {...otherProps}
      component={localProps.as}
      data-solid-switch-label=""
      id={id}
      onClick={handleClick}
    />
  );
};

export default Label;
