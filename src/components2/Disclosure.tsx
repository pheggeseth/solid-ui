import {
  Accessor,
  Component,
  createContext,
  createEffect,
  JSX,
  mergeProps,
  onCleanup,
  onMount,
  PropsWithChildren,
  Show,
  splitProps,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { Dynamic, Portal } from 'solid-js/web';
import { BaseComponentProps, DynamicComponent } from '~/types';
import { setRef, useId } from '~/utils/componentUtils';
import { useOnClickAway } from '~/utils/eventUtils';
import { getFirstFocusableElement, useFocusOnOpen, useFocusTrap } from '~/utils/focusUtils';
import { usePopperContext } from './Popper';

type DisclosureElementIds = {
  buttonId: string;
  disclosureId: string;
  overlayId: string;
};

export type DisclosureState = DisclosureElementIds & {
  shouldShowDisclosure: boolean;
  isDisclosureOpen: boolean;
  isOverlayOpen: boolean;
};

export type DisclosureActions = {
  setElementId(name: keyof DisclosureElementIds, id: string): void;
  openDisclosure(): void;
  closeDisclosure(): void;
  toggleDisclosure(): void;
  openOverlay(): void;
  closeOverlay(): void;
};

const DisclosureContext = createContext<{ state: DisclosureState; actions: DisclosureActions }>();

export const useDisclosureState = () => useContext(DisclosureContext).state;
export const useDisclosureActions = () => useContext(DisclosureContext).actions;

export type DisclosureProviderProps = PropsWithChildren;

export function DisclosureProvider(props: DisclosureProviderProps) {
  const [state, setState] = createStore<DisclosureState>({
    buttonId: null,
    disclosureId: null,
    overlayId: null,
    shouldShowDisclosure: false,
    get isDisclosureOpen(): boolean {
      return state.shouldShowDisclosure && (!state.overlayId || state.isOverlayOpen);
    },
    isOverlayOpen: false,
  });

  const actions: DisclosureActions = {
    setElementId(name, id) {
      setState({ [name]: id });
    },
    openDisclosure() {
      setState({ shouldShowDisclosure: true });
    },
    closeDisclosure() {
      setState({ shouldShowDisclosure: false });
    },
    toggleDisclosure() {
      setState('shouldShowDisclosure', (state) => !state);
    },
    openOverlay() {
      setState({ isOverlayOpen: true });
    },
    closeOverlay() {
      setState({ isOverlayOpen: false });
    },
  };

  return (
    <DisclosureContext.Provider value={{ state, actions }}>
      {props.children}
    </DisclosureContext.Provider>
  );
}

export type DisclosureButtonProps<DisclosureButtonElement extends HTMLElement> =
  BaseComponentProps<{
    component?: DynamicComponent<{
      id: string;
      onClick: JSX.EventHandler<DisclosureButtonElement, MouseEvent>;
    }>;
    idPrefix?: string;
  }>;

export function DisclosureButton<DisclosureButtonElement extends HTMLElement = HTMLButtonElement>(
  props: DisclosureButtonProps<DisclosureButtonElement>
) {
  props = mergeProps<typeof props[]>(
    { component: 'button', idPrefix: 'solid-ui-disclosure-button' },
    props
  );

  const disclosureState = useDisclosureState();
  const disclosureActions = useDisclosureActions();
  const popper = usePopperContext();

  const id = useId(props.idPrefix);

  onMount(() => {
    if (!disclosureState.buttonId) {
      disclosureActions.setElementId('buttonId', id);
    }

    if (!popper?.refs.anchor && id === disclosureState.buttonId) {
      popper?.setRef('anchor', document.getElementById(id));
    }
  });

  createEffect<typeof disclosureState.isDisclosureOpen>((wasDisclosureOpen) => {
    if (wasDisclosureOpen && !disclosureState.isDisclosureOpen && id === disclosureState.buttonId) {
      document.getElementById(id)?.focus();
    }
    return disclosureState.isDisclosureOpen;
  });

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix']);

  return (
    <Dynamic
      {...otherProps}
      aria-controls={disclosureState.isDisclosureOpen ? disclosureState.disclosureId : undefined}
      aria-expanded={disclosureState.isDisclosureOpen}
      component={localProps.component}
      data-solid-ui-disclosure-button=""
      id={id}
      onClick={() => {
        disclosureActions.toggleDisclosure();
      }}
    />
  );
}

const OverlayPortal: Component = (props) => {
  const actions = useDisclosureActions();

  onMount(actions.openOverlay);
  onCleanup(actions.closeOverlay);

  return <Portal>{props.children}</Portal>;
};

export type DisclosureOverlayProps = BaseComponentProps<{
  component?: DynamicComponent<{
    id: string;
  }>;
  idPrefix?: string;
  portal?: boolean;
}>;

export function DisclosureOverlay(props: DisclosureOverlayProps) {
  props = mergeProps<typeof props[]>({ idPrefix: 'solid-ui-disclosure-overlay' }, props);

  const actions = useDisclosureActions();

  const id = useId(props.idPrefix);

  onMount(() => {
    actions.setElementId('overlayId', id);
  });

  const [localProps, otherProps] = splitProps(props, ['component', 'idPrefix', 'portal']);

  const overlay = () => <Dynamic {...otherProps} component={localProps.component} id={id} />;

  return localProps.portal ? <OverlayPortal>{overlay()}</OverlayPortal> : overlay();
}

export type DisclosureProps<DisclosureElement extends HTMLElement> = BaseComponentProps<{
  clickAway?:
    | boolean
    | {
        exceptions?: HTMLElement[];
        onClickAway?: () => void;
      }
    | ((element: DisclosureElement) => void);
  component?: DynamicComponent<{
    onKeyDown: JSX.EventHandler<DisclosureElement, KeyboardEvent>;
    id: string;
    ref: (element: DisclosureElement) => void;
    tabIndex: string | number;
  }>;
  idPrefix?: string;
  manageFocus?:
    | boolean
    | {
        focusTrapRef?: HTMLElement;
        initialFocusRef?: HTMLElement;
      }
    | ((element: DisclosureElement) => void);
  portal?: boolean;
  ref?: DisclosureElement | ((element: DisclosureElement) => void);
  tabIndex?: string | number;
}>;

export function Disclosure<DisclosureElement extends HTMLElement = HTMLDivElement>(
  props: DisclosureProps<DisclosureElement>
) {
  const disclosureState = useDisclosureState();
  const disclosureActions = useDisclosureActions();
  const popperActions = usePopperContext();

  props = mergeProps<typeof props[]>(
    {
      component: 'div',
      idPrefix: 'solid-ui-disclosure',
    },
    props
  );

  const id = useId(props.idPrefix);

  function ref(element: DisclosureElement) {
    popperActions?.setRef('popper', element);

    if (typeof props.manageFocus === 'function') {
      props.manageFocus(element);
    } else if (props.manageFocus) {
      const manageFocus = props.manageFocus === true ? {} : props.manageFocus;

      useFocusTrap(manageFocus.focusTrapRef || element, () => disclosureState.isDisclosureOpen);
      useFocusOnOpen(
        manageFocus.initialFocusRef || getFirstFocusableElement(element),
        () => disclosureState.isDisclosureOpen
      );
    }

    if (typeof props.clickAway === 'function') {
      props.clickAway(element);
    } else if (props.clickAway) {
      const clickAway = props.clickAway === true ? {} : props.clickAway;
      const { exceptions = [], onClickAway } = clickAway;

      const button = document.getElementById(disclosureState.buttonId);
      if (button) {
        exceptions.push(button);
      }

      useOnClickAway(
        element,
        () => {
          disclosureActions.closeDisclosure();
          onClickAway?.();
        },
        {
          exceptions,
          shouldContainActiveElement: !!props.manageFocus,
        }
      );
    }

    setRef(props.ref, element);
  }

  const onKeyDown: JSX.EventHandler<DisclosureElement, KeyboardEvent> = (event) => {
    if (event.key === 'Escape') {
      disclosureActions.closeDisclosure();
    }
  };

  onMount(() => {
    disclosureActions.setElementId('disclosureId', id);
  });

  const [localProps, otherProps] = splitProps(props, [
    'clickAway',
    'component',
    'idPrefix',
    'manageFocus',
    'portal',
    'ref',
    'tabIndex',
  ]);

  const panel = () => (
    <Dynamic
      {...otherProps}
      component={localProps.component}
      data-solid-ui-disclosure=""
      id={id}
      onKeyDown={onKeyDown}
      ref={ref}
      tabIndex={localProps.tabIndex ?? localProps.manageFocus ? 0 : undefined}
    />
  );

  return (
    <Show when={disclosureState.isDisclosureOpen}>
      {localProps.portal ? <Portal>{panel()}</Portal> : panel()}
    </Show>
  );
}
