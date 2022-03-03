import { createContext, createEffect, PropsWithChildren, useContext } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { createStore } from 'solid-js/store';
import { ComponentRef } from '~/types';
import { setRef, useId } from '~/utils/componentUtils';
import { useOnClickAway } from '~/utils/eventUtils';
import { getFirstFocusableElement, useFocusOnOpen, useFocusTrap } from '~/utils/focusUtils';
import { usePopperContext } from '../Popper';

type DialogIds = {
  buttonId: string;
  dialogId: string;
  overlayId: string;
};

export type DialogState = DialogIds & {
  shouldShowDialog: boolean;
  isDialogOpen: boolean;
  isOverlayOpen: boolean;
};

export type DialogActions = {
  setId(name: keyof DialogIds, id: string): void;
  openDialog(): void;
  closeDialog(): void;
  toggleDialog(): void;
  openOverlay(): void;
  closeOverlay(): void;
};

function createDialogExternalContext(state: DialogState, actions: DialogActions) {
  return {
    isOpen: () => state.isDialogOpen,
    close: () => actions.closeDialog(),
  } as const;
}

export const DialogContext = createContext<{
  state: DialogState;
  actions: DialogActions;
  context: ReturnType<typeof createDialogExternalContext>;
}>();

export type DialogContextRefProp = {
  context?: (ctx: ReturnType<typeof createDialogExternalContext>) => void;
};

export const useDialogState = () => useContext(DialogContext).state;
export const useDialogActions = () => useContext(DialogContext).actions;
export const exposeDialogExternalContext = (props: DialogContextRefProp) =>
  props.context?.(useContext(DialogContext).context);

type DialogProviderProps = PropsWithChildren<DialogContextRefProp>;

export function DialogProvider(props: DialogProviderProps) {
  const [state, setState] = createStore<DialogState>({
    buttonId: null,
    dialogId: null,
    overlayId: null,
    shouldShowDialog: false,
    get isDialogOpen(): boolean {
      return state.shouldShowDialog && (!state.overlayId || state.isOverlayOpen);
    },
    isOverlayOpen: false,
  });

  const actions: DialogActions = {
    setId(key, id) {
      setState({ [key]: id });
    },
    openDialog() {
      setState({ shouldShowDialog: true });
    },
    closeDialog() {
      setState({ shouldShowDialog: false });
    },
    toggleDialog() {
      setState('shouldShowDialog', (state) => !state);
    },
    openOverlay() {
      setState({ isOverlayOpen: true });
    },
    closeOverlay() {
      setState({ isOverlayOpen: false });
    },
  };

  const context = createDialogExternalContext(state, actions);

  props.context?.(context);

  return (
    <DialogContext.Provider value={{ state, actions, context }}>
      {props.children}
    </DialogContext.Provider>
  );
}

type UseDialogButtonLogicConfig<T extends HTMLElement> = {
  idPrefix?: string;
  onClick?: JSX.EventHandler<T, MouseEvent>;
};

export function useDialogButtonLogic<T extends HTMLElement>(
  config: UseDialogButtonLogicConfig<T> = {}
) {
  const { idPrefix = 'solid-dialog-button', onClick: userOnClick } = config;

  const dialogState = useDialogState();
  const dialogActions = useDialogActions();
  const popper = usePopperContext();

  const buttonId = useId(idPrefix);

  // only register the first button that renders
  if (!dialogState.buttonId) {
    dialogActions.setId('buttonId', buttonId);
  }

  createEffect<typeof dialogState.isDialogOpen>((wasDialogOpen) => {
    if (wasDialogOpen && !dialogState.isDialogOpen && buttonId === dialogState.buttonId) {
      document.getElementById(buttonId)?.focus();
    }
    return dialogState.isDialogOpen;
  });

  function ref(buttonElement: T) {
    buttonElement.id = buttonId;

    // if there is no other popper anchor, and this button is the primary dialog button,
    // set this button as the popper anchor, if available
    if (!popper?.refs.anchor && buttonId === dialogState.buttonId) {
      popper?.setRef('anchor', buttonElement);
    }
  }

  const onClick: JSX.EventHandler<T, MouseEvent> = (event) => {
    dialogActions.toggleDialog();
    userOnClick?.(event);
  };

  return {
    ref,
    onClick,
  };
}

export type UseDialogLogicConfig<T extends HTMLElement> = {
  clickAway?:
    | {
        exceptions?: HTMLElement[];
      }
    | false;
  idPrefix?: string;
  onKeyDown?: JSX.EventHandler<T, KeyboardEvent>;
  manageFocus?:
    | {
        focusTrapRef?: HTMLElement;
        initialFocusRef?: HTMLElement;
      }
    | false;
  ref?: ComponentRef<T>;
};

export function useDialogLogic<T extends HTMLElement>(props: UseDialogLogicConfig<T> = {}) {
  const {
    clickAway = {},
    idPrefix = 'solid-dialog',
    onKeyDown: userOnKeyDown = () => {},
    manageFocus = {},
    ref: userRef,
  } = props;

  const dialogState = useDialogState();
  const dialogActions = useDialogActions();
  const popperActions = usePopperContext();

  const dialogId = useId(idPrefix);

  dialogActions.setId('dialogId', dialogId);

  function ref(dialogElement: T) {
    dialogElement.id = dialogId;

    popperActions?.setRef('popper', dialogElement);

    if (manageFocus) {
      useFocusTrap(manageFocus.focusTrapRef || dialogElement, () => dialogState.isDialogOpen);
      useFocusOnOpen(
        manageFocus.initialFocusRef || getFirstFocusableElement(dialogElement),
        () => dialogState.isDialogOpen
      );
    }

    if (clickAway) {
      const exceptions = clickAway.exceptions || [];
      const button = document.getElementById(dialogState.buttonId);

      if (button) {
        exceptions.push(button);
      }

      useOnClickAway(dialogElement, () => dialogActions.closeDialog(), {
        exceptions,
        shouldContainActiveElement: !!manageFocus,
      });
    }

    setRef(userRef, dialogElement);
  }

  const onKeyDown: JSX.EventHandler<T, KeyboardEvent> = (event) => {
    if (event.key === 'Escape') {
      dialogActions.closeDialog();
    }
    userOnKeyDown(event);
  };

  return {
    isOpen: () => dialogState.isDialogOpen,
    onKeyDown,
    ref,
    tabIndex: manageFocus ? 0 : undefined,
  };
}
