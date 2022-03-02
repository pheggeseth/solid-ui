import { createContext, onMount, PropsWithChildren, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useId } from '~/utils/componentUtils';

type LabelState = {
  labelId: string;
};

type LabelActions = {
  setLabelId(labelId: string): void;
};

const LabelContext = createContext<{ state: LabelState; actions: LabelActions }>();

export function useLabelState() {
  return useContext(LabelContext).state;
}

export function useLabelActions() {
  return useContext(LabelContext).actions;
}

export function LabelProvider(props: PropsWithChildren) {
  const [state, setState] = createStore<LabelState>({
    labelId: null,
  });

  const actions: LabelActions = {
    setLabelId(labelId) {
      setState({ labelId });
    },
  };

  return <LabelContext.Provider value={{ state, actions }}>{props.children}</LabelContext.Provider>;
}

export function createLabelProps(props: { idPrefix: string }) {
  const id = useId(props.idPrefix);

  const actions = useLabelActions();

  onMount(() => {
    actions.setLabelId(id);
  });

  return {
    id,
  };
}
