import { JSXElement, mergeProps, splitProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import Fragment from '~/components/Fragment';
import { BaseComponent, BaseComponentProps } from '~/types';
import Button from './Button';
import {
  DisclosureActions,
  DisclosureContext,
  DisclosureState,
  useDisclosureState,
} from './context';
import Panel from './Panel';

const dataAttribute = {
  'data-solid-disclosure-root': '',
};

export type DisclosureProps = {
  as?: string | BaseComponent<{}, typeof dataAttribute>;
  isOpen?: boolean;
};

export const Disclosure: BaseComponent<DisclosureProps> = (props) => {
  props = mergeProps({ as: Fragment }, props);

  const [state, setState] = createStore<DisclosureState>({
    buttonId: null,
    panelId: null,
    isOpen: props.isOpen || false,
  });

  const actions: DisclosureActions = {
    registerButton(buttonId) {
      setState({ buttonId });
    },
    registerPanel(panelId) {
      setState({ panelId });
    },
    toggle() {
      setState('isOpen', (isOpen) => !isOpen);
    },
  };

  const [localProps, otherProps] = splitProps(props, ['as', 'isOpen']);

  return (
    <DisclosureContext.Provider value={[state, actions]}>
      <Dynamic {...otherProps} component={localProps.as} {...dataAttribute} />
    </DisclosureContext.Provider>
  );
};

type DisclosureComponentType = {
  (props: BaseComponentProps<DisclosureProps>): JSXElement;
  state: {
    isOpen: DisclosureState['isOpen'];
  };
  Button: typeof Button;
  Panel: typeof Panel;
};

const DisclosureComponent: DisclosureComponentType = Object.assign(Disclosure, {
  Button,
  Panel,
  state: {
    get isOpen() {
      return useDisclosureState().isOpen;
    },
  },
});

export default DisclosureComponent;
