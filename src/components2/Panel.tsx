import {
  Component,
  createContext,
  createEffect,
  JSX,
  onCleanup,
  onMount,
  PropsWithChildren,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { Portal } from 'solid-js/web';
import { setRef, useId } from '~/utils/componentUtils';
import { useOnClickAway } from '~/utils/eventUtils';
import { getFirstFocusableElement, useFocusOnOpen, useFocusTrap } from '~/utils/focusUtils';
import { usePopperContext } from './Popper';

type PanelElementIds = {
  buttonId: string;
  panelId: string;
  overlayId: string;
};

export type PanelState = PanelElementIds & {
  shouldShowPanel: boolean;
  isPanelOpen: boolean;
  isOverlayOpen: boolean;
};

export type PanelActions = {
  setElementId(name: keyof PanelElementIds, id: string): void;
  openPanel(): void;
  closePanel(): void;
  togglePanel(): void;
  openOverlay(): void;
  closeOverlay(): void;
};

function createExternalContext(state: PanelState, actions: PanelActions) {
  return {
    isOpen: () => state.isPanelOpen,
    close: () => actions.closePanel(),
  } as const;
}

function exposePanelExternalContext(props: PanelExternalContextProp) {
  props.context?.(useContext(PanelContext).context);
}

export type PanelExternalContext = ReturnType<typeof createExternalContext>;

export type PanelExternalContextProp = {
  context?: (ctx: PanelExternalContext) => void;
};

const PanelContext =
  createContext<{ state: PanelState; actions: PanelActions; context: PanelExternalContext }>();
export function usePanelState() {
  return useContext(PanelContext).state;
}
export function usePanelActions() {
  return useContext(PanelContext).actions;
}

export type PanelProviderProps = PropsWithChildren<PanelExternalContextProp>;

export function PanelProvider(props: PanelProviderProps) {
  const [state, setState] = createStore<PanelState>({
    buttonId: null,
    panelId: null,
    overlayId: null,
    shouldShowPanel: false,
    get isPanelOpen(): boolean {
      return state.shouldShowPanel && (!state.overlayId || state.isOverlayOpen);
    },
    isOverlayOpen: false,
  });

  const actions: PanelActions = {
    setElementId(name, id) {
      setState({ [name]: id });
    },
    openPanel() {
      setState('shouldShowPanel', true);
    },
    closePanel() {
      setState('shouldShowPanel', false);
    },
    togglePanel() {
      setState('shouldShowPanel', (state) => !state);
    },
    openOverlay() {
      setState({ isOverlayOpen: true });
    },
    closeOverlay() {
      setState({ isOverlayOpen: false });
    },
  };

  const context = createExternalContext(state, actions);
  props.context?.(context);

  return (
    <PanelContext.Provider value={{ state, actions, context }}>
      {props.children}
    </PanelContext.Provider>
  );
}

export type PanelButtonProps<PanelButtonElement extends HTMLElement> = {
  'aria-controls': string;
  'aria-expanded': boolean;
  id: string;
  onClick: JSX.EventHandler<PanelButtonElement, MouseEvent>;
  onKeyDown: JSX.EventHandler<PanelButtonElement, KeyboardEvent>;
};

export function createPanelButtonProps<PanelButtonElement extends HTMLElement>(props: {
  idPrefix: string;
}): PanelButtonProps<PanelButtonElement> {
  const panelState = usePanelState();
  const panelActions = usePanelActions();

  const id = useId(props.idPrefix);

  onMount(() => {
    if (!panelState.buttonId) {
      panelActions.setElementId('buttonId', id);
    }

    const popper = usePopperContext();

    if (!popper?.refs.anchor && id === panelState.buttonId) {
      popper?.setRef('anchor', document.getElementById(id));
    }
  });

  createEffect<typeof panelState.isPanelOpen>((wasPanelOpen) => {
    if (wasPanelOpen && !panelState.isPanelOpen && id === panelState.buttonId) {
      document.getElementById(id)?.focus();
    }
    return panelState.isPanelOpen;
  });

  return {
    get ['aria-controls']() {
      return panelState.panelId;
    },
    get ['aria-expanded']() {
      return panelState.isPanelOpen;
    },
    id,
    onClick() {
      panelActions.togglePanel();
    },
    onKeyDown(event) {
      if (event.key === 'Escape') {
        panelActions.closePanel();
      }
    },
  };
}

export type PanelProps<PanelElement extends HTMLElement> = {
  id: string;
  onKeyDown: JSX.EventHandler<PanelElement, KeyboardEvent>;
  ref: (element: PanelElement) => void;
  tabIndex: string | number;
};

export type CreatePanelPropsConfig<PanelElement extends HTMLElement> = {
  clickAway?:
    | boolean
    | {
        exceptions?: HTMLElement[];
        onClickAway?: () => void;
      }
    | ((element: PanelElement) => void);
  idPrefix: string;
  manageFocus?:
    | boolean
    | {
        focusTrapRef?: HTMLElement;
        initialFocusRef?: HTMLElement;
      }
    | ((element: PanelElement) => void);
  ref?: PanelElement | ((element: PanelElement) => void);
  tabIndex?: string | number;
};

export function createPanelProps<PanelElement extends HTMLElement>(
  props: CreatePanelPropsConfig<PanelElement>
): PanelProps<PanelElement> {
  const id = useId(props.idPrefix);

  function ref(element: PanelElement) {
    usePopperContext()?.setRef('popper', element);

    if (typeof props.manageFocus === 'function') {
      props.manageFocus(element);
    } else if (props.manageFocus) {
      const panelState = usePanelState();
      const manageFocus = props.manageFocus === true ? {} : props.manageFocus;

      useFocusTrap(
        manageFocus.focusTrapRef || element,
        () => panelState.isPanelOpen,
        manageFocus.initialFocusRef
      );
      useFocusOnOpen(
        manageFocus.initialFocusRef || getFirstFocusableElement(element),
        () => panelState.isPanelOpen
      );
    }

    if (typeof props.clickAway === 'function') {
      props.clickAway(element);
    } else if (props.clickAway) {
      const panelState = usePanelState();
      const panelActions = usePanelActions();
      const clickAway = props.clickAway === true ? {} : props.clickAway;
      const { exceptions = [], onClickAway } = clickAway;

      const button = document.getElementById(panelState.buttonId);
      if (button) {
        exceptions.push(button);
      }

      useOnClickAway(
        element,
        () => {
          panelActions.closePanel();
          onClickAway?.();
        },
        {
          exceptions,
          shouldContainActiveElement: !props.manageFocus,
        }
      );
    }

    setRef(props.ref, element);
  }

  const panelActions = usePanelActions();

  onMount(() => {
    panelActions.setElementId('panelId', id);
  });

  return {
    id,
    onKeyDown(event) {
      if (event.key === 'Escape') {
        panelActions.closePanel();
      }
    },
    ref,
    tabIndex: props.tabIndex ?? props.manageFocus ? 0 : undefined,
  };
}

export const OverlayPortal: Component = (props) => {
  const actions = usePanelActions();

  onMount(actions.openOverlay);
  onCleanup(actions.closeOverlay);

  return <Portal>{props.children}</Portal>;
};

export function createPanelOverlayProps(props: { idPrefix: string }) {
  const panelActions = usePanelActions();
  const id = useId(props.idPrefix);

  onMount(() => {
    panelActions.setElementId('overlayId', id);
  });

  return {
    id,
  };
}
