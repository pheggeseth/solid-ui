import { JSX } from 'solid-js';
import { createPanel } from './panel';
import { createOverlay } from './overlay';
import PopoverProvider, { PopoverProviderProps } from './provider';
import { createTrigger } from './trigger';

export * from './context';
export * from './panel';
export * from './overlay';
export * from './provider';
export * from './trigger';

export type DisclosureComponentType = {
  (props: PopoverProviderProps): JSX.Element;
  createTrigger: typeof createTrigger;
  createOverlay: typeof createOverlay;
  createPanel: typeof createPanel;
};

const DisclosureComponent = Object.assign(PopoverProvider, {
  createTrigger,
  createOverlay,
  createPanel: createPanel,
});

export default DisclosureComponent;
