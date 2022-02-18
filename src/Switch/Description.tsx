import { mergeProps, onMount, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useId } from '~/componentUtils';
import { BaseComponent } from '~/types';
import { useSwitchActions } from './context';

export type DescriptionProps = {
  as?: string | BaseComponent<{ id: string }>;
};

export const Description: BaseComponent<DescriptionProps> = (props) => {
  props = mergeProps({ as: 'p' }, props);

  const [localProps, otherProps] = splitProps(props, ['as']);

  const actions = useSwitchActions();

  const id = useId('switch-description');

  onMount(() => {
    actions?.registerDescriptionId(id);
  });

  return <Dynamic {...otherProps} component={localProps.as} id={id} />;
};

export default Description;
