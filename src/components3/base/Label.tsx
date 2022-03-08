import { Accessor, createContext, onMount, PropsWithChildren, useContext } from 'solid-js';
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

export function createLabelTargetProps(config: { fallbackLabelId?: Accessor<string> } = {}) {
  const state = useLabelState();

  return {
    get ['aria-labelledby']() {
      return state.labelId || config?.fallbackLabelId();
    },
  };
}

export function createLabelProps(config: { id: string }) {
  const actions = useLabelActions();

  onMount(() => {
    actions.setLabelId(config.id);
  });

  return {};
}
