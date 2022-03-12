import { JSX } from 'solid-js';
import { createDialog } from './dialog';
import { createOverlay } from './overlay';
import PopoverProvider, { PopoverProviderProps } from './provider';
import { createTrigger } from './trigger';

export * from './context';
export * from './dialog';
export * from './overlay';
export * from './provider';
export * from './trigger';

export type PopoverComponentType = {
  (props: PopoverProviderProps): JSX.Element;
  createTrigger: typeof createTrigger;
  createOverlay: typeof createOverlay;
  createDialog: typeof createDialog;
};

const PopoverComponent = Object.assign(PopoverProvider, {
  createTrigger,
  createOverlay,
  createDialog,
});

export default PopoverComponent;
