import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useId } from '~/utils/componentUtils';
import { useListActions, useListState } from '~/oldComponents/List/context';
import { BaseComponent } from '~/types';

const dataAttribute = {
  'data-solid-list-label': '' as const,
};

export type LabelProps = {
  as?: string | BaseComponent<{ id: string }, typeof dataAttribute>;
  idPrefix?: string;
};

const Label: BaseComponent<LabelProps> = function Label(props) {
  props = mergeProps({ as: 'label' }, props);

  const ListState = useListState();
  const ListActions = useListActions();

  const labelId = useId(props.idPrefix || 'list-label');

  ListActions.registerLabel(labelId, 'Label');

  const [localProps, otherProps] = splitProps(props, ['as']);

  return (
    <Dynamic {...otherProps} component={localProps.as} {...dataAttribute} id={ListState.labelId} />
  );
};

export default Label;
