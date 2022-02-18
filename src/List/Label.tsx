import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useId } from '~/componentUtils';
import { useListActions, useListState } from '~/List/context';
import { BaseComponent } from '~/types';

export type LabelProps = {
  as?: string | BaseComponent<{ id: string }>;
  idPrefix?: string;
};

export const Label: BaseComponent<LabelProps> = function Label(props) {
  props = mergeProps({ as: 'label' }, props);

  const ListState = useListState();
  const ListActions = useListActions();

  const labelId = useId(props.idPrefix || 'list-label');

  ListActions.registerLabel(labelId, 'Label');

  const [localProps, otherProps] = splitProps(props, ['as']);

  return <Dynamic {...otherProps} component={localProps.as} id={ListState.labelId} />;
};

export default Label;
