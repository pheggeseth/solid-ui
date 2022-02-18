import { mergeProps, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import Fragment from '~/Fragment';
import { BaseComponent } from '~/types';
import { SwitchActions, SwitchContext, SwitchState } from './context';

export type GroupProps = {
  as?: string | BaseComponent;
};

export const Group: BaseComponent<GroupProps> = (props) => {
  props = mergeProps({ as: Fragment }, props);

  const [localProps, otherProps] = splitProps(props, ['as']);

  const [state, setState] = createStore<SwitchState>({
    switchId: null,
    labelId: null,
    descriptionId: null,
  });

  const actions: SwitchActions = {
    registerSwitchId(switchId) {
      setState({ switchId });
    },
    registerLabelId(labelId) {
      setState({ labelId });
    },
    registerDescriptionId(descriptionId) {
      setState({ descriptionId });
    },
  };

  return (
    <SwitchContext.Provider value={[state, actions]}>
      <Dynamic {...otherProps} component={localProps.as} />
    </SwitchContext.Provider>
  );
};

export default Group;
