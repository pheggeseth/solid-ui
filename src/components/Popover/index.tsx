import { JSXElement } from 'solid-js';
import { createPanel } from './panel';
import { createOverlay } from './overlay';
import PopoverProvider, { PopoverProviderProps } from './provider';
import { createTrigger } from './trigger';

export * from './context';
export * from './panel';
export * from './overlay';
export * from './provider';
export * from './trigger';

export type PopoverComponentType = {
  (props: PopoverProviderProps): JSXElement;
  createTrigger: typeof createTrigger;
  createOverlay: typeof createOverlay;
  createPanel: typeof createPanel;
};

const PopoverComponent: PopoverComponentType = Object.assign(PopoverProvider, {
  createTrigger,
  createOverlay,
  createPanel,
});

export default PopoverComponent;
