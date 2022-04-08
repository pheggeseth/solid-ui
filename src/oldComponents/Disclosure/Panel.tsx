import { mergeProps, onMount, Show, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useId } from '~/utils/componentUtils';
import { BaseComponent } from '~/types';
import { useDisclosureActions, useDisclosureState } from './context';

const dataAttribute = {
  'data-solid-disclosure-panel': '' as const,
};

type PanelProps = {
  as?: string | BaseComponent<{ id: string }, typeof dataAttribute>;
};

const Panel: BaseComponent<PanelProps> = (props) => {
  props = mergeProps({ as: 'div' }, props);

  const state = useDisclosureState();
  const actions = useDisclosureActions();

  const panelId = useId('disclosure-panel');

  onMount(() => {
    actions.registerPanel(panelId);
  });

  const [localProps, otherProps] = splitProps(props, ['as']);

  return (
    <Show when={state.isOpen}>
      <Dynamic {...otherProps} component={localProps.as} {...dataAttribute} id={panelId} />
    </Show>
  );
};

export default Panel;
